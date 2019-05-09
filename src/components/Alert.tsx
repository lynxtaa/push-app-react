import React from 'react'
import Portal from './Portal'

interface Props {
	children: React.ReactNode
	onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void
}

const Alert = ({ children, onClick }: Props) => (
	<Portal id="alerts">
		<div
			className="container alert alert-warning alert-dismissible fade show"
			role="alert"
		>
			<button type="button" className="close" onClick={onClick} aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
			{children}
		</div>
	</Portal>
)

export default Alert
