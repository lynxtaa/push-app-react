import React from 'react'
import PropTypes from 'prop-types'
import Portal from './Portal'

const Alert = ({ children, onClick }) => (
	<Portal id="alerts">
		<div className="container alert alert-warning alert-dismissible fade show" role="alert">
			<button type="button" className="close" onClick={onClick} aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
			{ children }
		</div>
	</Portal>
)

Alert.propTypes = {
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func.isRequired,
}

export default Alert
