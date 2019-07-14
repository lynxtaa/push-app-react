import React from 'react'
import { render, waitForElement } from '@testing-library/react'
import Home from './Home'
import { MemoryRouter, Route } from 'react-router-dom'
import { get } from 'idb-keyval'

jest.mock('idb-keyval', () => ({ set: jest.fn(), get: jest.fn() }))

const getMock = get as jest.Mock

it('if WEEK and DAY NOT found in idb, redirects to /1/1', async () => {
	getMock.mockResolvedValue(null)

	const { getByText } = render(
		<MemoryRouter initialEntries={['/']} initialIndex={0}>
			<Route path="/" component={Home} exact />
			<Route render={props => props.location.pathname} />
		</MemoryRouter>,
	)

	await waitForElement(() => getByText('/1/1'))
	expect(get).toHaveBeenCalledWith('route')
})

it('if DAY is found in idb, redirects to /1/<DAY>', async () => {
	getMock.mockResolvedValue({ day: 5 })

	const { getByText } = render(
		<MemoryRouter initialEntries={['/']} initialIndex={0}>
			<Route path="/" component={Home} exact />
			<Route render={props => props.location.pathname} />
		</MemoryRouter>,
	)

	await waitForElement(() => getByText('/1/5'))
	expect(get).toHaveBeenCalledWith('route')
})

it('if WEEK is found in idb, redirects to /<WEEK>/1', async () => {
	getMock.mockResolvedValue({ week: 5 })

	const { getByText } = render(
		<MemoryRouter initialEntries={['/']} initialIndex={0}>
			<Route path="/" component={Home} exact />
			<Route render={props => props.location.pathname} />
		</MemoryRouter>,
	)

	await waitForElement(() => getByText('/5/1'))
	expect(get).toHaveBeenCalledWith('route')
})

it('if DAY and WEEK is found in idb, redirects to /<WEEK>/<DAY>', async () => {
	getMock.mockResolvedValue({ day: 3, week: 5 })

	const { getByText } = render(
		<MemoryRouter initialEntries={['/']} initialIndex={0}>
			<Route path="/" component={Home} exact />
			<Route render={props => props.location.pathname} />
		</MemoryRouter>,
	)

	await waitForElement(() => getByText('/5/3'))
	expect(get).toHaveBeenCalledWith('route')
})
