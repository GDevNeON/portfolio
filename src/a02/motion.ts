export const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value))

// Excess gesture impulse is discarded rather than queued into a long forced flight.
export function inputTarget(current: number, target: number, delta: number) {
  if (!Number.isFinite(delta)) return target
  const direction = Math.sign(delta)
  const base = Math.sign(target - current) !== direction ? current : target
  return clamp(clamp(base + clamp(delta, -160, 160) * 0.00018, current - 0.045, current + 0.045))
}

export function advanceProgress(current: number, target: number, dt: number) {
  const difference = target - current
  const time = clamp(dt, 0, 0.05)
  if (Math.abs(difference) < 0.00005) return target
  const step = Math.min(Math.abs(difference), Math.abs(difference) * (1 - Math.exp(-9 * time)), 0.12 * time)
  return clamp(current + Math.sign(difference) * step)
}

export const viewpoints = [
  { progress: 0, label: 'Bóng tối', short: '01', title: 'Nơi ánh sáng bắt đầu', copy: 'Dưới lớp đá cổ, một thế giới đang thức giấc.' },
  { progress: 0.34, label: 'Pha lê', short: '02', title: 'Một miền trong vắt', copy: 'Ánh sáng đi qua đá, thời gian đọng thành pha lê.' },
  { progress: 0.68, label: 'Lữ hành', short: '03', title: 'Theo một dấu chân', copy: 'Có những con đường chỉ hiện ra khi ta bước tới.' },
  { progress: 1, label: 'Ánh sáng', short: '04', title: 'Bên kia cửa hang', copy: 'Hành trình còn ở phía trước. Bản thử A02 dừng tại đây.' },
] as const

export function nearestView(progress: number) {
  return viewpoints.reduce((best, view, i) => Math.abs(view.progress - progress) < Math.abs(viewpoints[best].progress - progress) ? i : best, 0)
}
