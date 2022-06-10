import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components/macro'

import EditExerciseModal from '../components/EditExerciseModal'
import DeleteExerciseModal from '../components/DeleteExerciseModal'
import { API_URL } from '../utils/utils'
import { program } from '../reducers/program'
import exercise from '../reducers/exercise'
import ui from '../reducers/ui'
import LoadingAnimation from '../components/LoadingAnimation'
import SignOut from '../components/SignOut'
import AddExerciseModal from '../components/AddExerciseModal'
import UpdateProgramModal from '../components/UpdateProgramModal'
// import EmptyState from '../components/EmptyState'

const SingleProgram = () => {
	const { programId } = useParams()
	//console.log(programId)
	const isLoading = useSelector((store) => store.ui.isLoading)
	const showEditModal = useSelector((store) => store.ui.showEditModal)
	const showDeleteModal = useSelector((store) => store.ui.showDeleteModal)
	const showAddExerciseModal = useSelector((store) => store.ui.showAddExerciseModal)
	const showUpdateProgramModal = useSelector((store) => store.ui.showUpdateProgramModal)
	const currentModalId = useSelector((store) => store.user.currentModalId)
	const currentAddExerciseModalId = useSelector((store) => store.user.currentAddExerciseModalId)
	const currentUpdateProgramModalId = useSelector((store) => store.user.currentUpdateProgramModalId)
	const [programName, setProgramName] = useState('')
	// console.log('current ID', currentModalId)
	const [programExercise, setProgramExercise] = useState([])
	// const allPrograms = useSelector((store) => store.user.program.program)
	// const allExercises = useSelector((store) => store.program.exercise)
	// console.log('all programs', allPrograms)
	// console.log('all exercises', allExercises)
	// const myProgram = allPrograms.filter((program) => program._id === programId)
	// const myExercise = allExercises.map((exercise) => exercise._id)
	// console.log('myExercises', myExercise)
	// console.log('my program', myProgram)
	// const userHasExercise = useSelector((store) => store.program.exercise)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	useEffect(() => {
		fetchProgram()
	}, [])

	const fetchProgram = () => {
		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}
		// console.log('haloo', programId)
		fetch(API_URL(`myprogram/${programId}`), options)
			.then((res) => res.json())
			.then((data) => {
				dispatch(ui.actions.setLoading(true))
				setProgramExercise(data.response.exercise)
				setProgramName(data.response.programName)
				// console.log('exercise in fetch', data.response)
			})
			.finally(() => dispatch(ui.actions.setLoading(false)))
	}

	const handleEditModal = (id) => {
		dispatch(ui.actions.setShowEditModal(true))
		dispatch(ui.actions.setCurrentEditModalId(id))
	}

	const handleDeleteModal = (id) => {
		dispatch(ui.actions.setShowDeleteModal(true))
		dispatch(ui.actions.setCurrentDeleteModalId(id))
		fetchProgram()
	}

	const handleAddExerciseModal = (id) => {
		console.log(id)
		dispatch(ui.actions.setShowAddExerciseModal(true))
		dispatch(ui.actions.setCurrentAddExerciseModalId(id))
		fetchProgram()
	}

	const handleUpdateProgramModal = (id) => {
		console.log(id)
		dispatch(ui.actions.setShowUpdateProgramModal(true))
		dispatch(ui.actions.setCurrentAddExerciseModalId(id))
		fetchProgram()
	}

	const handleGoBack = () => {
		navigate('/')
	}

	const handleProgramDeletion = (programId) => {
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
				fetchProgram()
				navigate('/')
			})
	}

	return isLoading ? (
		<LoadingAnimation />
	) : (
		<>
			<div>
				<h1>{programName}</h1>
				{/* {programId} */}
				<StyledButton onClick={() => handleProgramDeletion(programId)}>Delete program</StyledButton>
				<StyledButton onClick={() => handleUpdateProgramModal(programId)}>Update program</StyledButton>
				{showUpdateProgramModal ? <UpdateProgramModal /> : null}
				<StyledButton onClick={() => handleAddExerciseModal(programId)}>Add exercise</StyledButton>
				{showAddExerciseModal ? <AddExerciseModal /> : null}
				{programExercise.map((item) => (
					<div key={item._id}>
						<h1>{item.exercise}</h1>
						<div>
							{item.sets ? <p>{item.sets} sets</p> : null}
							{item.reps ? <p>{item.reps} sets</p> : null}
							{item.weights ? <p>{item.weights}</p> : null}
							{item.minutes ? <p>{item.minutes} minutes</p> : null}
							{item.seconds ? <p>{item.seconds} seconds</p> : null}
							{item.duration ? <p>{item.duration}</p> : null}
							{item.exerciseLength ? <p>{item.exerciseLength}</p> : null}
							{item.comments ? <p>comments: {item.comments}</p> : null}
							{item.exerciseLink ? <p>link: {item.exerciseLink}</p> : null}
							{item._id}
						</div>
						<StyledButton onClick={() => handleEditModal(item._id)}>Edit exercise</StyledButton>
						{showEditModal ? <EditExerciseModal /> : null}
						<StyledButton onClick={() => handleDeleteModal(item._id)}>Delete exercise</StyledButton>
						{showDeleteModal ? <DeleteExerciseModal /> : null}
					</div>
				))}
				<StyledButton onClick={handleGoBack}>Go back</StyledButton>
			</div>
		</>
	)
}

export default SingleProgram

const StyledButton = styled.button``
