import React from 'react'
import PropTypes from 'prop-types'

class PushListItem extends React.Component {
	handleClick = () => this.props.onClick(this.props.id)

	render() {
		return (
			<li className={`mb-3 ${this.props.className}`}>
				<button
					type="button"
					className="btn btn-outline-secondary w-100"
					onClick={this.handleClick}
				>
					{this.props.children}
				</button>
			</li>
		)
	}
}

PushListItem.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	id: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
}

PushListItem.defaultProps = { className: '' }

export default PushListItem
