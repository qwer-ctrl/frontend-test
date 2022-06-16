import React, { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components/macro'

import EditExerciseModal from '../components/EditExerciseModal'
import DeleteExerciseModal from '../components/DeleteExerciseModal'
import { API_URL } from '../utils/utils'
import ui from '../reducers/ui'
import LoadingAnimation from '../components/LoadingAnimation'
import AddExerciseModal from '../components/AddExerciseModal'
import UpdateProgramModal from '../components/UpdateProgramModal'
import DeleteProgramModal from '../components/DeleteProgramModal'
// import EmptyState from '../components/EmptyState'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { OuterWrapper, InnerWrapper } from '../styles/GlobalStyles'

const SingleProgram = () => {
	const { programId } = useParams()
	const [programName, setProgramName] = useState('')
	const [programExercise, setProgramExercise] = useState([])
	const [checked, setChecked] = useState([])

	const isLoading = useSelector((store) => store.ui.isLoading)
	const showDeleteProgramModal = useSelector((store) => store.ui.showDeleteProgramModal)
	const showAddExerciseModal = useSelector((store) => store.ui.showAddExerciseModal)
	const showUpdateProgramModal = useSelector((store) => store.ui.showUpdateProgramModal)
	const showEditExerciseModal = useSelector((store) => store.ui.showEditExerciseModal)
	const showDeleteExerciseModal = useSelector((store) => store.ui.showDeleteExerciseModal)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const fetchProgram = useCallback(() => {
		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}
		fetch(API_URL(`myprogram/${programId}`), options)
			.then((res) => res.json())
			.then((data) => {
				dispatch(ui.actions.setLoading(true))
				setProgramExercise(data.response.exercise)
				setProgramName(data.response.programName)
			})
			.finally(() => dispatch(ui.actions.setLoading(false)))
	}, [dispatch, programId])

	useEffect(() => {
		fetchProgram()
	}, [fetchProgram])

	const handleUpdateProgramModal = (id) => {
		console.log(id)
		dispatch(ui.actions.setShowUpdateProgramModal(true))
		dispatch(ui.actions.setCurrentAddExerciseModalId(id))
		fetchProgram()
	}

	const handleAddExerciseModal = (id) => {
		console.log(id)
		dispatch(ui.actions.setShowAddExerciseModal(true))
		dispatch(ui.actions.setCurrentAddExerciseModalId(id))
		fetchProgram()
	}

	const handleDeleteProgramModal = (id) => {
		dispatch(ui.actions.setShowDeleteProgramModal(true))
		dispatch(ui.actions.setCurrentModalId(id))
	}

	const handleEditExerciseModal = (id) => {
		dispatch(ui.actions.setShowEditExerciseModal(true))
		dispatch(ui.actions.setCurrentModalId(id))
	}

	const handleDeleteExerciseModal = (id) => {
		dispatch(ui.actions.setShowDeleteExerciseModal(true))
		dispatch(ui.actions.setCurrentModalId(id))
		fetchProgram()
	}

	const handleGoBack = () => {
		navigate('/')
	}

	const handleChecked = (event) => {
		let updatedList = [...checked]
		if (event.target.checked) {
			updatedList = [...checked, event.target.value]
		} else {
			updatedList.splice(checked.indexOf(event.target.value), 1)
		}
		setChecked(updatedList)
	}

	return isLoading ? (
		<LoadingAnimation />
	) : (
		<OuterWrapper>
			<Header />
			<InnerWrapper>
				<h1>{programName}</h1>
				<ButtonContainer justifyContent='space-evenly'>
					<StyledButton onClick={() => handleUpdateProgramModal(programId)}>Update program</StyledButton>
					{showUpdateProgramModal ? <UpdateProgramModal /> : null}
					<StyledButton onClick={() => handleAddExerciseModal(programId)}>Add exercise</StyledButton>
					{showAddExerciseModal ? <AddExerciseModal /> : null}
					<StyledButton onClick={() => handleDeleteProgramModal(programId)}>Delete program</StyledButton>
					{showDeleteProgramModal ? <DeleteProgramModal /> : null}
				</ButtonContainer>

				{programExercise.map((item) => (
					<div key={item._id}>
						<h3>{item.exercise}</h3>
						<div>
							{item.sets ? <p>{item.sets} sets</p> : null}
							{item.reps ? <p>{item.reps} sets</p> : null}
							{item.weights ? <p>{item.weights}</p> : null}
							{item.minutes ? <p>{item.minutes} minutes</p> : null}
							{item.seconds ? <p>{item.seconds} seconds</p> : null}
							{item.duration ? <p>{item.duration}</p> : null}
							{item.exerciseLength ? <p>{item.exerciseLength}</p> : null}
							{item.comments ? <p>comments: {item.comments}</p> : null}
							{item.exerciseLink ? <p>link: <a href={item.exerciseLink} target="_blank" rel="noopener noreferrer">{item.exerciseLink}</a></p> : null}
						</div>

						<label htmlFor='checkbox'></label>
						<input id='checkbox' type='checkbox' value={item._id} onChange={handleChecked} />

						<ButtonContainer justifyContent='flex-start'>
							<StyledButton onClick={() => handleEditExerciseModal(item._id)}>Edit exercise</StyledButton>
							{showEditExerciseModal ? <EditExerciseModal /> : null}
							<StyledButton onClick={() => handleDeleteExerciseModal(item._id)}>Delete exercise</StyledButton>
							{showDeleteExerciseModal ? <DeleteExerciseModal /> : null}
						</ButtonContainer>
					</div>
				))}
				<StyledButton onClick={handleGoBack}>Go back</StyledButton>
			</InnerWrapper>
			<Footer />
		</OuterWrapper>
	)
}

export default SingleProgram

const ButtonContainer = styled.div`
	display: flex;
	justify-content: ${(props) => props.justifyContent};
	margin: 1rem 0;
	gap: 1rem;
`

const StyledButton = styled.button``
