import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'

import { StyledButton } from '../styles/ButtonStyles'

const Timer = () => {
	const [addRounds, setAddRounds] = useState(0)
	const [addWorkingSeconds, setAddWorkingSeconds] = useState(0)
	const [addRestSeconds, setAddRestSeconds] = useState(0)
	const [workingSeconds, setWorkingSeconds] = useState(0)
	const [restSeconds, setRestSeconds] = useState(0)
	const [rounds, setRounds] = useState(0)
	const [runTimer, setRunTimer] = useState(false)
	const [message, setMessage] = useState('')
	const [godJobMessage, setGreatJobMessage] = useState('')

	useEffect(() => {
		if (workingSeconds > 0 && runTimer) {
			const workInterval = setInterval(() => {
				setWorkingSeconds((workingSeconds) => workingSeconds - 1)
			}, 1000)
			return () => clearInterval(workInterval)
		} else if (
			(addWorkingSeconds < 0 && !runTimer) ||
			(addRestSeconds < 0 && !runTimer) ||
			(addRounds < 0 && !runTimer)
		) {
			setTimeout(() => {
				setWorkingSeconds(0)
				setRestSeconds(0)
				setRounds(0)
			})
		} else if (
			(addWorkingSeconds >= 0 && !runTimer) ||
			(addRestSeconds >= 0 && !runTimer) ||
			(addRounds >= 0 && !runTimer)
		) {
			setTimeout(() => {
				setWorkingSeconds(addWorkingSeconds)
				setRestSeconds(addRestSeconds)
				setRounds(addRounds)
			})
		} else if (restSeconds > 0 && runTimer) {
			const restInterval = setInterval(() => {
				setRestSeconds((restSeconds) => restSeconds - 1)
			}, 1000)
			return () => clearInterval(restInterval)
		} else if (workingSeconds === 0 && restSeconds === 0 && rounds > 0 && runTimer) {
			setTimeout(() => {
				setRounds((rounds) => rounds - 1)
				setWorkingSeconds(addWorkingSeconds)
				setRestSeconds(addRestSeconds)
			}, 1000)
		} else if (workingSeconds === 0 && restSeconds === 0 && rounds === 0) {
			clearInterval()
			setAddRestSeconds(0)
			setAddWorkingSeconds(0)
			setAddRounds(0)
			setRunTimer(false)
			setGreatJobMessage('Good job!')
		}
	}, [workingSeconds, runTimer, restSeconds, rounds, addWorkingSeconds, addRestSeconds, addRounds])

	const getBackground = () => {
		let color
		if (workingSeconds < 1) {
			color = 'var(--primary)'
		} else {
			color = 'var(--accentlilac)'
		}
		return color
	}

	const handleRoundsDecrement = () => {
		if (addRounds <= 0) {
			setAddRounds(0)
			setMessage('Must be over 0')
		} else {
			setAddRounds(addRounds - 1)
			setMessage('')
		}
	}
	const handleRoundsIncrement = () => {
		setAddRounds(addRounds + 1)
		setMessage('')
	}

	const handleWorkingTimeDecrement = () => {
		if (addWorkingSeconds <= 0) {
			setAddWorkingSeconds(0)
			setMessage('Must be over 0')
		} else {
			setAddWorkingSeconds(addWorkingSeconds - 1)
			setMessage('')
		}
	}
	const handleWorkingTimeIncrement = () => {
		setAddWorkingSeconds(addWorkingSeconds + 1)
		setMessage('')
	}

	const handleRestSecondsDecrement = () => {
		if (addRestSeconds <= 0) {
			setAddRestSeconds(0)
			setMessage('Must be over 0')
		} else {
			setAddRestSeconds(addRestSeconds - 1)
			setMessage('')
		}
	}
	const handleRestSecondsIncrement = () => {
		setAddRestSeconds(addRestSeconds + 1)
		setMessage('')
	}

	return (
		<TimerContainer>
			<TimerBox background={getBackground()}>
				{message}
				<TimerClock>
					<SetTimerContainer>
						<TimerComponent>
							<StyledButton onClick={handleRoundsDecrement}>-</StyledButton>
							<TimerText>
								{rounds} rounds / {addRounds} rounds
							</TimerText>
							<StyledButton onClick={handleRoundsIncrement}>+</StyledButton>
						</TimerComponent>

						<TimerComponent>
							<StyledButton onClick={handleWorkingTimeDecrement}>-</StyledButton>
							<TimerText>{workingSeconds} working seconds</TimerText>
							<StyledButton onClick={handleWorkingTimeIncrement}>+</StyledButton>
						</TimerComponent>

						<TimerComponent>
							<StyledButton onClick={handleRestSecondsDecrement}>-</StyledButton>
							<TimerText>{restSeconds} resting seconds</TimerText>
							<StyledButton onClick={handleRestSecondsIncrement}>+</StyledButton>
						</TimerComponent>
					</SetTimerContainer>

					<StyledButton padding='6px 18px' margin='3px 0 0' onClick={() => setRunTimer(true)}>
						Start
					</StyledButton>
					<StyledButton padding='6px 18px' margin='3px 0 0' onClick={() => setRunTimer(false)}>
						Stop
					</StyledButton>
				</TimerClock>

				{godJobMessage}
				{/* {workingSeconds === 0 && restSeconds === 0 && rounds === 0 && <p>Good job!</p>} */}
			</TimerBox>
		</TimerContainer>
	)
}

export default Timer

const TimerContainer = styled.div`
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	margin: 0 0 6rem;
`

const TimerBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	gap: 1rem;
	width: fit-content;
	height: fit-content;
	padding: 30px;
	border-radius: 15px;
	box-shadow: 0px 10px 13px 0px #adadad;
	background: ${(props) => props.background};

	// @media screen and (min-width: 768px) {
	// 	width: 500px;
	// 	height: fit-content;
	// }
`

const StyledTitle = styled.h1`
	font-size: 1rem;
	margin-bottom: 5px;
`

const SetContainer = styled.div`
	display: flex;
	flex-direction: column;
	text-align: center;
	gap: 3px;
`

const TimerClock = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 5px;
`
const SetTimerContainer = styled.div`
	width: 200px;
`

const TimerComponent = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 0.3em 0.25em;
`
const TimerText = styled.p`
	margin: 0 1em;
`
const Rounds = styled.p``

const Seconds = styled.p``
