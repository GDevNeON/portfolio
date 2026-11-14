import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { ContentSurface } from '../../src/foundation/ui/ContentSurface'

it('keeps real project descriptions and contact usable without WebGL', () => {
  render(<ContentSurface />)
  expect(screen.getAllByRole('article')).toHaveLength(3)
  expect(screen.getByRole('link', { name: 'Email' })).toHaveAttribute('href', 'mailto:nq2019.buibaolong281104@gmail.com')
  expect(screen.queryByText('3+')).not.toBeInTheDocument()
})
