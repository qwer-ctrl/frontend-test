import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styled from "styled-components/macro"

import { ModalContainer, StyledModal } from '../styles/ModalStyles'
import { StyledButton } from '../styles/ButtonStyles'
import { HeadingOne } from "../styles/GlobalStyles"

import ui from '../reducers/ui'


const FinishedWorkoutModal = () => {
	const showModal = useSelector((store) => store.ui.showFinishedWorkoutModal)
	// const workoutCounter = useSelector((store) => store.ui.workoutCounter)
	// const [counter, setCounter] = useState(null)
	// console.log(counter)
	const dispatch = useDispatch()
	const navigate = useNavigate()


	const handleFinishedWorkout = () => {
		dispatch(ui.actions.setFinishedWorkoutModal(false))
		window.location.reload()
	}

	const handleUpdatedWorkouts = () => {
		dispatch(ui.actions.setWorkoutCounter(1))
		// navigate('/profilepage')
	}

	const handleGoToMain = () => {
	navigate('/')
	}

	return (
		<>
			{showModal ? (
				<ModalContainer>
					<StyledModal margin="20px auto">						
						<HeadingOne
							fontSize="1.2rem"
							textAlign="center"
							margin="1rem 0 0"
						>GREAT JOB!!</HeadingOne>

						<StyledButton
						background="var(--tertiary)"
						margin="1rem 0 0"
						padding="6px 18px"
						// textDecorationHover="underline"
						boxShadow="0px 10px 13px -7px #808080"
						onClick={handleUpdatedWorkouts}>Add session to your totals</StyledButton>
						
						<ButtonContainer>
							<StyledButton
							background="var(--primary)"
							margin="1em 0 0"
							padding="6px 18px"
							boxShadow="0px 10px 13px -7px #808080"
							onClick={handleFinishedWorkout}>Go back to workout</StyledButton>
							<StyledButton
							background="var(--primary)"
							margin="1em 0 0"
							padding="6px 18px"
							boxShadow="0px 10px 13px -7px #808080"
							onClick={handleGoToMain}>Go to main page</StyledButton>
						</ButtonContainer>
					</StyledModal>
				</ModalContainer>
			) : null}
		</>
	)
}

export default FinishedWorkoutModal

const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (min-width: 768px) {
        width: 60%;
		margin-top: 2rem;
    }
`
