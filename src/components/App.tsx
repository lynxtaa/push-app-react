import { Box } from '@chakra-ui/core'
import React from 'react'

import Header from 'components/Header'
import ErrorBoundary from 'components/ErrorBoundary'

type Props = {
	children: React.ReactNode
}

export default function App({ children }: Props) {
	return (
		<Box as="main" p={3} maxW="2xl" margin="0 auto">
			<ErrorBoundary>
				<Header />
				{children}
			</ErrorBoundary>
		</Box>
	)
}
