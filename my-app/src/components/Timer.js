import React, {useState, useEffect} from "react"
import styled from "styled-components"

const Timer = () => {

    const [seconds, setSeconds] = useState(20)
    const [rounds, setRounds] = useState(0)
    const [runTimer, setRunTimer] = useState(false)

    useEffect(() => {
        if (seconds > 0 && runTimer) {
        const interval =
        setInterval(() => {
            setSeconds(seconds => seconds - 1)
        }, 1000)
        return () => clearInterval(interval)
    } else if (seconds === 0) {
        clearInterval()
    }
    }, [seconds, runTimer])
   

    return (
        <TimerContainer>
            <TimerBox>
                <p>{rounds}</p>
                <p>{seconds}</p>
            </TimerBox>
            <StartButton onClick={() => setRunTimer(!runTimer)}>Start</StartButton>
            <MinusRoundsButton onClick={() => setRounds(rounds - 1)}>-</MinusRoundsButton>
            <Rounds>{rounds}</Rounds>
            <PlusRoundsButton onClick={() => setRounds(rounds + 1)}>+</PlusRoundsButton>

            <MinusSecondsButton onClick={() => setSeconds(seconds - 1)}>-</MinusSecondsButton>
            <Seconds>{seconds}</Seconds>
            <PlusSecondsButton onClick={() => setSeconds(seconds + 1)}>+</PlusSecondsButton>
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

const StartButton = styled.button`
`

const Rounds = styled.p`
`

const PlusRoundsButton = styled.button`
`

const MinusRoundsButton = styled.button`
`

const Seconds = styled.p`
`
const MinusSecondsButton = styled.button`
`
const PlusSecondsButton = styled.button`
`