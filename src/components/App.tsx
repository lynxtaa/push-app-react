import { Box } from '@chakra-ui/core'
import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import HeaderContainer from 'containers/HeaderContainer'
import ErrorBoundary from 'containers/ErrorBoundary'

type Props = RouteComponentProps & {
	children: React.ReactNode
}

const App = ({ children }: Props) => (
	<Box as="main" p={3} maxW="2xl" margin="0 auto">
		<ErrorBoundary>
			<HeaderContainer />
			{children}
		</ErrorBoundary>
	</Box>
)

export default withRouter(App)
