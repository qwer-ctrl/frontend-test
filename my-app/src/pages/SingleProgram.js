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
	const userHasExercise = useSelector((store) => store.program.exercise.exercise)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	return isLoading ? (
		<LoadingAnimation />
	) : (
		<>
			<div>
				{userHasExercise.map((item) => {
					return (
						<div key={item._id}>
							<h1>{item.exercise}</h1>
							<div>
								<p>{item.sets} sets</p>
								<p>{item.reps} reps</p>
								<p>{item.weights} </p>
								<p>comment: {item.comments}</p>
							</div>
						</div>
					)
				})}
			</div>
		</>
	)
}

export default SingleProgram
