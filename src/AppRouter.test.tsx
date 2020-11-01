import React from 'react'
import AppRouter from './AppRouter'
import { screen } from '@testing-library/react'
import { get } from 'idb-keyval'
import renderWithProviders from 'testUtils/renderWithProviders'
import { rest, server } from 'jest/server'

const getMock = get as jest.Mock

it('renders without crashing', async () => {
	server.use(
		rest.get('/public/schedule.json', (req, res, ctx) =>
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

	getMock.mockResolvedValue(null)

	renderWithProviders(<AppRouter />)

	await screen.findByText('Week 1')
})
