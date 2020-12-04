import { animated, useSpring } from 'react-spring'
import { Button, ButtonProps } from '@chakra-ui/react'

type Props = {
	children: number
} & Omit<ButtonProps, 'children'>

const AnimatedButton = animated(Button)

export default function TimerLabel({ children, onClick, ...rest }: Props) {
	const { number } = useSpring({ number: children })

	return (
		<AnimatedButton onClick={onClick} {...rest} variant="outline" colorScheme="brand">
			{number.interpolate((value: unknown) => Math.round(value as number))}
		</AnimatedButton>
	)
}
