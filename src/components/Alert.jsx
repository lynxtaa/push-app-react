import React from 'react'
import PropTypes from 'prop-types'

const Alert = ({ children, onClick, show }) => show && (
	<div className="alert alert-warning alert-dismissible fade in" role="alert">
		<button type="button" className="close" onClick={onClick} data-dismiss="alert" aria-label="Close">
			<span aria-hidden="true">&times;</span>
		</button>
		{ children }
	</div>
)

Alert.propTypes = {
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func.isRequired,
	show: PropTypes.bool,
}

Alert.defaultProps = {
	show: false,
}

export default Alert
