import React from 'react'
import { Redirect } from 'react-router'
import idbKeyval from 'idb-keyval'

class Page404Container extends React.Component {
	state = { day: null, week: null }

	componentDidMount() {
		idbKeyval.get('route').then(data => {
			this.setState(data || { week: 1, day: 1 })
		})
	}

	render() {
		const { day, week } = this.state

		return day !== null && week !== null && <Redirect to={`/${week}/${day}`} />
	}
}

export default Page404Container
