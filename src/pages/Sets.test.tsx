import { screen } from '@testing-library/react'
import Sets from './Sets'
import { Route } from 'react-router-dom'
import { set } from 'idb-keyval'
import renderWithProviders from 'testUtils/renderWithProviders'
import { rest, server } from 'jest/server'

const setMock = set as jest.Mock

it('renders sets page', async () => {
	server.use(
		rest.get('/schedule.json', (req, res, ctx) =>
			res(
				ctx.json([
					{
						weekNum: 1,
						days: [
							[10, 12, 7, 7, 9],
							[10, 12, 8, 8, 12],
							[11, 15, 9, 9, 13],
						],
					},
				]),
			),
		),
	)

	const { container } = renderWithProviders(
		<Route path="/:week(\d)/:day(\d)?">
			<Sets />
		</Route>,
		{ initialEntries: ['/1/1'], initialIndex: 0 },
	)

	await screen.findByText(/loading/i)

	await screen.findByText('12')

	expect(setMock).toHaveBeenCalledWith('route', { week: '1', day: '1' })

	expect(container.firstChild).toMatchSnapshot()
})

it('if fetch resulted in error, shows error', async () => {
	server.use(rest.get('/schedule.json', (req, res, ctx) => res(ctx.status(500))))

	renderWithProviders(
		<Route path="/:week(\d)/:day(\d)?">
			<Sets />
		</Route>,
		{ initialEntries: ['/1/1'], initialIndex: 0 },
	)

	await screen.findByText(/Error fetching/)
})

it('if no day in match.params, redirects to /<WEEK>/1', async () => {
	server.use(
		rest.get('/schedule.json', (req, res, ctx) =>
			res(
				ctx.json([
					{
						weekNum: 3,
						days: [
							[10, 12, 7, 7, 9],
							[10, 12, 8, 8, 12],
							[11, 15, 9, 9, 13],
						],
					},
				]),
			),
		),
	)

	renderWithProviders(
		<Route path="/:week(\d)/:day(\d)?">
			<Sets />
		</Route>,
		{ initialEntries: ['/3'], initialIndex: 0 },
	)

	await screen.findByText('9')
})
