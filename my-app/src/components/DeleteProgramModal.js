import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from "styled-components/macro"

import { ModalContainer, StyledModal, CloseButton } from '../styles/ModalStyles'
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
				console.log(data)
				closeModal()
				navigate('/mypage')
			})
	}

	return (
		<>
			{showModal ? (
				<ModalContainer>
					<StyledModal>
						<CloseButton onClick={closeModal}><StyledSpan>x</StyledSpan></CloseButton>
						<HeadingOne 
							fontSize="1rem" 
							margin="1rem 0 0" 
							textAlign="center" 
							color="var(--black)"
							fontWeight="500"
							>Are you sure you want to delete the program?
						</HeadingOne>

						<StyledButton
							background="var(--primary)"
							margin="1.5em 0 0"
							padding="6px 18px"
							boxShadow="0px 10px 13px -7px #808080"
							backgroundHover="var(--tertiary)"
							onClick={() => handleProgramDeletion()}>Delete
						</StyledButton>
					</StyledModal>
				</ModalContainer>
			) : null}
		</>
	)
}

export default DeleteProgramModal

const StyledSpan = styled.span`
	color: var(--black);
`
