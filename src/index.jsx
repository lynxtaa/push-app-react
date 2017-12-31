import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './AppRouter'

import './styles/styles.css'

if (process.env.NODE_ENV == 'production') {
	require('offline-plugin/runtime').install()  // service-worker for offline
}

ReactDOM.render(<AppRouter />, document.getElementById('app'))
