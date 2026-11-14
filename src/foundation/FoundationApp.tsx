import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { RuntimeController } from './runtime/RuntimeController'
import { ContentSurface } from './ui/ContentSurface'
import { sceneRegistry } from './config/sceneRegistry'
import { foundationContent } from './config/content'

export function FoundationApp() {
  const [runtime] = useState(() => new RuntimeController())
  const host = useRef<HTMLDivElement>(null)
  const state = useSyncExternalStore(runtime.subscribe, runtime.getSnapshot)
  useEffect(() => { runtime.mount(host.current!); return () => runtime.dispose() }, [runtime])
  return <main className="foundationRoot">
    <header><p>{foundationContent.name} · <em>NeON</em></p><nav aria-label="Liên kết chính"><a href="#projects">Xem dự án</a><a href="#contact">Liên hệ</a></nav></header>
    <h1>Bản thử hình khối</h1><p>Khám phá thế giới của NeON.</p>
    <div className="runtimeHost" ref={host} />
    <p role="status" data-phase={state.loadPhase}>{state.loadPhase === 'ready' ? 'Mẫu sẵn sàng' : state.loadPhase === 'preparing' ? 'Sắp sẵn sàng, vui lòng chờ thêm một chút' : state.loadPhase === 'error' ? 'Cảnh gặp sự cố khi mở' : `Đang tải thế giới — ${state.completedItems / state.totalItems * 100}%`}</p>
    {state.loadPhase === 'error' && <button onClick={() => runtime.mount(host.current!)}>Thử lại cảnh</button>}
    <div className="viewControls"><label>Góc nhìn <input aria-label="Góc nhìn" type="range" min="0" max="1" step="0.01" value={state.cameraProgress} onChange={e => runtime.setView(Number(e.target.value))} /></label><button onClick={() => runtime.setView(0)}>Về góc ban đầu</button></div>
    <ContentSurface />
    <section aria-label="Chín nguồn art"><h2>Chín nguồn art</h2><p>Chưa có bản dựng để đối chiếu. Mở từng mục để xem tên file gốc; checklist đang chuẩn bị.</p><ol>{sceneRegistry.map(scene => <li key={scene.sourceId}><details><summary>{scene.sourceId}{scene.sourceId === 'A01' ? ' · Chuẩn đồ họa' : ' · Xem nguồn'}</summary><p>{scene.filename}</p><p>Tên art chưa có · Tác giả chưa xác nhận · URL nguồn chưa có</p></details></li>)}</ol></section>
  </main>
}
