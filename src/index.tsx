import ReactDOM from 'react-dom'
import { ChakraProvider } from '@chakra-ui/react'

import 'focus-visible/dist/focus-visible.min.js'

import AppRouter from './AppRouter'
import theme from './theme'

ReactDOM.render(
	<ChakraProvider theme={theme} resetCSS>
		<AppRouter />
	</ChakraProvider>,
	document.getElementById('root'),
)
