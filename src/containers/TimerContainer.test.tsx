import React from 'react'
import { act, screen } from '@testing-library/react'
import createMockRaf, { MockRaf } from '@react-spring/mock-raf'

import TimerContainer from './TimerContainer'
import renderWithProviders from '../testUtils/renderWithProviders'
import userEvent from '@testing-library/user-event'
import { advanceTo, advanceBy } from 'jest-date-mock'

const times = [
	{ label: '1 min', seconds: 60 },
	{ label: '2 min', seconds: 120 },
]

let mockRaf: MockRaf

beforeEach(() => {
	advanceTo(new Date())

	mockRaf = createMockRaf()
	window.requestAnimationFrame = mockRaf.raf.bind(mockRaf)
	window.cancelAnimationFrame = mockRaf.cancel.bind(mockRaf)
})

it('renders timer', () => {
	const { container } = renderWithProviders(<TimerContainer times={times} />)
	expect(container.firstChild).toMatchSnapshot()
})

// TODO: fix tests

it.skip('runs timer after click', async () => {
	jest.useFakeTimers()

	renderWithProviders(<TimerContainer times={times} />)

	const timerButton = screen.getByText('60')
	userEvent.click(timerButton)

	act(() => {
		advanceBy(3000)
		jest.advanceTimersByTime(3000)
	})

	mockRaf.flush()

	expect(timerButton).toHaveTextContent('57')
})

it.skip('shows alert after countdown', async () => {
	jest.useFakeTimers()

	const renderResult = renderWithProviders(<TimerContainer times={times} />)

	const timerButton = renderResult.getByText('60')
	userEvent.click(timerButton)

	act(() => {
		advanceBy(60000)
		jest.advanceTimersByTime(60000)
	})

	mockRaf.flush()

	expect(screen.getByText('Do next!')).toBeInTheDocument()
	expect(timerButton).toHaveTextContent('0')
})

it.skip('toggles timer', async () => {
	jest.useFakeTimers()

	renderWithProviders(<TimerContainer times={times} />)

	const timerButton = screen.getByText('60')
	userEvent.click(timerButton)

	act(() => {
		advanceBy(3000)
		jest.advanceTimersByTime(3000)
	})

	userEvent.click(timerButton)
	expect(timerButton).toHaveTextContent('60')

	act(() => {
		advanceBy(3000)
		jest.advanceTimersByTime(3000)
	})

	expect(timerButton).toHaveTextContent('60')
})

it.skip('stops timer when counter is changed', async () => {
	jest.useFakeTimers()

	renderWithProviders(<TimerContainer times={times} />)

	const timerButton = screen.getByText('60')
	userEvent.click(timerButton)

	act(() => {
		advanceBy(3000)
		jest.advanceTimersByTime(3000)
	})

	const anotherCounter = screen.getByText('2 min')
	userEvent.click(anotherCounter)

	act(() => {
		advanceBy(3000)
		jest.advanceTimersByTime(3000)
		mockRaf.flush()
	})

	expect(timerButton).toHaveTextContent('120')
})
