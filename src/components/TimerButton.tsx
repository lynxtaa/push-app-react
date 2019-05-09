import React from 'react'

interface Props {
	active?: boolean
	children: React.ReactNode
	onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void
	value: number
}

const TimerButton = ({ onClick, value, active = false, children }: Props) => (
	<button
		className={'btn btn-primary' + (active ? ' active' : '')}
		onClick={onClick}
		type="button"
		value={value}
	>
		{children}
	</button>
)

export default TimerButton
