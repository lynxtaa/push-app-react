import React, { StrictMode } from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import App from 'components/App'
import Home from 'containers/Home'
import Sets from 'containers/Sets'

const AppRouter = () => (
	<StrictMode>
		<HashRouter>
			<App>
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/:week(\d)/:day(\d)?" component={Sets} />
					<Redirect to="/" />
				</Switch>
			</App>
		</HashRouter>
	</StrictMode>
)

export default AppRouter
