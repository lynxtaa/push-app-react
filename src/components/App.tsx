import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import HeaderContainer from 'containers/HeaderContainer'
import ErrorBoundary from 'containers/ErrorBoundary'

type Props = RouteComponentProps & {
	children: React.ReactNode
}

const App = ({ children }: Props) => (
	<main className="container p-3">
		<ErrorBoundary>
			<HeaderContainer />
			{children}
		</ErrorBoundary>
	</main>
)

export default withRouter(App)
