import React, { useCallback, useState, useRef } from 'react'

import Alert from 'components/Alert'
import TimerLabel from 'components/TimerLabel'
import useInterval from '../hooks/useInterval'
import { ButtonGroup, Button, Box } from '@chakra-ui/core'

interface Time {
	seconds: number
	label: string
}

interface Props {
	times: Time[]
}

const Timer = ({ times }: Props) => {
	const [countdown, setCountdown] = useState<number>(times[0].seconds)
	const [counter, setCounter] = useState<number>(times[0].seconds)
	const [timerActive, setTimerActive] = useState<boolean>(false)

	const start = useRef<number>(0)

	useInterval(
		() => {
			const delta = Date.now() - start.current
			const countdown = counter - Math.floor(delta / 1000)
			if (countdown > 0) {
				setCountdown(countdown)
			} else {
				setCountdown(0)
				setTimerActive(false)
			}
		},
		timerActive ? 1000 : null,
	)

	const resetCountdown = useCallback(() => {
		setCountdown(counter)
		setTimerActive(false)
	}, [counter])

	const runTimer = useCallback(() => {
		start.current = Date.now()
		setTimerActive(true)
	}, [])

	return (
		<Box mb={4}>
			{countdown === 0 && (
				<Alert onClose={resetCountdown} mb={3}>
					Do next!
				</Alert>
			)}

			<ButtonGroup spacing={0}>
				{times.map(({ seconds, label }, i) => (
					<Button
						isActive={counter === seconds}
						key={seconds}
						borderTopRightRadius="none"
						borderBottomRightRadius="none"
						borderTopLeftRadius={i > 0 ? 'none' : undefined}
						borderBottomLeftRadius={i > 0 ? 'none' : undefined}
						onClick={() => {
							setCounter(seconds)
							setCountdown(seconds)
							setTimerActive(false)
						}}
						variantColor="brand"
					>
						{label}
					</Button>
				))}
				<TimerLabel
					onClick={timerActive ? resetCountdown : runTimer}
					borderTopLeftRadius="none"
					borderBottomLeftRadius="none"
				>
					{countdown}
				</TimerLabel>
			</ButtonGroup>
		</Box>
	)
}

export default Timer
