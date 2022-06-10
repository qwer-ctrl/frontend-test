import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components/macro'
import EditExerciseModal from '../components/EditExerciseModal'
import { API_URL } from '../utils/utils'
import { program } from '../reducers/program'
import exercise from '../reducers/exercise'
import ui from '../reducers/ui'
import LoadingAnimation from '../components/LoadingAnimation'
import SignOut from '../components/SignOut'
// import EmptyState from '../components/EmptyState'

const SingleProgram = () => {
	const { programId } = useParams()
	//console.log(programId)
	const isLoading = useSelector((store) => store.ui.isLoading)
	const showModal = useSelector((store) => store.ui.showModal)
	const currentModalId = useSelector((store) => store.user.currentModalId)
	console.log('current ID', currentModalId)
	const [programExercise, setProgramExercise] = useState([])
	const allPrograms = useSelector((store) => store.user.program.program)
	// const allExercises = useSelector((store) => store.program.exercise)
	// console.log('all programs', allPrograms)
	// console.log('all exercises', allExercises)
	const myProgram = allPrograms.filter((program) => program._id === programId)
	// const myExercise = allExercises.map((exercise) => exercise._id)
	// console.log('myExercises', myExercise)
	// console.log('my program', myProgram)
	// const userHasExercise = useSelector((store) => store.program.exercise)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	

	useEffect(() => {
		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}

		 console.log('haloo',programId)
		fetch(API_URL(`myprogram/${programId}`), options)
			.then((res) => res.json())
			.then((data) => {
				dispatch(ui.actions.setLoading(true))
				setProgramExercise(data.response.exercise)
				console.log('exercise in fetch',data.response)
			})
			.finally(() => dispatch(ui.actions.setLoading(false)))
	}, [programId, dispatch])

	const handleModal = () => {
			dispatch(ui.actions.setShowModal(true))
			// dispatch(ui.actions.currentModalId(id))
	}
	console.log(handleModal)

	console.log('programexercise',programExercise)
	return isLoading ? (
		<LoadingAnimation />
	) : (
		<>
			<div>
				<h1>{myProgram[0].programName}</h1> 
				{programExercise.map((item) => (
					<div key={item._id}>
						<h1>{item.exercise}</h1>
						<div>
							<p>{item.sets} sets</p>
							<p>{item.reps} reps</p>
							<p>{item.weights} </p>
							<p>{item.minutes} min</p>
							<p>{item.seconds} sec</p>
							<p>{item.duration}</p>
							<p>{item.length} sec</p>
							<p>comment: {item.comments}</p>
							<p>link: {item.link}</p>
						</div>
						<StyledButton onClick={() => handleModal()}>Edit exercise </StyledButton>
						{showModal ? <EditExerciseModal/> : null}
					</div>
				))}
			</div>
		</>
	)
}

export default SingleProgram

const StyledButton = styled.button``