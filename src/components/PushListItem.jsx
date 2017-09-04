import React from 'react'
import PropTypes from 'prop-types'

class PushListItem extends React.Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick(event) {
		event.preventDefault()
		this.props.onClick(this.props.id)
	}

	render() {
		return (
			<li className="mb-3">
				<button className="btn btn-outline-secondary w-100" onClick={this.handleClick}>
					{this.props.children}
				</button>
			</li>
		)
	}
}

PushListItem.propTypes = {
	children: PropTypes.node.isRequired,
	id: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
}

export default PushListItem
