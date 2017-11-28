import React from 'react'
import ReactDom from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import AppRouter from './AppRouter'
import * as OfflinePluginRuntime from 'offline-plugin/runtime'

import './styles/styles.css'

OfflinePluginRuntime.install() // service-worker for offline

const renderApp = () => ReactDom.render(
	<AppContainer><AppRouter /></AppContainer>,
	document.getElementById('app')
)

if (module.hot) {
	module.hot.accept('./AppRouter', renderApp)
}

renderApp()
