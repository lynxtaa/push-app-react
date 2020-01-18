import React, { useState, useEffect } from 'react'

import PushList from 'components/PushList'
import PushListItem from 'components/PushListItem'

interface Set {
	id: string
	set: number
}

interface Props {
	sets: Set[]
}

const PushListContainer = ({ sets }: Props) => {
	const [hidden, setHidden] = useState<string[]>([])

	useEffect(() => {
		setHidden([])
	}, [sets])

	return (
		<PushList>
			{sets.map(({ set, id }) => (
				<PushListItem
					key={id}
					onClick={() => setHidden([...hidden, id])}
					isHidden={hidden.includes(id)}
				>
					{set}
				</PushListItem>
			))}
		</PushList>
	)
}

export default PushListContainer
