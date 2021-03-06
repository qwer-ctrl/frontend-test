import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from "styled-components/macro"

import { ModalContainer, StyledModal } from '../styles/ModalStyles'
import { HeadingOne } from '../styles/GlobalStyles'
import { StyledButton } from '../styles/ButtonStyles'

import ui from '../reducers/ui'
import { API_URL } from '../utils/utils'

const DeleteProgramModal = () => {
	const programId = useSelector((store) => store.ui.currentModalId)
	const showModal = useSelector((store) => store.ui.showDeleteProgramModal)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const closeModal = () => {
		dispatch(ui.actions.setShowDeleteProgramModal(false))
	}

	const handleProgramDeletion = () => {
		const options = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		}

		fetch(API_URL(`deleteprogram/${programId}`), options)
			.then((res) => res.json())
			.then((data) => {
				closeModal()
				navigate('/mypage')
			})
	}

	return (
		<>
			{showModal ? (
				<ModalContainer>
					<StyledModal margin="20px auto">
						<HeadingOne 
							fontSize="1rem" 
							margin="1rem 0 0" 
							textAlign="center" 
							color="var(--black)"
							fontWeight="500"
							>Are you sure you want to delete the program?
						</HeadingOne>

						<ButtonContainer>
                            <StyledButton
                                width="175px"
                                // tabletWidth="200px"
                                background="var(--primary)"
                                margin="1.5rem 0 0"
                                padding="6px 10px"
                                boxShadow="0px 10px 13px -7px #808080"
                                backgroundHover="var(--tertiary)"
                                onClick={closeModal}>No, go back
                            </StyledButton>

							<StyledButton
								width="175px"
								background="transparent"
								margin="1.5rem 0 0"
								padding="6px 10px"
								textDecoration="underline"
								backgroundHover="var(--tertiary)"
								onClick={() => handleProgramDeletion()}>Yes, delete it
							</StyledButton>
						</ButtonContainer>
					</StyledModal>
				</ModalContainer>
			) : null}
		</>
	)
}

export default DeleteProgramModal

const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (min-width: 768px) {
        width: 70%;
    }
`

