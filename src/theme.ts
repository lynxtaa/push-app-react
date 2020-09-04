import { theme, DefaultTheme, ColorHues } from '@chakra-ui/core'

const brand: ColorHues = {
	50: '#f0f0fc',
	100: '#d6d5df',
	200: '#bbb8c6',
	300: '#9f9caf',
	400: '#848097',
	500: '#6a667e',
	600: '#534f62',
	700: '#3b3947',
	800: '#23222d',
	900: '#0e0a14',
}

const customTheme: DefaultTheme = {
	...theme,
	colors: { ...theme.colors, brand } as any,
	fontSizes: {
		xs: '14px',
		sm: '16px',
		md: '18px',
		lg: '20px',
		xl: '24px',
		'2xl': '28px',
		'3xl': '36px',
		'4xl': '48px',
		'5xl': '64px',
		'6xl': '144px',
	},
}

export default customTheme
