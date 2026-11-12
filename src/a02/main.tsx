import { StrictMode, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { CaveExperience } from './CaveExperience'
import type { Snapshot } from './CaveExperience'
import { viewpoints } from './motion'
import caveReference from './references/a02.jpg'
import styleReference from './references/a01.jpg'
import './style.css'

const initial: Snapshot = { progress: 0, stage: 0, fps: 0, triangles: 0, calls: 0, quality: 'full', material: 'physical', paused: false, reduced: false, look: false, ready: false }

export default function App() {
  const host = useRef<HTMLDivElement>(null)
  const scene = useRef<CaveExperience | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const pausedBeforeReference = useRef(false)
  const [state, setState] = useState(initial)
  const [loading, setLoading] = useState(0)
  const [error, setError] = useState('')
  const [generation, setGeneration] = useState(0)
  const [quiet, setQuiet] = useState(false)
  const [tools, setTools] = useState(false)

  useEffect(() => {
    if (!host.current) return
    let active = true
    let experience: CaveExperience | null = null
    const showError = (message: string) => { if (active) setError(message) }
    try {
      experience = new CaveExperience(host.current, {
        onState: value => { if (active) setState(value) },
        onLoad: value => { if (active) setLoading(value) },
        onError: showError,
      })
      scene.current = experience
      void experience.start().catch(cause => { console.error('A02 initialization:', cause); showError('Chưa mở được không gian 3D. Bạn có thể thử lại hoặc xem ảnh tham chiếu.') })
    } catch (cause) {
      console.error('A02 WebGL:', cause)
      queueMicrotask(() => showError('Trình duyệt chưa khởi tạo được 3D. Kiểm tra tăng tốc đồ họa rồi thử lại.'))
    }
    return () => { active = false; experience?.dispose(); scene.current = null }
  }, [generation])

  const retry = () => { setError(''); setLoading(0); setState(initial); setGeneration(value => value + 1) }
  const openReference = () => { pausedBeforeReference.current = state.paused; dialog.current?.showModal(); scene.current?.setPaused(true) }
  const exportReport = () => {
    if (!scene.current) return
    const url = URL.createObjectURL(new Blob([JSON.stringify(scene.current.exportReport(), null, 2)], { type: 'application/json' }))
    const link = document.createElement('a'); link.href = url; link.download = 'a02-review.json'; link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
  const view = viewpoints[state.stage]
  return <main className={`experience${quiet ? ' experience--quiet' : ''}`}>
    <div className="cave-viewport" ref={host} data-testid="cave-viewport" />
    <header className="masthead">
      <a className="wordmark" href="/" aria-label="Về portfolio NeON">NeON<span>EXPLORATIONS</span></a>
      <span className="edition">A02 <span> / </span> BẢN THỬ</span>
    </header>
    <div className="top-actions" aria-label="Điều khiển cảnh">
      <button onClick={() => setQuiet(value => !value)} aria-pressed={quiet}>{quiet ? 'Hiện chữ' : 'Ngắm cảnh'}</button>
      <button onClick={openReference}>Đối chiếu art <span aria-hidden="true">↗</span></button>
      <button onClick={() => setTools(value => !value)} aria-expanded={tools} aria-controls="review-tools">Tùy chỉnh <span aria-hidden="true">＋</span></button>
    </div>

    {!state.ready && !error && <div className="loading" role="status" aria-live="polite">
      <span className="loading-mark" aria-hidden="true">◇</span>
      <p>Mở lối vào lòng đá</p>
      <progress max={100} value={loading} aria-label="Tiến độ chuẩn bị cảnh" />
      <span>{loading}%</span>
    </div>}

    {error && <section className="failure" role="alert">
      <p className="eyebrow">MỘT CHÚT GIÁN ĐOẠN</p><h1>Con đường chưa mở.</h1><p>{error}</p>
      <button onClick={retry}>Thử lại</button><button onClick={openReference}>Xem art</button><a href="/">Về portfolio</a>
    </section>}

    {state.ready && !error && <>
      <section className="scene-caption" aria-live="polite" aria-atomic="true">
        <p className="eyebrow">TỪ VỰC SÂU ĐẾN ĐỈNH CAO <span>—</span> A02</p>
        <h1>{view.title}</h1><p className="scene-copy">{view.copy}</p>
      </section>
      <aside className="scroll-cue">
        <span aria-hidden="true">↓</span><p>{state.paused ? 'Cảnh đang tạm dừng' : state.reduced ? 'Chọn mốc để khám phá' : state.look ? 'Kéo để nhìn quanh' : 'Cuộn để bước tiếp'}</p>
      </aside>
      <nav className="journey-nav" aria-label="Các góc nhìn A02">
        {viewpoints.map((point, index) => <button key={point.short} onClick={() => scene.current?.jump(point.progress)} aria-current={state.stage === index ? 'step' : undefined}><span>{point.short}</span>{point.label}</button>)}
      </nav>
      <div className="position-line" aria-hidden="true"><div style={{ transform: `scaleX(${state.progress})` }} /></div>
    </>}

    {tools && <aside id="review-tools" className="review-tools" aria-label="Tùy chỉnh bản thử">
      <div className="panel-heading"><h2>Nhìn kỹ hơn</h2><button onClick={() => setTools(false)} aria-label="Đóng tùy chỉnh">×</button></div>
      <div className="tool-row"><span>Chuyển động</span><button onClick={() => scene.current?.setPaused(!state.paused)} aria-pressed={state.paused}>{state.paused ? 'Tiếp tục' : 'Tạm dừng'}</button></div>
      <label className="check-row"><input type="checkbox" checked={state.reduced} onChange={e => scene.current?.setReduced(e.target.checked)} />Giảm chuyển động</label>
      <label className="check-row"><input type="checkbox" checked={state.look} disabled={state.reduced || state.paused} onChange={e => scene.current?.setLook(e.target.checked)} />Nhìn quanh bằng kéo</label>
      <label className="select-row">Chi tiết<select value={state.quality} onChange={e => scene.current?.setQuality(e.target.value === 'low' ? 'low' : 'full')}><option value="full">Đầy đủ</option><option value="low">Low detail</option></select></label>
      <label className="select-row">Pha lê — so sánh vật liệu<select value={state.material} onChange={e => scene.current?.setMaterial(e.target.value === 'physical' ? 'physical' : 'mineral')}><option value="physical">Truyền sáng</option><option value="mineral">Khoáng chất đặc</option></select></label>
      <label className="range-row">Vị trí trên hành trình <output>{Math.round(state.progress * 100)}%</output><input type="range" min="0" max="1000" value={Math.round(state.progress * 1000)} onChange={e => scene.current?.jump(Number(e.target.value) / 1000)} /></label>
      <p className="tool-note">Bản nghiên cứu A02. Các mặt khuất là thiết kế thử, chờ bạn duyệt.</p>
      <details><summary>Thông tin phiên xem</summary><dl><div><dt>Nhịp vẽ gần đây</dt><dd>{state.fps || '—'} fps</dd></div><div><dt>Tam giác / lượt render</dt><dd>{state.triangles.toLocaleString()}</dd></div><div><dt>Lệnh vẽ / lượt render</dt><dd>{state.calls}</dd></div></dl><p>Chỉ số của máy đang xem; chưa phải kết quả trên thiết bị mục tiêu.</p><button onClick={exportReport}>Tải báo cáo phiên xem</button></details>
      <p className="keyboard-note">Bàn phím: focus cảnh → ↑ ↓ để đi; Home / End để nhảy đầu / cuối.</p>
    </aside>}

    <dialog ref={dialog} className="reference-dialog" onClose={() => scene.current?.setPaused(pausedBeforeReference.current)}>
      <div className="panel-heading"><div><p className="eyebrow">TƯ LIỆU ĐỐI CHIẾU</p><h2>Hình gốc & ngôn ngữ đồ họa</h2></div><button onClick={() => dialog.current?.close()} aria-label="Đóng ảnh tham chiếu">×</button></div>
      <p>Ảnh chỉ nằm trong bảng đối chiếu này. Không được dùng làm nền giả 3D trong cảnh.</p>
      <div className="reference-grid"><figure><img src={caveReference} alt="A02 gốc: hang đá cam cao hẹp, pha lê xanh khổng lồ, người lữ hành nhỏ" /><figcaption>A02 · Bố cục, đá cam, pha lê, tỷ lệ lữ hành.</figcaption></figure><figure><img src={styleReference} alt="young-qin: chuẩn đồ họa fantasy chi tiết với chất liệu và ánh sáng mềm" /><figcaption>A01 · Chuẩn đồ họa young-qin.</figcaption><h3>Để bạn duyệt</h3><ul><li>Chất đá, màu và độ trong pha lê.</li><li>Tỷ lệ hang, lữ hành và các góc mới.</li><li>Nhịp camera; chuyển động khi dừng cuộn.</li></ul><p>Chưa xác nhận đạt độ trung thành 100%.</p></figure></div>
      <button className="back-to-cave" onClick={() => dialog.current?.close()}>Trở lại hang pha lê</button>
    </dialog>
  </main>
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
