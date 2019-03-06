import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import HeaderContainer from '@containers/HeaderContainer'
import ErrorBoundary from '@containers/ErrorBoundary'

const App = ({ children }) => (
	<main className="container p-3">
		<ErrorBoundary>
			<HeaderContainer />
			{children}
		</ErrorBoundary>
	</main>
)

App.propTypes = {
	children: PropTypes.node.isRequired,
}

export default withRouter(App)
