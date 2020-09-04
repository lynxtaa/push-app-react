import React from 'react'

import NavPills from 'components/NavPills'
import TimerContainer from 'containers/TimerContainer'
import { Box, Flex } from '@chakra-ui/core'
import ColorModeToggle from 'components/ColorModeToggle'

const links = [1, 2, 3, 4, 5, 6].map((week) => ({
	link: `/${week}`,
	text: `Week ${week}`,
}))
const times = [
	{ label: '1 min', seconds: 6 },
	{ label: '2 min', seconds: 120 },
]

const HeaderContainer = () => (
	<Box as="header">
		<Flex>
			<NavPills links={links} />
			<ColorModeToggle ml="auto" />
		</Flex>
		<TimerContainer times={times} />
	</Box>
)

export default HeaderContainer
