import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'

import { HeadingOne } from '../styles/GlobalStyles'
import { StyledButton, TimerButton } from '../styles/ButtonStyles'

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
			setTimeout(() => {
				setGreatJobMessage('')
			}, 3000)
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
	const restartButton = () => {
		setAddWorkingSeconds(0)
		setAddRounds(0)
		setAddRestSeconds(0)
	}

	return (
		<TimerContainer>
			<TimerBox background={getBackground()}>
			<HeadingOne fontSize='1.5em'>Timer</HeadingOne>
				{message}
				<TimerClock>
					<SetTimerContainer>
						<TimerComponent>
							<TimerButton onClick={handleRoundsDecrement}>-</TimerButton>
							<TimerText>
								{rounds} / {addRounds} rounds
							</TimerText>
							<TimerButton onClick={handleRoundsIncrement}>+</TimerButton>
						</TimerComponent>

						<TimerComponent>
							<TimerButton onClick={handleWorkingTimeDecrement}>-</TimerButton>
							<TimerText>{workingSeconds} working sec</TimerText>
							<TimerButton onClick={handleWorkingTimeIncrement}>+</TimerButton>
						</TimerComponent>

						<TimerComponent>
							<TimerButton onClick={handleRestSecondsDecrement}>-</TimerButton>
							<TimerText>{restSeconds} resting sec</TimerText>
							<TimerButton onClick={handleRestSecondsIncrement}>+</TimerButton>
						</TimerComponent>
					</SetTimerContainer>

					<StyledButton backgroundHover='var(--tertiary)'
									color='var(--white)' padding='6px 18px' margin='3px 0 0' onClick={() => setRunTimer(true)}>
						Start
					</StyledButton>
					<StyledButton backgroundHover='var(--tertiary)'
									color='var(--white)' padding='6px 18px' margin='3px 0 0' onClick={() => setRunTimer(false)}>
						Stop
					</StyledButton>
					<StyledButton backgroundHover='var(--tertiary)'
									color='var(--white)' padding='6px 18px' margin='3px 0 0' onClick={() => restartButton()}>
						Restart
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

