import React from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import createMockRaf, { MockRaf } from '@react-spring/mock-raf'
import { Globals, FrameLoop } from 'react-spring'

import PushListContainer from './PushListContainer'
import renderWithProviders from 'testUtils/renderWithProviders'

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
	const { container } = renderWithProviders(<PushListContainer sets={sets} />)
	expect(container.firstChild).toMatchSnapshot()
})

it('hides item after click', async () => {
	renderWithProviders(<PushListContainer sets={sets} />)

	const item = screen.getByText('2')
	userEvent.click(item)
	mockRaf.flush()

	expect(item).not.toBeVisible()
})
