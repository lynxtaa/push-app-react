import React, { useEffect } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { set } from 'idb-keyval'

import NavPills from 'components/NavPills'
import PushListContainer from './PushListContainer'
import useFetchedData from '../hooks/useFetchedData'
import { Text } from '@chakra-ui/core'
import Alert from 'components/Alert'

type ScheduleItem = {
	weekNum: number
	days: number[][]
}

function Sets() {
	const [schedule, error] = useFetchedData<ScheduleItem[]>(
		`${process.env.PUBLIC_URL}/schedule.json`,
	)

	const matchParams = useParams<{ day?: string; week: string }>()

	const { day, week } = matchParams
	useEffect(() => {
		set('route', { day, week })
	}, [day, week])

	if (error) {
		return (
			<Alert status="error" onClose={() => window.location.reload()}>
				{error.message}
			</Alert>
		)
	}

	if (!schedule) {
		return <Text fontSize="lg">Loading...</Text>
	}

	if (!day) {
		return <Redirect to={`/${week}/1`} />
	}

	const weekSchedule = schedule.find(({ weekNum }) => weekNum === Number(week))

	if (!weekSchedule) {
		throw new Error(`Week ${week} not found in schedule`)
	}

	const sets = weekSchedule.days[Number(day) - 1].map((set, i) => ({
		id: `${week}-${day}-${i}`,
		set,
	}))

	const links = [1, 2, 3].map((day) => ({
		link: `/${week}/${day}`,
		text: `Day ${day}`,
	}))

	return (
		<div>
			<NavPills links={links} />
			<PushListContainer sets={sets} />
		</div>
	)
}

export default Sets
