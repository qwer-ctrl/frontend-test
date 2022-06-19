import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { StyledButton } from '../styles/ButtonStyles'

const Timer = () => {
	const [addRounds, setAddRounds] = useState(1)
	const [addWorkingSeconds, setAddWorkingSeconds] = useState(0)
	const [addRestSeconds, setAddRestSeconds] = useState(0)
	const [workingSeconds, setWorkingSeconds] = useState(0)
	const [restSeconds, setRestSeconds] = useState(0)
	const [rounds, setRounds] = useState(1)
	const [runTimer, setRunTimer] = useState(false)

	useEffect(() => {
		if (workingSeconds > 0 && runTimer) {
			const workInterval = setInterval(() => {
				setWorkingSeconds((workingSeconds) => workingSeconds - 1)
			}, 1000)
			return () => clearInterval(workInterval)
		} else if ((addWorkingSeconds > 0 && !runTimer) || (addRestSeconds > 0 && !runTimer) || (addRounds > 0 && !runTimer)) {
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
		}
	}, [workingSeconds, runTimer, restSeconds, rounds, addWorkingSeconds, addRestSeconds, addRounds])

	const getBackground = () => {
		let color
		if (workingSeconds < 1) {
			color = 'var(--accentgreen)'
		} else {
			color = 'var(--accentlilac)'
		}
		return color
	}

	return (
		<TimerContainer>
			<TimerBox background={getBackground()}>
				<SetContainer>
					<StyledTitle>Set your rounds:</StyledTitle>
					<StyledButton onClick={() => setAddRounds(addRounds - 1)}>-</StyledButton>
					<Rounds>{addRounds}round</Rounds>
					<StyledButton onClick={() => setAddRounds(addRounds + 1)}>+</StyledButton>
				</SetContainer>
				
				<SetContainer>
					<StyledTitle>Set your working time:</StyledTitle>
					<StyledButton onClick={() => setAddWorkingSeconds(addWorkingSeconds - 1)}>-</StyledButton>
					<Seconds>{addWorkingSeconds}worksec</Seconds>
					<StyledButton onClick={() => setAddWorkingSeconds(addWorkingSeconds + 1)}>+</StyledButton>
				</SetContainer>
				
				<SetContainer>
					<StyledTitle>Set your resting time:</StyledTitle>
					<StyledButton onClick={() => setAddRestSeconds(addRestSeconds - 1)}>-</StyledButton>
					<Seconds>{addRestSeconds}restsec</Seconds>
					<StyledButton onClick={() => setAddRestSeconds(addRestSeconds + 1)}>+</StyledButton>
				</SetContainer>

				<TimerClock>
					<p>{rounds} rounds / {addRounds} rounds</p>
					<p>{workingSeconds} working seconds</p>
					<p>{restSeconds} resting seconds</p>
					<StyledButton 
					padding="6px 18px"
					margin="3px 0 0"
					onClick={() => setRunTimer(true)}>Start</StyledButton>
					<StyledButton 
					padding="6px 18px"
					margin="3px 0 0"
					onClick={() => setRunTimer(false)}>Stop</StyledButton>
				</TimerClock>

				{workingSeconds === 0 && restSeconds === 0 && rounds === 0 && <p>Good job!</p>}
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
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	gap: 2rem;
	width: fit-content;
	height: fit-content;
	// border: 1px solid;
	padding: 20px;
	border-radius: 15px;
	box-shadow: 0px 10px 13px 0px #adadad;
	background: ${props => props.background};
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

const Rounds = styled.p``

const Seconds = styled.p``
