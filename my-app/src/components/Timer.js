import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'

import arrowIcon from '../styles/images/arrow.png'
import { StyledButton, TimerButton } from '../styles/ButtonStyles'
import timerIcon from '../styles/images/timer.png'

const Timer = () => {
	const [addRounds, setAddRounds] = useState(0)
	const [addWorkingSeconds, setAddWorkingSeconds] = useState(0)
	const [addRestSeconds, setAddRestSeconds] = useState(0)
	const [workingSeconds, setWorkingSeconds] = useState(0)
	const [restSeconds, setRestSeconds] = useState(0)
	const [rounds, setRounds] = useState(0)
	const [runTimer, setRunTimer] = useState(false)
	const [message, setMessage] = useState('')
	const [greatJobMessage, setGreatJobMessage] = useState('')
	const [timerAccordion, setTimerAccordion] = useState(false)
	const [transform, setTransform] = useState(false)

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

	const handleTimerToggle = () => {
		setTimerAccordion((prev) => !prev)
		setTransform(!transform)
	}

	return (
		<TimerContainer>
			<TimerBox background={getBackground()}>
				<TimerTitleContainer>
					<TimerTitle>
						<TimerIconSpan>
							<StyledTimerImage src={timerIcon} />
						</TimerIconSpan>
						Timer
					</TimerTitle>
					<AccordionButton onClick={handleTimerToggle}>
						<TimerSpan transform={transform}>
							<StyledArrowIcon src={arrowIcon} />
						</TimerSpan>
					</AccordionButton>
				</TimerTitleContainer>

				{timerAccordion && (
					<>
						{message}
						<TimerClock>
							<SetTimerContainer>
								<TimerComponent>
									<TimerButton onClick={handleRoundsDecrement}>
										<StyledSpan role='img' aria-label='minus icon'>
											-
										</StyledSpan>
									</TimerButton>
									<TimerText>
										{rounds} / {addRounds} rounds
									</TimerText>
									<TimerButton onClick={handleRoundsIncrement}>
										<StyledSpan role='img' aria-label='minus icon'>
											+
										</StyledSpan>
									</TimerButton>
								</TimerComponent>

								<TimerComponent>
									<TimerButton onClick={handleWorkingTimeDecrement}>
										<StyledSpan role='img' aria-label='minus icon'>
											-
										</StyledSpan>
									</TimerButton>
									<TimerText>{workingSeconds} working sec</TimerText>
									<TimerButton onClick={handleWorkingTimeIncrement}>
										<StyledSpan role='img' aria-label='minus icon'>
											+
										</StyledSpan>
									</TimerButton>
								</TimerComponent>

								<TimerComponent>
									<TimerButton onClick={handleRestSecondsDecrement}>
										<StyledSpan role='img' aria-label='minus icon'>
											-
										</StyledSpan>
									</TimerButton>
									<TimerText>{restSeconds} resting sec</TimerText>
									<TimerButton onClick={handleRestSecondsIncrement}>
										<StyledSpan role='img' aria-label='minus icon'>
											+
										</StyledSpan>
									</TimerButton>
								</TimerComponent>
							</SetTimerContainer>

							<ButtonContainer>
								<StyledButton
									backgroundHover='var(--tertiary)'
									color='var(--white)'
									padding='6px 18px'
									margin='3px 2px 0'
									onClick={() => setRunTimer(true)}
								>
									Start
								</StyledButton>

								<StyledButton
									backgroundHover='var(--tertiary)'
									color='var(--white)'
									padding='6px 18px'
									margin='3px 2px 0'
									onClick={() => setRunTimer(false)}
								>
									Stop
								</StyledButton>

								<StyledButton
									backgroundHover='var(--tertiary)'
									color='var(--white)'
									padding='6px 18px'
									margin='3px 2px 0'
									onClick={() => restartButton()}
								>
									Restart
								</StyledButton>
							</ButtonContainer>
						</TimerClock>

						{greatJobMessage}
					</>
				)}
			</TimerBox>
		</TimerContainer>
	)
}

export default Timer

const TimerContainer = styled.section`
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	margin: 0 0 4rem;
	width: 100%;

	@media screen and (min-width: 1024px) {
		width: 80%;
	}
`

const TimerBox = styled.article`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	gap: 1rem;
	width: 70%;
	height: fit-content;
	padding: 15px 30px;
	border-radius: 6px;
	box-shadow: 0px 10px 13px 0px #adadad;
	background: ${(props) => props.background};

	@media screen and (min-width: 1024px) {
		margin-top: 1.2rem;
	}
`

const TimerTitleContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid var(--tertiary);
`

const TimerTitle = styled.h1`
	font-size: 1.2rem;
	font-weight: 500;
	display: flex;
	align-items: center;
	justify-content: center;

	@media screen and (min-width: 768px) {
		font-size: 1.7rem;
	}
`

const TimerIconSpan = styled.span`
	margin: 5px 10px 0 0;
`

const StyledTimerImage = styled.img`
	width: 25px;
	height: 25px;

	@media screen and (min-width: 768px) {
		width: 40px;
		height: 40px;
	}
`

const AccordionButton = styled.button`
	padding: 5px 10px;
	width: 30px;
	height: 30px;
	border-radius: 50%;
	cursor: pointer;
	background: transparent;
	font-size: 1.5rem;
	border: none;
	color: var(--black);
	display: flex;
	align-items: center;
	justify-content: center;
`

const TimerSpan = styled.span`
	transform: ${(props) => (props.transform ? 'rotate(-0.5turn)' : undefined)};
	transition: all ease-out 0.5s;
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

const StyledSpan = styled.span`
	color: var(--black);
`

const StyledArrowIcon = styled.img`
	width: 20px;

	@media screen and (min-width: 768px) {
		width: 30px;
	}
`

const TimerText = styled.p`
	margin: 0 1em;
`

const ButtonContainer = styled.div`
	display: flex;
`
