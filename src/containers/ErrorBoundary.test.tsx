import React from 'react'
import { render } from 'react-testing-library'
import ErrorBoundary from './ErrorBoundary'

it('renders children as is', () => {
	const { container } = render(
		<ErrorBoundary>
			<h1 id="child">Child</h1>
		</ErrorBoundary>,
	)

	expect(container.firstElementChild!.id).toBe('child')
})

it('catches propagating render error', () => {
	console.error = jest.fn()
	const Throw = () => {
		throw new Error('Render error')
	}
	const { getByText } = render(
		<ErrorBoundary>
			<Throw />
		</ErrorBoundary>,
	)
	expect(getByText('Something went wrong')).toBeInTheDocument()
})
