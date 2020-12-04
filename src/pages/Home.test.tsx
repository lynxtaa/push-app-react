import { screen } from '@testing-library/react'
import Home from './Home'
import { Route } from 'react-router-dom'
import { get } from 'idb-keyval'
import renderWithProviders from 'testUtils/renderWithProviders'

const getMock = get as jest.Mock

const render = (ui: React.ReactElement) =>
	renderWithProviders(
		<>
			<Route path="/" exact>
				{ui}
			</Route>
			<Route render={(props) => props.location.pathname} />
		</>,
		{ initialEntries: ['/'], initialIndex: 0 },
	)

it('if WEEK and DAY NOT found in idb, redirects to /1/1', async () => {
	getMock.mockResolvedValue(null)

	render(<Home />)

	await screen.findByText('/1/1')
	expect(get).toHaveBeenCalledWith('route')
})

it('if DAY is found in idb, redirects to /1/<DAY>', async () => {
	getMock.mockResolvedValue({ day: 5 })

	render(<Home />)

	await screen.findByText('/1/5')
	expect(get).toHaveBeenCalledWith('route')
})

it('if WEEK is found in idb, redirects to /<WEEK>/1', async () => {
	getMock.mockResolvedValue({ week: 5 })

	render(<Home />)

	await screen.findByText('/5/1')
	expect(get).toHaveBeenCalledWith('route')
})

it('if DAY and WEEK is found in idb, redirects to /<WEEK>/<DAY>', async () => {
	getMock.mockResolvedValue({ day: 3, week: 5 })

	render(<Home />)

	await screen.findByText('/5/3')
	expect(get).toHaveBeenCalledWith('route')
})
