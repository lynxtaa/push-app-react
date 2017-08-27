import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import HeaderContainer from '@containers/HeaderContainer'

const App = ({ children }) => (
	<div className="container">
		<HeaderContainer />
		{children}
	</div>
)

App.propTypes = {
	children: PropTypes.node.isRequired,
}

export default withRouter(App)
