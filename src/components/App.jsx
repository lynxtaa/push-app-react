import React from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import {withRouter} from 'react-router'

const App = ({ children }) => (
	<div className="container">
		<Header />
		{children}
	</div>
)

App.propTypes = {
	children: PropTypes.node.isRequired,
}

export default withRouter(App)
