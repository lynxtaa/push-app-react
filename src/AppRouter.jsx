import React from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import App from '@components/App'
import Home from '@containers/Home'
import Sets from '@containers/Sets'

const AppRouter = () => (
	<HashRouter>
		<App>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/:week(\d)/:day(\d)?" component={Sets} />
				<Redirect to="/" />
			</Switch>
		</App>
	</HashRouter>
)

export default hot(module)(AppRouter)
