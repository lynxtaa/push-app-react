import React from 'react'
import PropTypes from 'prop-types'
import withSchedule from './withSchedule'

import { NavLink } from 'react-router-dom'

const Header = ({ schedule }) => (
	<ul className="nav nav-pills">
		{ schedule.map(({ weekNum }) => (
			<li className="nav-item" key={weekNum}>
				<NavLink to={`/${weekNum}/1`} className="nav-link">Week {weekNum}</NavLink>
			</li>
		)) }
	</ul>
)

Header.propTypes = {
	schedule: PropTypes.array.isRequired,
}

export default withSchedule(Header)
