import React from 'react'

interface Props {
	children: React.ReactNode
	onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void
}

const TimerLabel = ({ children, onClick }: Props) => (
	<button className="btn btn-outline-info" onClick={onClick} type="button">
		{children}
	</button>
)

export default TimerLabel
