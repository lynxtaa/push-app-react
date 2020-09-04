import React from 'react'
import { Alert as ChakraAlert, AlertIcon, CloseButton, AlertProps } from '@chakra-ui/core'

import Portal from './Portal'

type Props = {
	children: React.ReactNode
	onClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
} & AlertProps

export default function Alert({ children, onClose, ...rest }: Props) {
	return (
		<Portal id="alerts">
			<ChakraAlert status="info" maxW="2xl" margin="0 auto" {...rest}>
				<AlertIcon />
				{children}
				<CloseButton position="absolute" right="8px" top="8px" onClick={onClose} />
			</ChakraAlert>
		</Portal>
	)
}
