import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from "styled-components/macro"

import { ModalContainer, StyledModal } from '../styles/ModalStyles'
import { StyledButton } from '../styles/ButtonStyles'
import { HeadingOne } from "../styles/GlobalStyles"

import ui from '../reducers/ui'
import { API_URL } from '../utils/utils'


const DeleteExerciseModal = () => {
	const exerciseId = useSelector((store) => store.ui.currentModalId)
	const showModal = useSelector((store) => store.ui.showDeleteExerciseModal)
	const dispatch = useDispatch()

	const closeModal = () => {
		dispatch(ui.actions.setShowDeleteExerciseModal(false))
	}

	const handleExerciseDeletion = () => {
		const options = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		}

		fetch(API_URL(`deleteexercise/${exerciseId}`), options)
			.then((res) => res.json())
			.then((data) => {
				console.log(data)
				closeModal()
				window.location.reload()
			})
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
						>Are you sure you want to delete the exercise?</HeadingOne>

						<ButtonContainer>
                            <StyledButton
                                width="175px"
                                background="var(--primary)"
                                margin="1.5rem 0 0"
                                padding="6px 10px"
                                boxShadow="0px 10px 13px -7px #808080"
                                backgroundHover="var(--tertiary)"
                                onClick={closeModal}>No, go back
                            </StyledButton>

							<StyledButton
								background="transparent"
								margin="1.5rem 0 0"
								padding="6px 18px"
								textDecorationHover="underline"
								onClick={() => handleExerciseDeletion()}>Yes, delete it
							</StyledButton>
						</ButtonContainer>
					</StyledModal>
				</ModalContainer>
			) : null}
		</>
	)
}

export default DeleteExerciseModal

const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (min-width: 768px) {
        width: 70%;
    }
`
