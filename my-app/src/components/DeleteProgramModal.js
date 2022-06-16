import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { ModalContainer, StyledModal, CloseButton } from '../styles/ModalStyles'
import { StyledButton } from '../styles/ButtonStyles'

import ui from '../reducers/ui'
import { API_URL } from '../utils/utils'
// import LoadingAnimation from '../components/LoadingAnimation'

const DeleteProgramModal = () => {
	const programId = useSelector((store) => store.ui.currentModalId)
	const showModal = useSelector((store) => store.ui.showDeleteProgramModal)
	const userId = useSelector((store) => store.user.userId)
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
				navigate(`/mypage/${userId}`)
			})
	}

	return (
		<>
			{showModal ? (
				<ModalContainer>
					<StyledModal>
						<CloseButton onClick={closeModal}>x</CloseButton>
						<h1>Are you sure you want to delete the program?</h1>
						<StyledButton onClick={() => handleProgramDeletion()}>Delete</StyledButton>
					</StyledModal>
				</ModalContainer>
			) : null}
		</>
	)
}

export default DeleteProgramModal
