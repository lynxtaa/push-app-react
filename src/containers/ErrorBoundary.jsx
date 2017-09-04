import React from 'react'
import PropTypes from 'prop-types'

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props)
		this.state = { error: null, errorInfo: null }
	}

	componentDidCatch(error, errorInfo) {
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

ErrorBoundary.propTypes = {
	children: PropTypes.node.isRequired,
}

export default ErrorBoundary
