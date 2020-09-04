import React from 'react'
import { Box, Text } from '@chakra-ui/core'

interface Props {
	children: React.ReactNode
}

interface State {
	error?: Error
	errorInfo?: React.ErrorInfo
}

class ErrorBoundary extends React.Component<Props, State> {
	state: State = {}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		this.setState({ error, errorInfo })
	}

	render() {
		if (this.state.errorInfo) {
			return (
				<Box>
					<Text fontSize="xl" color="red.500">
						Something went wrong
					</Text>
					<Text as="details" whiteSpace="pre-wrap">
						{this.state.error && this.state.error.toString()}
						{this.state.errorInfo.componentStack}
					</Text>
				</Box>
			)
		}

		return this.props.children
	}
}

export default ErrorBoundary
