import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import styled from 'styled-components/macro'
import ui from '../reducers/ui'
import { API_URL } from '../utils/utils'
// import LoadingAnimation from '../components/LoadingAnimation'

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
					<StyledModal>
						<CloseButton onClick={closeModal}>x</CloseButton>
						<h1>Are you sure you want to delete the exercise?</h1>
						<StyledButton onClick={() => handleExerciseDeletion()}>Delete</StyledButton>
					</StyledModal>
				</ModalContainer>
			) : null}
		</>
	)
}

export default DeleteExerciseModal

const ModalContainer = styled.div`
  position: fixed;
  z-index: 1
  margin-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: rgb(0,0,0,0.2); // <-------------- change
  `

const StyledModal = styled.div`
	background: white;
	margin: auto;
	padding: 20px;
	border: 1px solid #888;
	width: 80%;
`

const StyledButton = styled.button``

const CloseButton = styled.button``
