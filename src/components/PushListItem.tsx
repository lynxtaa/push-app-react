import React from 'react'

interface Props {
	children: React.ReactNode
	className?: string
	onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void
}

const PushListItem = ({ onClick, children, className = '' }: Props) => (
	<li className={`mb-3 ${className}`}>
		<button type="button" className="btn btn-outline-secondary w-100" onClick={onClick}>
			{children}
		</button>
	</li>
)

export default PushListItem
