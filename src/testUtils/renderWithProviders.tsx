import { render, RenderOptions, RenderResult } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
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
			<ChakraProvider theme={theme}>
				<MemoryRouter initialEntries={initialEntries} initialIndex={initialIndex}>
					{children}
				</MemoryRouter>
			</ChakraProvider>
		),
	})
}
