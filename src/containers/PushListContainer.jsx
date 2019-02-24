import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'

import PushList from '@components/PushList'
import PushListItem from '@components/PushListItem'

const PushListContainer = ({ sets }) => {
	const [hidden, setHidden] = useState([])
	const [prevSets, setPrevSets] = useState()

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
					id={id}
					className={hidden.includes(id) ? 'hide' : undefined}
					onClick={makeHandleClick(id)}
				>
					{set}
				</PushListItem>
			))}
		</PushList>
	)
}

PushListContainer.propTypes = {
	sets: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			set: PropTypes.number.isRequired,
		}),
	).isRequired,
}

export default PushListContainer
