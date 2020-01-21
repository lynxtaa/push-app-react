import React from 'react'
import { animated, useSpring, config } from 'react-spring'

import Portal from './Portal'

interface Props {
	children: React.ReactNode
	onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void
}

const Alert = ({ children, onClick }: Props) => {
	const spring = useSpring({
		from: { opacity: 0, height: '0px', marginBottom: '0rem' },
		to: { opacity: 1, height: '50px', marginBottom: '1rem' },
		config: config.wobbly,
	})

	return (
		<Portal id="alerts">
			<animated.div
				className="container alert alert-warning alert-dismissible fade show"
				role="alert"
				style={spring}
			>
				<button type="button" className="close" onClick={onClick} aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				{children}
			</animated.div>
		</Portal>
	)
}

export default Alert
