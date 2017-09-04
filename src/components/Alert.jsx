import React from 'react'
import PropTypes from 'prop-types'
import withPortal from '../HOCs/withPortal'

const Alert = ({ children, onClick }) => (
	<div className="container alert alert-warning alert-dismissible fade show" role="alert">
		<button type="button" className="close" onClick={onClick} aria-label="Close">
			<span aria-hidden="true">&times;</span>
		</button>
		{ children }
	</div>
)

Alert.propTypes = {
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func.isRequired,
}

export default withPortal('alerts')(Alert)
