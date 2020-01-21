import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import createMockRaf, { MockRaf } from '@react-spring/mock-raf'
import { Globals, FrameLoop } from 'react-spring'

import PushListContainer from './PushListContainer'

let mockRaf: MockRaf

beforeEach(() => {
	mockRaf = createMockRaf()

	Globals.assign({
		now: mockRaf.now,
		requestAnimationFrame: mockRaf.raf,
		cancelAnimationFrame: mockRaf.cancel,
		frameLoop: new FrameLoop(),
	})
})

const sets = [
	{ id: '1', set: 1 },
	{ id: '2', set: 2 },
	{ id: '3', set: 3 },
]

it('renders list', () => {
	const { container } = render(<PushListContainer sets={sets} />)
	expect(container.firstChild).toMatchSnapshot()
})

it('hides item after click', async () => {
	const { getByText } = render(<PushListContainer sets={sets} />)
	const item = getByText('2')
	fireEvent.click(item)
	mockRaf.flush()
	expect(item).not.toBeVisible()
})
