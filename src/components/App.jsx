import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import HeaderContainer from '@containers/HeaderContainer'
import ErrorBoundary from '@containers/ErrorBoundary'

const App = ({ children }) => (
	<div className="container p-3">
		<ErrorBoundary>
			<HeaderContainer />
			{children}
		</ErrorBoundary>
	</div>
)

App.propTypes = {
	children: PropTypes.node.isRequired,
}

export default withRouter(App)
