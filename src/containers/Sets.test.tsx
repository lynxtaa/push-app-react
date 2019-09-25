import React from 'react'
import { render, waitForElement } from '@testing-library/react'
import Sets from './Sets'
import { MemoryRouter, Route } from 'react-router-dom'
import { set } from 'idb-keyval'

jest.mock('idb-keyval', () => ({ set: jest.fn(), get: jest.fn() }))

const setMock = set as jest.Mock

it('renders sets page', async () => {
	window.fetch = jest.fn().mockResolvedValueOnce({
		ok: true,
		json: () =>
			Promise.resolve([
				{
					weekNum: 1,
					days: [[10, 12, 7, 7, 9], [10, 12, 8, 8, 12], [11, 15, 9, 9, 13]],
				},
			]),
	})

	const { container, getByText } = render(
		<MemoryRouter initialEntries={['/1/1']} initialIndex={0}>
			<Route path="/:week(\d)/:day(\d)?">
				<Sets />
			</Route>
		</MemoryRouter>,
	)

	expect(container.firstChild).toMatchSnapshot()
	await waitForElement(() => getByText('12'))
	expect(setMock).toHaveBeenCalledWith('route', { week: '1', day: '1' })
	expect(container.firstChild).toMatchSnapshot()
})

it('if fetch resulted in error, shows error', async () => {
	window.fetch = jest.fn().mockRejectedValue(new Error('Fetching Error'))

	const { container, getByText } = render(
		<MemoryRouter initialEntries={['/1/1']} initialIndex={0}>
			<Route path="/:week(\d)/:day(\d)?">
				<Sets />
			</Route>
		</MemoryRouter>,
	)

	await waitForElement(() => getByText('Fetching Error'))
	expect(container.firstChild).toMatchSnapshot()
})

it('if no day in match.params, redirects to /<WEEK>/1', async () => {
	window.fetch = jest.fn().mockResolvedValueOnce({
		ok: true,
		json: () =>
			Promise.resolve([
				{
					weekNum: 3,
					days: [[10, 12, 7, 7, 9], [10, 12, 8, 8, 12], [11, 15, 9, 9, 13]],
				},
			]),
	})

	const { container, getByText } = render(
		<MemoryRouter initialEntries={['/3']} initialIndex={0}>
			<Route path="/:week(\d)/:day(\d)?">
				<Sets />
			</Route>
		</MemoryRouter>,
	)

	await waitForElement(() => getByText('9'))
	expect(container.firstChild).toMatchSnapshot()
})
