import React from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import createMockRaf, { MockRaf } from '@react-spring/mock-raf'

import PushList from './PushList'
import renderWithProviders from 'testUtils/renderWithProviders'

let mockRaf: MockRaf

beforeEach(() => {
	mockRaf = createMockRaf()
	window.requestAnimationFrame = mockRaf.raf
})

const sets = [
	{ id: '1', set: 1 },
	{ id: '2', set: 2 },
	{ id: '3', set: 3 },
]

it('renders list', () => {
	const { container } = renderWithProviders(<PushList sets={sets} />)
	expect(container.firstChild).toMatchSnapshot()
})

it('hides item after click', async () => {
	renderWithProviders(<PushList sets={sets} />)

	const item = screen.getByText('2')
	userEvent.click(item)
	mockRaf.flush()

	expect(item).not.toBeVisible()
})
