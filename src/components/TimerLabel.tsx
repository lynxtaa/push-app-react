import React from 'react'
import { animated, useSpring } from 'react-spring'

interface Props {
	children: number
	onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void
}

const TimerLabel = ({ children, onClick }: Props) => {
	const { number } = useSpring({ number: children })

	return (
		<animated.button className="btn btn-outline-info" onClick={onClick} type="button">
			{number.to((value: number) => Math.round(value))}
		</animated.button>
	)
}

export default TimerLabel
