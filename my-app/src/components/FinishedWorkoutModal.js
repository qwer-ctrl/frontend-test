import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components/macro'

import { ModalContainer, StyledModal } from '../styles/ModalStyles'
import { StyledButton } from '../styles/ButtonStyles'
import { HeadingOne } from '../styles/GlobalStyles'
// import emptyBox from '../styles/images/empty.png'
// import checkedBox from '../styles/images/checked.png'

import ui from '../reducers/ui'
import user from '../reducers/user'

const FinishedWorkoutModal = () => {
	const showModal = useSelector((store) => store.ui.showFinishedWorkoutModal)
	const userId = useSelector((store) => store.user.userId)
	// const [addWorkout, setAddWorkout] = useState(false)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleFinishedWorkout = () => {
		// handleUpdatedWorkouts()
		dispatch(ui.actions.setFinishedWorkoutModal(false))
		window.location.reload()
	}

	// const handleUpdatedWorkouts = () => {
	// 	if (addWorkout) {
	// 		dispatch(user.actions.setWorkoutCounter(userId))
	// 	}
	// }

	const handleGoToMain = () => {
		// handleUpdatedWorkouts()
		navigate('/')
	}

	return (
		<>
			{showModal ? (
				<ModalContainer>
					<StyledModal margin='20px auto'>
						<HeadingOne fontSize='1.2rem' textAlign='center' margin='1rem 0 0'>
							GREAT JOB!!
						</HeadingOne>
						{/* <AddWorkoutContainer>
							<HeadingTwo>Add session to your totals?</HeadingTwo>
							<StyledInputButton onClick={() => setAddWorkout(!addWorkout)}>
								{addWorkout ? (
									<IconStyle src={checkedBox} alt='add program to total workouts' />
								) : (
									<IconStyle src={emptyBox} alt='add program to total workouts' />
								)}
							</StyledInputButton>
						</AddWorkoutContainer> */}

						<ButtonContainer>
							<StyledButton
								background='var(--primary)'
								margin='1em 0 0'
								padding='6px 18px'
								boxShadow='0px 10px 13px -7px #808080'
								onClick={handleFinishedWorkout}
							>
								Go back to workout
							</StyledButton>
							<StyledButton
								background='var(--primary)'
								margin='1em 0 0'
								padding='6px 18px'
								boxShadow='0px 10px 13px -7px #808080'
								onClick={handleGoToMain}
							>
								Go to main page
							</StyledButton>
						</ButtonContainer>
					</StyledModal>
				</ModalContainer>
			) : null}
		</>
	)
}

export default FinishedWorkoutModal

// const AddWorkoutContainer = styled.div`
// 	display: flex;
// 	padding: 0.5rem;
// 	margin: 0.5rem;
// 	align-items: center;
// `

const ButtonContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 1em;

	@media screen and (min-width: 768px) {
		width: 60%;
		margin-top: 2rem;
	}
`

// const StyledInputButton = styled.button`
// 	background-color: inherit;
// 	cursor: pointer;
// 	border: none;
// 	width: fit-content;
// 	margin-left: 0.5rem;

// 	&:hover {
// 		outline: none;
// 	}

// 	&:focus {
// 		// background: var(--primary);
// 		padding-top: 0.25em;
// 		border: 2px solid var(--primary);
// 	}
// `

// const HeadingTwo = styled.h2`
// 	font-size: 1rem;
// 	font-weight: 400;
// 	margin-bottom: 0.25em;
// `

// const IconStyle = styled.img`
// 	max-width: 18px;
// 	padding: 0 0.5em 0;

// 	@media screen and (min-width: 768px) {
// 		max-width: 20px;
// 	}

// 	@media screen and (min-width: 1024px) {
// 		max-width: 25px;
// 	}
// `
