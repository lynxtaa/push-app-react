import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import App from './components/App'
import Sets from './components/Sets'
import Page404 from './components/Page404'

const AppRouter = () => (
	<Router>
		<App>
			<Switch>
				<Route path="/:week/:day" component={Sets} />
				<Route component={Page404} />
			</Switch>
		</App>
	</Router>
)

export default AppRouter
