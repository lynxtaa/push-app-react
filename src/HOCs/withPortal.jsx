import React from 'react'
import ReactDOM from 'react-dom'

const withPortal = id => WrappedComponent => {
	class WithPortal extends React.Component {
		componentDidMount() {
			let portal = id && document.getElementById(id)

			if (!portal) {
				portal = document.createElement('div')
				portal.id = id
				document.body.insertBefore(portal, document.body.firstChild)
			}

			this.portal = portal
			this.componentDidUpdate()
		}

		componentDidUpdate() {
			ReactDOM.render(<WrappedComponent {...this.props} />, this.portal)
		}

		componentWillUnmount() {
			document.body.removeChild(this.portal)
		}

		render() {
			return null
		}
	}

	return WithPortal
}

export default withPortal
