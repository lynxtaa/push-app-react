import React from 'react'
import { animated, useSpring } from 'react-spring'

interface Props {
	children: React.ReactNode
	onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void
}

const round = (value: any) => value.interpolate((value: number) => Math.round(value))

const TimerLabel = ({ children, onClick }: Props) => {
	const { number } = useSpring({ number: children })

	return (
		<animated.button className="btn btn-outline-info" onClick={onClick} type="button">
			{round(number)}
		</animated.button>
	)
}

export default TimerLabel
