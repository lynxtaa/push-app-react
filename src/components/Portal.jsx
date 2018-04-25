import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class Portal extends React.Component {
	componentDidMount() {
		if (!document.getElementById(this.props.id)) {
			this.portal.id = this.props.id
			document.body.insertBefore(this.portal, document.body.firstChild)
		}
	}

	componentWillUnmount() {
		document.body.removeChild(this.portal)
	}

	portal = document.getElementById(this.props.id) || document.createElement('div')

	render() {
		return ReactDOM.createPortal(this.props.children, this.portal)
	}
}

Portal.propTypes = {
	children: PropTypes.node.isRequired,
	id: PropTypes.string.isRequired,
}

export default Portal
