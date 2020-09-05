import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core'
import { Global, css } from '@emotion/core'

import 'focus-visible/dist/focus-visible.min.js'

import AppRouter from './AppRouter'
import theme from './theme'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<Global
			styles={css`
				.js-focus-visible :focus:not([data-focus-visible-added]) {
					outline: none;
					box-shadow: none;
				}
			`}
		/>
		<ColorModeProvider>
			<CSSReset />
			<AppRouter />
		</ColorModeProvider>
	</ThemeProvider>,
	document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
