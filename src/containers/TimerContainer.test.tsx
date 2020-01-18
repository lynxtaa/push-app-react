import React from 'react'
import { render, fireEvent, act, getByText } from '@testing-library/react'
import TimerContainer from './TimerContainer'

const times = [
	{ label: '1 min', seconds: 60 },
	{ label: '2 min', seconds: 120 },
]

declare const Date: any

const now = Date.now()

Date.now = jest.fn()

beforeEach(() => {
	Date.now.mockReturnValue(now)
})

it('renders timer', () => {
	const { container } = render(<TimerContainer times={times} />)
	expect(container.firstChild).toMatchSnapshot()
})

it('runs timer after click', async () => {
	jest.useFakeTimers()

	const { getByText } = render(<TimerContainer times={times} />)
	const timerButton = getByText('60')
	fireEvent.click(timerButton)
	act(() => {
		Date.now.mockReturnValue(Date.now() + 3000)
		jest.advanceTimersByTime(3000)
	})
	expect(timerButton.textContent).toBe('57')
})

it('shows alert after countdown', async () => {
	jest.useFakeTimers()

	const renderResult = render(<TimerContainer times={times} />)
	const timerButton = renderResult.getByText('60')
	fireEvent.click(timerButton)
	act(() => {
		Date.now.mockReturnValue(Date.now() + 60000)
		jest.advanceTimersByTime(60000)
	})
	expect(getByText(document.body, 'Do next!')).toBeInTheDocument()
	expect(timerButton.textContent).toBe('0')
})

it('toggles timer', async () => {
	jest.useFakeTimers()

	const { getByText } = render(<TimerContainer times={times} />)
	const timerButton = getByText('60')
	fireEvent.click(timerButton)
	act(() => {
		Date.now.mockReturnValue(Date.now() + 3000)
		jest.advanceTimersByTime(3000)
	})
	fireEvent.click(timerButton)
	expect(timerButton.textContent).toBe('60')
	act(() => {
		Date.now.mockReturnValue(Date.now() + 3000)
		jest.advanceTimersByTime(3000)
	})
	expect(timerButton.textContent).toBe('60')
})

it('stops timer when counter is changed', async () => {
	jest.useFakeTimers()

	const { getByText } = render(<TimerContainer times={times} />)
	const timerButton = getByText('60')
	fireEvent.click(timerButton)
	act(() => {
		Date.now.mockReturnValue(Date.now() + 3000)
		jest.advanceTimersByTime(3000)
	})
	const anotherCounter = getByText('2 min')
	fireEvent.click(anotherCounter)
	expect(timerButton.textContent).toBe('120')
	act(() => {
		Date.now.mockReturnValue(Date.now() + 3000)
		jest.advanceTimersByTime(3000)
	})
	expect(timerButton.textContent).toBe('120')
	expect(anotherCounter.className).toContain('active')
})
