import { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const Portal = ({ id, children }) => {
	const portalRef = useRef(document.getElementById(id) || document.createElement('div'))

	useEffect(() => {
		const portal = portalRef.current

		if (!document.getElementById(id)) {
			portal.id = id
			document.body.insertBefore(portal, document.body.firstChild)
		}

		return () => document.body.removeChild(portal)
	})

	return ReactDOM.createPortal(children, portalRef.current)
}

Portal.propTypes = {
	children: PropTypes.node.isRequired,
	id: PropTypes.string.isRequired,
}

export default Portal
