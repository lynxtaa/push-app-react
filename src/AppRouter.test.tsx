import React from 'react'
import AppRouter from './AppRouter'
import { screen } from '@testing-library/react'
import { get } from 'idb-keyval'
import renderWithProviders from 'testUtils/renderWithProviders'

const getMock = get as jest.Mock

it('renders without crashing', async () => {
	getMock.mockResolvedValue(null)

	renderWithProviders(<AppRouter />)

	await screen.findByText('Week 1')
})
