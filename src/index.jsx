import React from 'react'
import ReactDom from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import AppRouter from './AppRouter'

import 'bootstrap/dist/js/bootstrap'

import './styles/styles.css'

const renderApp = () => ReactDom.render(
	<AppContainer><AppRouter /></AppContainer>,
	document.getElementById('app')
)

if (module.hot) {
	module.hot.accept('./AppRouter', renderApp)
}

renderApp()
