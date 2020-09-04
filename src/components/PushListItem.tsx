import React from 'react'
import { useSpring, animated, config } from 'react-spring'
import { ListItem, Button } from '@chakra-ui/core'

interface Props {
	children: React.ReactNode
	isHidden?: boolean
	onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void
}

const AnimatedListItem = animated(ListItem) as any

const PushListItem: React.FC<Props> = ({ onClick, children, isHidden }) => {
	const spring = useSpring({
		from: { opacity: 0, marginBottom: '0px', height: '0px' },
		to: { opacity: 1, marginBottom: '16px', height: '40px' },
		config: config.gentle,
		reverse: isHidden,
	})

	return (
		<AnimatedListItem
			style={{
				...spring,
				visibility: spring.opacity.to((o: number) => (o === 0 ? 'hidden' : 'visible')),
			}}
		>
			<Button variant="outline" w="100%" onClick={onClick} variantColor="brand">
				{children}
			</Button>
		</AnimatedListItem>
	)
}

export default PushListItem
