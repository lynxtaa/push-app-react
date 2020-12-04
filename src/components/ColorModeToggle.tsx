import { IconButton, useColorMode, IconButtonProps } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

type Props = Omit<IconButtonProps, 'children' | 'aria-label'>

export default function ColorModeToggle(props: Props) {
	const { colorMode, toggleColorMode } = useColorMode()

	return (
		<IconButton
			onClick={toggleColorMode}
			{...props}
			aria-label="Toggle color mode"
			icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
		/>
	)
}
