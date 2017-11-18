import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'

import { saveState } from '../store/localStorage'

import NavPills from '@components/NavPills'
import PushListContainer from './PushListContainer'

class Sets extends React.Component {
	constructor(props) {
		super(props)
		this.state = { schedule: null }
	}

	componentDidMount() {
		fetch('/api/schedule')
			.then(res => res.json())
			.then(schedule => {
				this.setState({ schedule })
			})
	}

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
		const { schedule } = this.state

		if (!schedule) {
			return <h2>Loading...</h2>
		}

		if (!day) {
			return <Redirect to={`/${week}/1`} />
		}

		const sets = schedule
			.find(({ weekNum }) => weekNum == week).days[day - 1]
			.map((set, i) => ({ id: `${week}-${day}-${i}`, set }))

		return (
			<div>
				<NavPills links={this.links} />
				<PushListContainer sets={sets} />
			</div>
		)
	}
}

Sets.propTypes = {
	match: PropTypes.object.isRequired,
}

export default Sets
