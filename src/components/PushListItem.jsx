import React from 'react'
import PropTypes from 'prop-types'

const PushListItem = ({ onClick, children, className }) => (
	<li className={`mb-3 ${className}`}>
		<button type="button" className="btn btn-outline-secondary w-100" onClick={onClick}>
			{children}
		</button>
	</li>
)

PushListItem.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	onClick: PropTypes.func.isRequired,
}

PushListItem.defaultProps = { className: '' }

export default PushListItem
