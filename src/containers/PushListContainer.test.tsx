import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import PushListContainer from './PushListContainer'

const sets = [{ id: '1', set: 1 }, { id: '2', set: 2 }, { id: '3', set: 3 }]

it('renders list', () => {
	const { container } = render(<PushListContainer sets={sets} />)
	expect(container.firstChild).toMatchSnapshot()
})

it('hides item after click', async () => {
	const { getByText } = render(<PushListContainer sets={sets} />)
	const item = getByText('2')
	fireEvent.click(item)
	expect(item.parentElement ? item.parentElement.className : '').toContain('hide')
})
