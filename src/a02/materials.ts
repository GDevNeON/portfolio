import * as THREE from 'three'

const noise = /* glsl */ `
float hash31(vec3 p) { p=fract(p*0.1031); p+=dot(p,p.yzx+33.33); return fract((p.x+p.y)*p.z); }
float noise3(vec3 p) {
  vec3 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
  return mix(mix(mix(hash31(i),hash31(i+vec3(1,0,0)),f.x),mix(hash31(i+vec3(0,1,0)),hash31(i+vec3(1,1,0)),f.x),f.y),
  mix(mix(hash31(i+vec3(0,0,1)),hash31(i+vec3(1,0,1)),f.x),mix(hash31(i+vec3(0,1,1)),hash31(i+vec3(1,1,1)),f.x),f.y),f.z);
}
float fbm(vec3 p) { return noise3(p)*0.54+noise3(p*2.13)*0.27+noise3(p*4.37)*0.13+noise3(p*9.1)*0.06; }
float fracture2(vec2 p) {
  vec2 base=floor(p), f=fract(p); float d1=8.0, d2=8.0;
  for(int x=-1;x<=1;x++) for(int y=-1;y<=1;y++) {
    vec2 o=vec2(float(x),float(y));
    vec2 r=o+vec2(hash31(vec3(base+o,4.1)),hash31(vec3(base+o,7.8)))-f;
    float d=dot(r,r);
    if(d<d1){d2=d1;d1=d;}else{d2=min(d2,d);}
  }
  return 1.0-smoothstep(0.01,0.055,d2-d1);
}
`

export function stoneMaterial(kind: 'wall' | 'floor' | 'pale') {
  const material = new THREE.MeshStandardMaterial({
    color: kind === 'wall' ? '#dca163' : kind === 'floor' ? '#e9d7b4' : '#dfd4bc',
    roughness: 0.91, metalness: 0, side: THREE.FrontSide,
  })
  material.onBeforeCompile = shader => {
    shader.vertexShader = 'varying vec3 vStoneWorld;\nvarying vec3 vStoneNormal;\n' + shader.vertexShader
    shader.vertexShader = shader.vertexShader.replace('#include <worldpos_vertex>', `
      #include <worldpos_vertex>
      vec4 stonePosition=vec4(transformed,1.0);
      #ifdef USE_INSTANCING
        stonePosition=instanceMatrix*stonePosition;
      #endif
      vStoneWorld=(modelMatrix*stonePosition).xyz;
      vStoneNormal=normalize(mat3(modelMatrix)*objectNormal);
    `)
    shader.fragmentShader = 'varying vec3 vStoneWorld;\nvarying vec3 vStoneNormal;\n' + noise + shader.fragmentShader
    shader.fragmentShader = shader.fragmentShader.replace('#include <color_fragment>', /* glsl */ `
      #include <color_fragment>
      vec3 p=vStoneWorld;
      float large=fbm(p*0.42);
      float grain=fbm(p*7.0);
      float fine=noise3(p*23.0);
      float strata=sin(p.y*6.7+p.x*0.55+fbm(p*0.83)*5.0);
      float chips=smoothstep(0.61,0.76,fbm(p*2.8+vec3(0,3,1)));
      float fracture=fracture2(${kind === 'wall' ? 'p.zy*0.68' : 'p.xz*1.2'});
      vec3 pigment=${kind === 'wall' ? 'mix(vec3(0.22,0.10,0.045),vec3(0.63,0.38,0.16),large)' : 'mix(vec3(0.36,0.29,0.20),vec3(0.76,0.67,0.49),large)'};
      pigment=mix(pigment,vec3(0.86,0.78,0.60),chips*${kind === 'wall' ? '0.55' : '0.32'});
      float chalk=smoothstep(0.48,0.88,vStoneNormal.y)*smoothstep(0.44,0.65,large);
      pigment=mix(pigment,vec3(0.91,0.82,0.65),chalk*0.6);
      pigment*=0.87+grain*0.2+fine*0.035+strata*0.025;
      pigment*=1.0-fracture*0.28*smoothstep(0.3,0.6,grain);
      float entranceShade=mix(1.0,0.36,smoothstep(-2.0,18.0,p.z));
      diffuseColor.rgb*=pigment*1.45*entranceShade;
    `)
    shader.fragmentShader = shader.fragmentShader.replace('#include <normal_fragment_maps>', /* glsl */ `
      #include <normal_fragment_maps>
      float relief=fbm(vStoneWorld*5.0)*0.024+noise3(vStoneWorld*24.0)*0.002;
      vec3 sigmaX=dFdx(-vViewPosition), sigmaY=dFdy(-vViewPosition);
      vec3 crossX=cross(sigmaY,normal), crossY=cross(normal,sigmaX);
      float det=dot(sigmaX,crossX);
      normal=normalize(abs(det)*normal-sign(det)*(dFdx(relief)*crossX+dFdy(relief)*crossY));
    `)
  }
  material.customProgramCacheKey = () => 'a02-stone-' + kind
  return material
}

export function crystalMaterial(physical: boolean, shade = 0) {
  const material = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(shade > 0 ? '#edfff0' : shade < 0 ? '#229bad' : '#8ce3e2'),
    roughness: 0.26, metalness: 0.02, ior: 1.46,
    transmission: physical ? 0.28 : 0,
    emissive: new THREE.Color(shade > 0 ? '#b0e0d7' : '#167988'), emissiveIntensity: 0.13,
    thickness: 3.2, attenuationDistance: 3.5, attenuationColor: new THREE.Color('#2baab8'),
    clearcoat: 0.6, clearcoatRoughness: 0.2, envMapIntensity: 0.65,
  })
  material.onBeforeCompile = shader => {
    shader.vertexShader = 'varying vec3 vMineral;\n' + shader.vertexShader
    shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\nvMineral=position;')
    shader.fragmentShader = 'varying vec3 vMineral;\n' + noise + shader.fragmentShader
    shader.fragmentShader = shader.fragmentShader.replace('#include <color_fragment>', /* glsl */ `
      #include <color_fragment>
      float cloud=fbm(vMineral*vec3(3.0,0.47,3.0));
      float vein=smoothstep(0.74,0.97,sin(vMineral.y*21.0+vMineral.x*7.0+cloud*8.0));
      float fibre=noise3(vMineral*vec3(64.0,1.6,64.0));
      float milk=smoothstep(0.51,0.72,cloud);
      diffuseColor.rgb=mix(diffuseColor.rgb*mix(0.72,1.15,cloud),vec3(0.88,0.92,0.75),milk*0.72+vein*0.12);
      diffuseColor.rgb*=0.85+fibre*0.26;
    `)
  }
  material.customProgramCacheKey = () => 'a02-crystal-' + physical
  return material
}

export function dustMaterial() {
  return new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uPixelRatio: { value: 1 } },
    vertexShader: /* glsl */ `
      uniform float uTime; uniform float uPixelRatio; attribute float aSeed;
      varying float vAlpha;
      void main() {
        vec3 p=position;
        p.x+=sin(uTime*0.16+aSeed*31.0)*0.42;
        p.z+=cos(uTime*0.12+aSeed*27.0)*0.32;
        p.y+=sin(uTime*0.23+aSeed*19.0)*0.25;
        vec4 mv=modelViewMatrix*vec4(p,1.0);
        gl_Position=projectionMatrix*mv;
        gl_PointSize=clamp((25.0+aSeed*26.0)/-mv.z,1.1,4.8)*uPixelRatio;
        vAlpha=(0.10+aSeed*0.38)*smoothstep(1.0,5.0,-mv.z);
      }
    `,
    fragmentShader: /* glsl */ `
      varying float vAlpha;
      void main() {
        float d=length(gl_PointCoord-0.5)*2.0;
        float a=(1.0-smoothstep(0.0,1.0,d))*vAlpha;
        gl_FragColor=vec4(1.0,0.87,0.61,a);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  })
}
