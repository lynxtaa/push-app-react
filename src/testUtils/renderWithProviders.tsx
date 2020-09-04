import { render, RenderOptions, RenderResult } from '@testing-library/react'
import { ThemeProvider, ColorModeProvider } from '@chakra-ui/core'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import theme from '../theme'

export default function renderWithProviders(
	ui: React.ReactElement,
	{
		initialEntries,
		initialIndex,
		...rest
	}: Omit<RenderOptions, 'queries'> & {
		initialEntries?: string[]
		initialIndex?: number
	} = {},
): RenderResult {
	return render(ui, {
		...rest,
		wrapper: ({ children }: { children?: React.ReactNode }) => (
			<ThemeProvider theme={theme}>
				<ColorModeProvider>
					<MemoryRouter initialEntries={initialEntries} initialIndex={initialIndex}>
						{children}
					</MemoryRouter>
				</ColorModeProvider>
			</ThemeProvider>
		),
	})
}
