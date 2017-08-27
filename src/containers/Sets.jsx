import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'

import { getSets } from '../store/scheduleSelectors'
import { saveState } from '../store/localStorage'

import NavPills from '@components/NavPills'
import PushListContainer from './PushListContainer'

class Sets extends React.Component {
	componentWillUpdate({ match }) {
		saveState(match.params)
	}

	get links() {
		const { week } = this.props.match.params

		return [1, 2, 3].map(day => ({
			link: `/${week}/${day}`,
			text: `Day ${day}`,
		}))
	}

	render() {
		const { day, week } = this.props.match.params

		return day ? (
			<div>
				<NavPills links={this.links} />
				<PushListContainer sets={getSets(week, day)} />
			</div>
		) : <Redirect to={`/${week}/1`} />
	}
}

Sets.propTypes = {
	match: PropTypes.object.isRequired,
}

export default Sets
