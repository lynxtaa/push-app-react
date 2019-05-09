import React from 'react'

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
				<div>
					<h2 className="text-danger">Something went wrong</h2>
					<small>
						<details>
							{this.state.error && this.state.error.toString()}
							{this.state.errorInfo.componentStack}
						</details>
					</small>
				</div>
			)
		}

		return this.props.children
	}
}

export default ErrorBoundary
