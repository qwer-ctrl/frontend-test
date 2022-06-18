import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Timer = () => {
	const [addRounds, setAddRounds] = useState(0)
	const [addWorkingSeconds, setAddWorkingSeconds] = useState(0)
	const [addRestSeconds, setAddRestSeconds] = useState(0)
	const [workingSeconds, setWorkingSeconds] = useState(0)
	const [restSeconds, setRestSeconds] = useState(0)
	const [rounds, setRounds] = useState(0)
	const [runTimer, setRunTimer] = useState(false)

	useEffect(() => {
		if (workingSeconds > 0 && runTimer) {
			const workInterval = setInterval(() => {
				setWorkingSeconds((workingSeconds) => workingSeconds - 1)
			}, 1000)
			return () => clearInterval(workInterval)
		} else if ((addWorkingSeconds > 0 && !runTimer) || (addRestSeconds > 0 && !runTimer)) {
			setTimeout(() => {
				setWorkingSeconds(addWorkingSeconds)
				setRestSeconds(addRestSeconds)
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
		} else if (addRounds > 0 && !runTimer) {
			setTimeout(() => {
				setRounds(addRounds)
			})
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
			color = 'green'
		} else {
			color = 'red'
		}
		return color
	}

	return (
		<TimerContainer>
			<TimerBox style={{ backgroundColor: getBackground() }}>
				<p>
					{rounds}/{addRounds}
				</p>
				<p>{workingSeconds}</p>
				<p>{restSeconds}</p>
				{workingSeconds === 0 && restSeconds === 0 && rounds === 0 && <p>Good job!</p>}
			</TimerBox>
			<StartButton onClick={() => setRunTimer(true)}>Start</StartButton>

			<MinusRoundsButton onClick={() => setAddRounds(addRounds - 1)}>-</MinusRoundsButton>
			<Rounds>{addRounds}round</Rounds>
			<PlusRoundsButton onClick={() => setAddRounds(addRounds + 1)}>+</PlusRoundsButton>

			<MinusSecondsButton onClick={() => setAddWorkingSeconds(addWorkingSeconds - 1)}>-</MinusSecondsButton>
			<Seconds>{addWorkingSeconds}worksec</Seconds>
			<PlusSecondsButton onClick={() => setAddWorkingSeconds(addWorkingSeconds + 1)}>+</PlusSecondsButton>

			<MinusSecondsButton onClick={() => setAddRestSeconds(addRestSeconds - 1)}>-</MinusSecondsButton>
			<Seconds>{addRestSeconds}restsec</Seconds>
			<PlusSecondsButton onClick={() => setAddRestSeconds(addRestSeconds + 1)}>+</PlusSecondsButton>
		</TimerContainer>
	)
}

export default Timer

const TimerContainer = styled.div`
	display: flex;
	justify-content: space-evenly;
	align-items: center;
`

const TimerBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border: 1px solid;
	padding: 20px;
`

const StartButton = styled.button``

const Rounds = styled.p``

const PlusRoundsButton = styled.button``

const MinusRoundsButton = styled.button``

const Seconds = styled.p``
const MinusSecondsButton = styled.button``
const PlusSecondsButton = styled.button``
