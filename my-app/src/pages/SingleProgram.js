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
import { OuterWrapper } from '../styles/GlobalStyles'
import { InnerWrapper } from '../styles/GlobalStyles'

const SingleProgram = () => {
	const { programId } = useParams()
	const [programName, setProgramName] = useState('')
	const [programExercise, setProgramExercise] = useState([])
	const [checked, setChecked] = useState([])
	const isLoading = useSelector((store) => store.ui.isLoading)
	const showEditModal = useSelector((store) => store.ui.showEditModal)
	const showDeleteModal = useSelector((store) => store.ui.showDeleteModal)
	const showAddExerciseModal = useSelector((store) => store.ui.showAddExerciseModal)
	const showUpdateProgramModal = useSelector((store) => store.ui.showUpdateProgramModal)
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
			<InnerWrapper>
				<h1>{programName}</h1>
				{/* {programId} */}
				<StyledButton onClick={() => handleProgramDeletion(programId)}>Delete program</StyledButton>
				<StyledButton onClick={() => handleUpdateProgramModal(programId)}>Update program</StyledButton>
				{showUpdateProgramModal ? <UpdateProgramModal /> : null}
				<StyledButton onClick={() => handleAddExerciseModal(programId)}>Add exercise</StyledButton>
				{showAddExerciseModal ? <AddExerciseModal /> : null}
				{programExercise.map((item, index) => (
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
						<label htmlFor='checkbox'></label>
						<input id="checkbox" type="checkbox" value={item._id} onChange={handleChecked}/>
						<StyledButton onClick={() => handleEditModal(item._id)}>Edit exercise</StyledButton>
						{showEditModal ? <EditExerciseModal /> : null}
						<StyledButton onClick={() => handleDeleteModal(item._id)}>Delete exercise</StyledButton>
						{showDeleteModal ? <DeleteExerciseModal /> : null}
					</div>
				))}
				<StyledButton onClick={handleGoBack}>Go back</StyledButton>
			</InnerWrapper>
		</OuterWrapper>
	)
}

export default SingleProgram

const StyledButton = styled.button``
