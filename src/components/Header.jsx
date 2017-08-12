import React from 'react'

import { getWeekNums } from '../store/scheduleSelectors'
import NavPills from './NavPills'

const links = getWeekNums().map(week => ({ link: `/${week}`, text: `Week ${week}` }))

const Header = () => <NavPills links={links} />

export default Header
