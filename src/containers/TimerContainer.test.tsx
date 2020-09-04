import React from 'react'
import { act, screen } from '@testing-library/react'
import createMockRaf, { MockRaf } from '@react-spring/mock-raf'
import { Globals, FrameLoop } from 'react-spring'

import TimerContainer from './TimerContainer'
import renderWithProviders from '../testUtils/renderWithProviders'
import userEvent from '@testing-library/user-event'

const times = [
	{ label: '1 min', seconds: 60 },
	{ label: '2 min', seconds: 120 },
]

declare const Date: any

const now = Date.now()

Date.now = jest.fn()

let mockRaf: MockRaf

beforeEach(() => {
	Date.now.mockReturnValue(now)

	mockRaf = createMockRaf()

	Globals.assign({
		now: mockRaf.now,
		requestAnimationFrame: mockRaf.raf,
		cancelAnimationFrame: mockRaf.cancel,
		frameLoop: new FrameLoop(),
	})
})

it('renders timer', () => {
	const { container } = renderWithProviders(<TimerContainer times={times} />)
	expect(container.firstChild).toMatchSnapshot()
})

it('runs timer after click', async () => {
	jest.useFakeTimers()

	renderWithProviders(<TimerContainer times={times} />)

	const timerButton = screen.getByText('60')
	userEvent.click(timerButton)

	act(() => {
		Date.now.mockReturnValue(Date.now() + 3000)
		jest.advanceTimersByTime(3000)
	})

	mockRaf.flush()

	expect(timerButton).toHaveTextContent('57')
})

it('shows alert after countdown', async () => {
	jest.useFakeTimers()

	const renderResult = renderWithProviders(<TimerContainer times={times} />)

	const timerButton = renderResult.getByText('60')
	userEvent.click(timerButton)

	act(() => {
		Date.now.mockReturnValue(Date.now() + 60000)
		jest.advanceTimersByTime(60000)
	})

	mockRaf.flush()

	expect(screen.getByText('Do next!')).toBeInTheDocument()
	expect(timerButton).toHaveTextContent('0')
})

it('toggles timer', async () => {
	jest.useFakeTimers()

	renderWithProviders(<TimerContainer times={times} />)

	const timerButton = screen.getByText('60')
	userEvent.click(timerButton)

	act(() => {
		Date.now.mockReturnValue(Date.now() + 3000)
		jest.advanceTimersByTime(3000)
	})

	userEvent.click(timerButton)
	expect(timerButton).toHaveTextContent('60')

	act(() => {
		Date.now.mockReturnValue(Date.now() + 3000)
		jest.advanceTimersByTime(3000)
	})

	expect(timerButton).toHaveTextContent('60')
})

it('stops timer when counter is changed', async () => {
	jest.useFakeTimers()

	renderWithProviders(<TimerContainer times={times} />)

	const timerButton = screen.getByText('60')
	userEvent.click(timerButton)

	act(() => {
		Date.now.mockReturnValue(Date.now() + 3000)
		jest.advanceTimersByTime(3000)
	})

	const anotherCounter = screen.getByText('2 min')
	userEvent.click(anotherCounter)

	act(() => {
		Date.now.mockReturnValue(Date.now() + 3000)
		jest.advanceTimersByTime(3000)
		mockRaf.flush()
	})

	expect(timerButton).toHaveTextContent('120')
})
