import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './AppRouter'

import './index.scss'

if (process.env.NODE_ENV == 'production') {
	require('offline-plugin/runtime').install() // service-worker for offline
}

ReactDOM.render(<AppRouter />, document.getElementById('app'))
