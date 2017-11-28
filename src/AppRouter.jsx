import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from '@components/App'
import Sets from '@containers/Sets'
import Page404 from '@containers/Page404'

const AppRouter = () => (
	<Router>
		<App>
			<Switch>
				<Route path="/:week(\d)/:day(\d)?" component={Sets} />
				<Route component={Page404} />
			</Switch>
		</App>
	</Router>
)

export default AppRouter
