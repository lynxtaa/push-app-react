import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class Portal extends React.Component {
	constructor(props) {
		super(props)

		const { id } = this.props
		let portal = id && document.getElementById(id)

		if (!portal) {
			portal = document.createElement('div')
			portal.id = id
			document.body.insertBefore(portal, document.body.firstChild)
		}

		this.portal = portal
	}

	componentWillUnmount() {
		document.body.removeChild(this.portal)
	}

	render() {
		return ReactDOM.createPortal(this.props.children, this.portal)
	}
}

Portal.propTypes = {
	children: PropTypes.node.isRequired,
	id: PropTypes.string.isRequired,
}

export default Portal
