import React from 'react'

import { getWeekNums } from '../store/scheduleSelectors'
import NavPills from './NavPills'
import Timer from './Timer'

const links = getWeekNums().map(week => ({ link: `/${week}`, text: `Week ${week}` }))
const times = [
	{ label: '1 min', seconds: 5 },
	{ label: '2 min', seconds: 120 },
]

const Header = () => (
	<header>
		<NavPills links={links} />
		<Timer times={times} />
	</header>
)

export default Header
