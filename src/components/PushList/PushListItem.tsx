import { useSpring, animated, config } from 'react-spring'
import { Button, ListItem } from '@chakra-ui/react'

interface Props {
	children: React.ReactNode
	isHidden?: boolean
	onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void
}

const AnimatedListItem = animated(ListItem)

export default function PushListItem({ onClick, children, isHidden }: Props) {
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
				visibility: (spring as any).opacity.interpolate((o: number) =>
					o === 0 ? 'hidden' : 'visible',
				),
			}}
		>
			<Button variant="outline" w="100%" onClick={onClick} colorScheme="brand">
				{children}
			</Button>
		</AnimatedListItem>
	)
}
