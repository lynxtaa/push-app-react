import React from 'react'
import { animated, useSpring } from 'react-spring'
import { Button, ButtonProps } from '@chakra-ui/core'

type Props = {
	children: number
} & Omit<ButtonProps, 'children'>

// as any, потому что типы react-spring сильно тормозят
const AnimatedButton: React.FC<ButtonProps> = (animated as any)(Button)

export default function TimerLabel({ children, onClick, ...rest }: Props) {
	const { number } = useSpring({ number: children })

	return (
		<AnimatedButton onClick={onClick} {...rest} variant="outline" variantColor="brand">
			{number.to((value: number) => Math.round(value))}
		</AnimatedButton>
	)
}
