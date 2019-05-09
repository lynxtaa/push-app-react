import React, { useState, useCallback } from 'react'

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
	const [prevSets, setPrevSets] = useState<Set[]>()

	const makeHandleClick = useCallback(
		id => () => setHidden(hidden => [...hidden, id]),
		[],
	)

	if (sets !== prevSets) {
		setPrevSets(sets)
		setHidden([])
	}

	return (
		<PushList>
			{sets.map(({ id, set }) => (
				<PushListItem
					key={id}
					className={hidden.includes(id) ? 'hide' : undefined}
					onClick={makeHandleClick(id)}
				>
					{set}
				</PushListItem>
			))}
		</PushList>
	)
}

export default PushListContainer
