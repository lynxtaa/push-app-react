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
					<Route path="/" exact>
						<Home />
					</Route>
					<Route path="/:week(\d)/:day(\d)?">
						<Sets />
					</Route>
					<Redirect to="/" />
				</Switch>
			</App>
		</HashRouter>
	</StrictMode>
)

export default AppRouter
