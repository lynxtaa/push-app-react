import React from 'react'
import { useSpring, animated, config } from 'react-spring'

interface Props {
	children: React.ReactNode
	isHidden?: boolean
	onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void
}

const PushListItem: React.FC<Props> = ({ onClick, children, isHidden }) => {
	const spring = useSpring({
		from: { opacity: 0, marginBottom: '0px', height: '0px' },
		to: { opacity: 1, marginBottom: '16px', height: '40px' },
		config: config.gentle,
		reverse: isHidden,
	})

	return (
		<animated.li
			style={{
				...spring,
				visibility: spring.opacity.to((o: number) => (o === 0 ? 'hidden' : 'visible')),
			}}
		>
			<button type="button" className="btn btn-outline-secondary w-100" onClick={onClick}>
				{children}
			</button>
		</animated.li>
	)
}

export default PushListItem
