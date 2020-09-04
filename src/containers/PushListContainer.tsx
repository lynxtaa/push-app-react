import { List } from '@chakra-ui/core'
import React, { useState, useEffect } from 'react'

import PushListItem from 'components/PushListItem'

interface Set {
	id: string
	set: number
}

interface Props {
	sets: Set[]
}

export default function PushListContainer({ sets }: Props) {
	const [hidden, setHidden] = useState<string[]>([])

	useEffect(() => {
		setHidden([])
	}, [sets])

	return (
		<List>
			{sets.map(({ set, id }) => (
				<PushListItem
					key={id}
					onClick={() => setHidden([...hidden, id])}
					isHidden={hidden.includes(id)}
				>
					{set}
				</PushListItem>
			))}
		</List>
	)
}
