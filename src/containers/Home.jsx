import React from 'react'
import { Redirect } from 'react-router'
import { get } from 'idb-keyval'

class Home extends React.Component {
	state = { day: null, week: null }

	componentDidMount() {
		get('route').then(data => this.setState(data || { week: 1, day: 1 }))
	}

	render() {
		const { day, week } = this.state

		return day !== null && week !== null && <Redirect to={`/${week}/${day}`} />
	}
}

export default Home