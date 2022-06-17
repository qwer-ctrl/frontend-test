import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { StyledModal, ModalContainer, CloseButton } from '../styles/ModalStyles'
import { StyledButton } from '../styles/ButtonStyles'
import ui from '../reducers/ui'
import { API_URL } from '../utils/utils'

const UpdateProgramModal = () => {
	const [exerciseContent, setExerciseContent] = useState('')
	const [programName, setProgramName] = useState('')
	const [programType, setProgramType] = useState('')
	const showModal = useSelector((store) => store.ui.showUpdateProgramModal)
	const programId = useSelector((store) => store.ui.currentAddExerciseModalId)
	const dispatch = useDispatch()

	const closeModal = () => {
		dispatch(ui.actions.setShowUpdateProgramModal(false))
	}

	const handleProgramName = (e) => {
		setProgramName(e.target.value)
	}

	const handleProgramType = (e) => {
		setProgramType(e.target.value)
	}

	useEffect(() => {
		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}

		fetch(API_URL(`myprogram/${programId}`), options)
			.then((res) => res.json())
			.then((data) => {
				// dispatch(ui.actions.setLoading(true))
				setExerciseContent(data.response)
			})
		// .finally(() => dispatch(ui.actions.setLoading(false)))
	}, [programId])

	const handleProgramSubmit = (e) => {
		e.preventDefault()
		dispatch(ui.actions.setLoading(true))
		const options = {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ programName, programType }),
		}

		fetch(API_URL(`updateprogram/${programId}`), options)
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
						<form onSubmit={handleProgramSubmit}>
							<label htmlFor='programname'>Program name</label>
							<input
								name='programname'
								type='text'
								onChange={handleProgramName}
								placeholder={exerciseContent.programName}
								required
							/>
							<label htmlFor='weights'>Weights</label>
							<input
								type='radio'
								name='weights'
								value='weights'
								checked={programType === 'weights'}
								onChange={handleProgramType}
								required
							/>
							<label htmlFor='cardio'>Cardio</label>
							<input
								type='radio'
								name='cardio'
								value='cardio'
								checked={programType === 'cardio'}
								onChange={handleProgramType}
							/>
							<StyledButton type='submit'>Update program</StyledButton>
						</form>
					</StyledModal>
				</ModalContainer>
			) : null}
		</>
	)
}

export default UpdateProgramModal
