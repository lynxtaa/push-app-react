import React, { useCallback, useState, useRef } from 'react'

import TimerButton from 'components/TimerButton'
import Alert from 'components/Alert'
import ButtonGroup from 'components/ButtonGroup'
import TimerLabel from 'components/TimerLabel'
import useInterval from '../hooks/useInterval'

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

	const handleClick = useCallback(event => {
		const value = Number(event.target.value)
		setCounter(value)
		setCountdown(value)
		setTimerActive(false)
	}, [])

	const resetCountdown = useCallback(() => {
		setCountdown(counter)
		setTimerActive(false)
	}, [counter])

	const runTimer = useCallback(() => {
		start.current = Date.now()
		setTimerActive(true)
	}, [])

	return (
		<div className="mb-3">
			{countdown === 0 && (
				<Alert onClick={resetCountdown}>
					<b>Do next!</b>
				</Alert>
			)}

			<ButtonGroup>
				{times.map(({ seconds, label }) => (
					<TimerButton
						active={counter === seconds}
						key={seconds}
						onClick={handleClick}
						value={seconds}
					>
						{label}
					</TimerButton>
				))}
				<TimerLabel onClick={timerActive ? resetCountdown : runTimer}>
					{countdown}
				</TimerLabel>
			</ButtonGroup>
		</div>
	)
}

export default Timer
