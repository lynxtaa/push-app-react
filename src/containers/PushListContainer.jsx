import React from 'react'
import PropTypes from 'prop-types'

import PushList from '@components/PushList'
import PushListItem from '@components/PushListItem'

class PushListContainer extends React.Component {
	state = { hidden: [] }

	componentWillReceiveProps({ sets }) {
		if (sets !== this.props.sets) {
			this.setState({ hidden: [] })
		}
	}

	hideSet = id => this.setState(
		({ hidden }) => ({ hidden: [...hidden, id] })
	)

	render() {
		return (
			<PushList>
				{this.props.sets.map(({ id, set }) => (
					<PushListItem
						key={id}
						id={id}
						className={this.state.hidden.includes(id) ? 'hide' : undefined}
						onClick={this.hideSet}
					>
						{set}
					</PushListItem>
				))}
			</PushList>
		)
	}
}

PushListContainer.propTypes = {
	sets: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		set: PropTypes.number.isRequired,
	})).isRequired,
}

export default PushListContainer
