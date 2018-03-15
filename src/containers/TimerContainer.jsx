import React from 'react'
import PropTypes from 'prop-types'

import TimerButton from '@components/TimerButton'
import Alert from '@components/Alert'
import ButtonGroup from '@components/ButtonGroup'
import TimerLabel from '@components/TimerLabel'

class Timer extends React.Component {
	state = {
		countdown: this.props.times[0].seconds,
		counter: this.props.times[0].seconds,
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.countdown === 0 || prevState.countdown < this.state.countdown) {
			clearInterval(this.interval)
			this.interval = null
		}
	}

	handleClick = value => this.setState({ counter: value, countdown: value })

	resetCountdown = () => this.setState(prev => ({ countdown: prev.counter }))

	runTimer() {
		const start = Date.now()

		this.interval = setInterval(
			() =>
				this.setState(prev => {
					const delta = Date.now() - start
					const countdown = prev.counter - Math.floor(delta / 1000)
					return { countdown: countdown > 0 ? countdown : 0 }
				}),
			1000,
		)
	}

	toogleTimer = () => (this.interval ? this.resetCountdown() : this.runTimer())

	render() {
		const { counter, countdown } = this.state

		return (
			<div className="mb-3">
				{countdown === 0 && (
					<Alert onClick={this.resetCountdown}>
						<b>Do next!</b>
					</Alert>
				)}

				<ButtonGroup>
					{this.props.times.map(({ seconds, label }) => (
						<TimerButton
							active={counter == seconds}
							key={seconds}
							onClick={this.handleClick}
							value={seconds}
						>
							{label}
						</TimerButton>
					))}
					<TimerLabel onClick={this.toogleTimer}>{countdown}</TimerLabel>
				</ButtonGroup>
			</div>
		)
	}
}

Timer.propTypes = {
	times: PropTypes.arrayOf(
		PropTypes.shape({
			seconds: PropTypes.number.isRequired,
			label: PropTypes.string.isRequired,
		}),
	).isRequired,
}

export default Timer
