import React from 'react'

interface Props {
	children: React.ReactNode
}

const ButtonGroup = ({ children }: Props) => <div className="btn-group">{children}</div>

export default ButtonGroup
