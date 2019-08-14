import React from 'react'
import AppRouter from './AppRouter'
import { render, waitForElement } from '@testing-library/react'
import { get } from 'idb-keyval'

const getMock = get as jest.Mock

it('renders without crashing', async () => {
	getMock.mockResolvedValue(null)

	const { getByText } = render(<AppRouter />)
	await waitForElement(() => getByText('Week 1'))
})
