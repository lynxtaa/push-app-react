import React from 'react'
import PropTypes from 'prop-types'

import PushListItem from './PushListItem'

class PushList extends React.Component {
	constructor(props) {
		super(props)
		this.state = { sets: this.props.sets }
		this.hideSet = this.hideSet.bind(this)
	}

	componentWillReceiveProps({ sets }) {
		if (sets !== this.props.sets) {
			this.setState({ sets })
		}
	}

	hideSet(id) {
		this.setState(({ sets }) => ({
			sets: sets.filter(set => set.id !== id),
		}))
	}

	render() {
		return (
			<ul className="pushlist">
				{this.state.sets.map(({ id, set }) =>
					<PushListItem key={id} id={id} onClick={this.hideSet}>{set}</PushListItem>
				)}
			</ul>
		)
	}
}

PushList.propTypes = {
	sets: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		set: PropTypes.number.isRequired,
	})).isRequired,
}

export default PushList
