import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import styled from 'styled-components/macro'
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
							/>
							<label htmlFor='weights'>Weights</label>
							<input
								type='radio'
								name='weights'
								value='weights'
								checked={programType === 'weights'}
								onChange={handleProgramType}
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
