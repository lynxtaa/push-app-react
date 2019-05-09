import React from 'react'

interface Props {
	children: React.ReactNode
}

const PushList = ({ children }: Props) => (
	<ul className="pushlist list-unstyled">{children}</ul>
)

export default PushList
