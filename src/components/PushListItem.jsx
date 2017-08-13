import React from 'react'
import PropTypes from 'prop-types'

class PushListItem extends React.Component {
	constructor(props) {
		super(props)
		this.state = { visible: true }
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick(event) {
		event.preventDefault()
		this.setState({ visible: false })
	}

	render() {
		return this.state.visible && (
			<li>
				<button className="btn btn-outline-secondary" onClick={this.handleClick}>{this.props.set}</button>
			</li>
		)
	}
}

PushListItem.propTypes = {
	set: PropTypes.number.isRequired,
}

export default PushListItem
