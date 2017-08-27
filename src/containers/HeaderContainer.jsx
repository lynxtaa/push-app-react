import React from 'react'

import { getWeekNums } from '../store/scheduleSelectors'
import Header from '@components/Header'
import NavPills from '@components/NavPills'
import TimerContainer from '@containers/TimerContainer'

const links = getWeekNums().map(week => ({ link: `/${week}`, text: `Week ${week}` }))
const times = [
	{ label: '1 min', seconds: 60 },
	{ label: '2 min', seconds: 120 },
]

const HeaderContainer = () => (
	<Header>
		<NavPills links={links} />
		<TimerContainer times={times} />
	</Header>
)

export default HeaderContainer
