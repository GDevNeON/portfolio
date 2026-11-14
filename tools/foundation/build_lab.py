"""Author the Phase 1 laboratory in a disposable Blender background process.

Usage: blender --background --factory-startup --python tools/foundation/build_lab.py
Requires Blender 4.5 with its bundled glTF exporter. This is a labelled study,
not a reconstruction or approval of any source artwork. No source JPG is used.
"""
import json
import math
from pathlib import Path

import bpy
import bmesh

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "public/foundation/lab"
SOURCE = ROOT / "art-source/foundation"
OUT.mkdir(parents=True, exist_ok=True)
SOURCE.mkdir(parents=True, exist_ok=True)
ROOT_NAMES = ["rock_cluster", "crystal_cluster", "carved_fragment", "organic_segment"]


def reset():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    bpy.context.scene.unit_settings.system = "METRIC"
    bpy.context.scene.unit_settings.scale_length = 1


def root(name, location):
    obj = bpy.data.objects.new(name, None)
    bpy.context.collection.objects.link(obj)
    obj.location = location
    obj["asset_status"] = "study"
    return obj


def material(name, color, roughness, transmission=0):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    shader = mat.node_tree.nodes.get("Principled BSDF")
    shader.inputs["Base Color"].default_value = (*color, 1)
    shader.inputs["Roughness"].default_value = roughness
    shader.inputs["Transmission Weight"].default_value = transmission
    shader.inputs["IOR"].default_value = 1.46
    # Deterministic hand-directed brush bands baked into ordinary UV maps.
    # These pixels are exported, not a Blender-only procedural node network.
    for role in ["color", "roughness", "normal"]:
        size = 256
        image = bpy.data.images.new(name + "_" + role, width=size, height=size)
        image.colorspace_settings.name = "sRGB" if role == "color" else "Non-Color"
        pixels = []
        for y in range(size):
            for x in range(size):
                u, v = x / size, y / size
                brush = math.sin(u * 37 + math.sin(v * 19) * 2.1) * .035
                strata = math.sin(v * 41 + u * 3) * .055
                if role == "color":
                    pixels.extend([max(0, min(1, c + brush + strata)) for c in color] + [1])
                elif role == "roughness":
                    value = max(.05, min(1, roughness + brush + strata))
                    pixels.extend([value, value, value, 1])
                else:
                    pixels.extend([.5 + brush * .3, .5 + strata * .3, 1, 1])
        image.pixels.foreach_set(pixels)
        image.filepath_raw = str(SOURCE / (name + "_" + role + ".png"))
        image.file_format = "PNG"
        image.save()
        image.pack()
        node = mat.node_tree.nodes.new("ShaderNodeTexImage")
        node.image = image
        if role == "normal":
            normal = mat.node_tree.nodes.new("ShaderNodeNormalMap")
            normal.inputs["Strength"].default_value = .35
            mat.node_tree.links.new(node.outputs["Color"], normal.inputs["Color"])
            mat.node_tree.links.new(normal.outputs["Normal"], shader.inputs["Normal"])
        else:
            mat.node_tree.links.new(node.outputs["Color"], shader.inputs["Base Color" if role == "color" else "Roughness"])
    return mat


def mesh(name, vertices, faces, parent, mat, bevel=0):
    data = bpy.data.meshes.new(name)
    data.from_pydata(vertices, [], faces)
    data.update()
    editable = bmesh.new()
    editable.from_mesh(data)
    bmesh.ops.recalc_face_normals(editable, faces=list(editable.faces))
    editable.to_mesh(data)
    editable.free()
    obj = bpy.data.objects.new(name, data)
    bpy.context.collection.objects.link(obj)
    obj.parent = parent
    obj.data.materials.append(mat)
    bpy.ops.object.select_all(action="DESELECT")
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.mode_set(mode="EDIT")
    bpy.ops.mesh.select_all(action="SELECT")
    bpy.ops.uv.smart_project(angle_limit=1.15, island_margin=.025)
    bpy.ops.object.mode_set(mode="OBJECT")
    if bevel:
        modifier = obj.modifiers.new("authored_edge_wear", "BEVEL")
        modifier.width, modifier.segments = bevel, 3
        bpy.ops.object.modifier_apply(modifier=modifier.name)
    return obj


def ring_solid(name, profiles, parent, mat, bevel=0):
    # Each profile specifies height, radii, translation and angular stagger.
    vertices = []
    count = 8
    for z, rx, ry, dx, dy, turn in profiles:
        for i in range(count):
            theta = i * math.tau / count + turn
            vertices.append((dx + rx * math.cos(theta), dy + ry * math.sin(theta), z))
    faces = [tuple(reversed(range(count)))]
    for layer in range(len(profiles) - 1):
        for i in range(count):
            a = layer * count + i
            b = layer * count + (i + 1) % count
            faces.append((a, b, b + count, a + count))
    faces.append(tuple(range((len(profiles) - 1) * count, len(profiles) * count)))
    return mesh(name, vertices, faces, parent, mat, bevel)


def arch(parent, mat, low):
    n = 12 if low else 48
    vertices = []
    for y in [-.23, .23]:
        for radius in [.68, 1.04]:
            for i in range(n + 1):
                theta = math.pi * i / n
                vertices.append((math.cos(theta) * radius, y, .8 + math.sin(theta) * radius))
    stride = n + 1
    faces = []
    for i in range(n):
        for a, b in [(0, stride), (2 * stride, 0), (stride, 3 * stride), (3 * stride, 2 * stride)]:
            faces.append((a + i, a + i + 1, b + i + 1, b + i))
    faces.extend([(0, stride, 3 * stride, 2 * stride), (n, 2 * stride + n, 3 * stride + n, stride + n)])
    mesh("carved_arch", vertices, faces, parent, mat, .015 if low else .025)
    for side in [-1, 1]:
        ring_solid("arch_pier_" + str(side), [(0, .21, .27, side * .85, 0, .39), (.18, .24, .29, side * .85, 0, .39), (.75, .18, .23, side * .85, 0, .39), (.85, .22, .26, side * .85, 0, .39)], parent, mat, .018)
    # Separate raised relief strokes have real depth on the architectural face.
    for i in range(5):
        angle = .35 + i * .61
        relief = ring_solid("carved_relief_" + str(i), [(0, .04, .025, 0, 0, 0), (.22, .025, .02, 0, 0, .1)], parent, mat, .005)
        relief.location = (.87 * math.cos(angle), -.255, .8 + .87 * math.sin(angle))
        relief.rotation_euler[1] = math.pi / 2 - angle


def organic(parent, mat, low):
    rings, sides = (12, 10) if low else (40, 32)
    vertices, faces = [], []
    for ring in range(rings + 1):
        t = ring / rings
        radius = .12 + .25 * math.sin(math.pi * t) ** .7
        for side in range(sides):
            angle = math.tau * side / sides
            vertices.append((radius * math.cos(angle), radius * math.sin(angle), t * 2.4))
    for ring in range(rings):
        for side in range(sides):
            a, b = ring * sides + side, ring * sides + (side + 1) % sides
            faces.append((a, b, b + sides, a + sides))
    faces.extend([tuple(reversed(range(sides))), tuple(range(rings * sides, (rings + 1) * sides))])
    obj = mesh("organic_skin", vertices, faces, parent, mat)
    for face in obj.data.polygons:
        face.use_smooth = True
    armature = bpy.data.armatures.new("organic_rig")
    rig = bpy.data.objects.new("organic_rig", armature)
    bpy.context.collection.objects.link(rig)
    rig.parent = parent
    bpy.ops.object.select_all(action="DESELECT")
    rig.select_set(True)
    bpy.context.view_layer.objects.active = rig
    bpy.ops.object.mode_set(mode="EDIT")
    previous = None
    for i in range(3):
        bone = armature.edit_bones.new("segment_" + str(i))
        bone.head, bone.tail = (0, 0, i * .8), (0, 0, (i + 1) * .8)
        if previous:
            bone.parent, bone.use_connect = previous, True
        previous = bone
    bpy.ops.object.mode_set(mode="OBJECT")
    modifier = obj.modifiers.new("deform", "ARMATURE")
    modifier.object = rig
    groups = [obj.vertex_groups.new(name="segment_" + str(i)) for i in range(3)]
    for index, vertex in enumerate(vertices):
        weights = [max(0, 1 - abs(vertex[2] / .8 - (i + .5))) for i in range(3)]
        total = sum(weights)
        for group, weight in zip(groups, weights):
            if weight:
                group.add([index], weight / total, "REPLACE")
    for i, bone in enumerate(rig.pose.bones):
        bone.rotation_mode = "XYZ"
        bone.rotation_euler[1] = [.08, -.3, .38][i]


def build(low):
    reset()
    stone = material("stone", (.53, .28, .13), .84)
    crystal = material("crystal", (.24, .68, .66), .24, .65)
    architecture = material("carved_stone", (.71, .69, .59), .78)
    skin = material("organic", (.28, .38, .32), .62)
    rock = root("rock_cluster", (-3.4, 0, 0))
    profiles = [(-.06, .85, .64, 0, 0, .1), (.22, 1.03, .69, -.1, .05, .17), (.88, .8, .58, .09, -.03, -.08), (1.31, .66, .52, -.18, .08, .09), (1.57, .35, .33, -.14, .08, -.04)]
    ring_solid("rock_main", profiles, rock, stone, .055 if low else .085)
    ring_solid("rock_fracture", [(0, .5, .38, .65, .35, .1), (.49, .42, .3, .82, .28, -.22), (.8, .24, .18, .8, .2, .15)], rock, stone, .035)
    crystals = root("crystal_cluster", (-1.25, 0, 0))
    for i, (x, y, height, radius) in enumerate([(0, 0, 2.6, .32), (.45, .12, 1.7, .24), (-.31, -.18, 1.35, .2)]):
        ring_solid("crystal_" + str(i), [(0, radius, radius * .7, x, y, .1), (height * .82, radius * .85, radius * .64, x + .13, y, .1), (height, .014, .012, x + .2, y, .1)], crystals, crystal)
        ring_solid("inclusion_" + str(i), [(.15, radius * .18, radius * .15, x, y, .3), (height * .6, radius * .12, radius * .1, x + .1, y, .3), (height * .72, .005, .005, x + .13, y, .3)], crystals, architecture)
    arch(root("carved_fragment", (1.2, 0, 0)), architecture, low)
    organic(root("organic_segment", (3.4, 0, 0)), skin, low)
    return sorted(obj.name for obj in bpy.data.objects)


def inspect_import(file):
    reset()
    bpy.ops.import_scene.gltf(filepath=str(file))
    missing = [name for name in ROOT_NAMES if name not in bpy.data.objects]
    if missing:
        raise RuntimeError("Round-trip lost roots: " + str(missing))
    meshes = [obj for obj in bpy.data.objects if obj.type == "MESH"]
    if not meshes or not all(obj.data.uv_layers for obj in meshes):
        raise RuntimeError("Round-trip missing mesh/UV")
    if not any(obj.type == "ARMATURE" for obj in bpy.data.objects):
        raise RuntimeError("Round-trip lost armature")
    return {"objects": sorted(obj.name for obj in bpy.data.objects), "meshes": len(meshes), "vertices": sum(len(obj.data.vertices) for obj in meshes), "images": len(bpy.data.images), "armatures": sum(obj.type == "ARMATURE" for obj in bpy.data.objects)}


report = {"blender": bpy.app.version_string, "status": "incomplete", "unit": "meter", "export_up": "+Y", "source_status": "study", "source_images_on_geometry": False, "variants": {}}
for variant in ["full", "low"]:
    objects = build(variant == "low")
    if variant == "full":
        bpy.ops.wm.save_as_mainfile(filepath=str(SOURCE / "lab.blend"))
    target = OUT / ("lab-" + variant + ".glb")
    bpy.ops.export_scene.gltf(filepath=str(target), export_format="GLB", export_yup=True, export_skins=True, export_animations=False, export_apply=False)
    report["variants"][variant] = {"source_objects": objects, "bytes": target.stat().st_size, "roundtrip": inspect_import(target)}
if report["variants"]["full"]["source_objects"] != report["variants"]["low"]["source_objects"]:
    raise RuntimeError("Variant object identities differ")
report["status"] = "complete"
(OUT / "blender-roundtrip.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
print(json.dumps(report, indent=2))
