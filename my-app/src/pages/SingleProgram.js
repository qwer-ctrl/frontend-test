import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components/macro'

import { API_URL } from '../utils/utils'
import { program } from '../reducers/program'
import exercise from '../reducers/exercise'
import ui from '../reducers/ui'
import LoadingAnimation from '../components/LoadingAnimation'
import SignOut from '../components/SignOut'
// import EmptyState from '../components/EmptyState'

const SingleProgram = () => {
	const { programId } = useParams()
	const isLoading = useSelector((store) => store.ui.isLoading)
	const allPrograms = useSelector((store) => store.user.program.program)
	const allExercises = useSelector((store) => store.program.exercise.exercise)
	console.log(allPrograms)
	const myProgram = allPrograms.filter((program) => program._id === programId)
	const myExercise = allExercises.map((exercise) => exercise._id)
	console.log('myExercises', myExercise)
	console.log('my program', myProgram)
	// const userHasExercise = useSelector((store) => store.program.exercise)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	return isLoading ? (
		<LoadingAnimation />
	) : (
		<>
			<div>
				<h1>{myProgram[0].programName}</h1>
				{/* {myProgram.exercise.map((exercise) => (
					<div>
						<p>{exercise.sets} sets</p>
						<p>{reps} reps</p>
						<p>{weights} </p>
						<p>comment: {comments}</p>
					</div>
				))} */}
			</div>
		</>
	)
}

export default SingleProgram
