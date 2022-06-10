import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components/macro'

import { API_URL } from '../utils/utils'
import { program } from '../reducers/program'
import exercise from '../reducers/exercise'
import ui from '../reducers/ui'
import LoadingAnimation from '../components/LoadingAnimation'
import SignOut from '../components/SignOut'
import EmptyState from '../components/EmptyState'

const MyTextInput = ({ label, ...props }) => {
	const [field, meta] = useField(props)
	return (
		<>
			<label htmlFor={props.id || props.name}>{label}</label>
			<input className='text-input' {...field} {...props} />
			{meta.touched && meta.error ? <StyledError className='error'>{meta.error}</StyledError> : null}
		</>
	)
}

const AddProgram = () => {
	const { programId } = useParams()
	const [programName, setProgramName] = useState('')
	const [exerciseId, setExerciseId] = useState('')
	const [displaySets, setDisplaySets] = useState(false)
	const [displayReps, setDisplayReps] = useState(false)
	const [displayWeights, setDisplayWeights] = useState(false)
	const [displayComments, setDisplayComments] = useState(false)
	const [displayMinutes, setDisplayMinutes] = useState(false)
	const [displaySeconds, setDisplaySeconds] = useState(false)
	const [displayDuration, setDisplayDuration] = useState(false)
	const [displayLength, setDisplayLength] = useState(false)
	const [displayLink, setDisplayLink] = useState(false)
	const isLoading = useSelector((store) => store.ui.isLoading)
	const userHasExercise = useSelector((store) => store.program.exercise)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	useEffect(() => {
		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}

		 console.log('pId',programId)
		fetch(API_URL(`myprogram/${programId}`), options)
			.then((res) => res.json())
			.then((data) => {
				dispatch(ui.actions.setLoading(true))
				//console.log(data)
				if (data.success) {
					dispatch(program.actions.setExercise(data.response))
					dispatch(exercise.actions.setExercise(data.response))
					dispatch(exercise.actions.setSets(data.response))
					dispatch(exercise.actions.setReps(data.response))
					dispatch(exercise.actions.setWeights(data.response))
					dispatch(exercise.actions.setComments(data.response))
					dispatch(exercise.actions.setSeconds(data.response))
					dispatch(exercise.actions.setMinutes(data.response))
					dispatch(exercise.actions.setDuration(data.response))
					dispatch(exercise.actions.setLength(data.response))
					dispatch(exercise.actions.setLink(data.response))
					dispatch(exercise.actions.setCreatedAt(data.response))
					dispatch(exercise.actions.setExerciseId(data.response))
					dispatch(exercise.actions.setError(null))
					console.log(data.response)
					setProgramName(data.response.programName)
				} else {
					dispatch(exercise.actions.setError(data.response))
					dispatch(program.actions.setExercise(null))
					dispatch(exercise.actions.setExercise(null))
					dispatch(exercise.actions.setSets(null))
					dispatch(exercise.actions.setReps(null))
					dispatch(exercise.actions.setWeights(null))
					dispatch(exercise.actions.setComments(null))
					dispatch(exercise.actions.setSeconds(null))
					dispatch(exercise.actions.setMinutes(null))
					dispatch(exercise.actions.setDuration(null))
					dispatch(exercise.actions.setLength(null))
					dispatch(exercise.actions.setLink(null))
					dispatch(exercise.actions.setCreatedAt(null))
					dispatch(exercise.actions.setExerciseId(null))
				}
			})
			.finally(() => dispatch(ui.actions.setLoading(false)))
	}, [programId, dispatch])

	useEffect(() => {
		if (exerciseId) {
			const options = {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}

			fetch(API_URL(`exercise/${exerciseId}`), options)
				.then((res) => res.json())
				.then((data) => {
					dispatch(ui.actions.setLoading(true))
					console.log(data)
					if (data.success) {
						dispatch(exercise.actions.setError(null))
						dispatch(exercise.actions.setExercise(data.response))
						dispatch(exercise.actions.setSets(data.response))
						dispatch(exercise.actions.setReps(data.response))
						dispatch(exercise.actions.setWeights(data.response))
						dispatch(exercise.actions.setComments(data.response))
						dispatch(exercise.actions.setSeconds(data.response))
						dispatch(exercise.actions.setMinutes(data.response))
						dispatch(exercise.actions.setDuration(data.response))
						dispatch(exercise.actions.setLength(data.response))
						dispatch(exercise.actions.setLink(data.response))
						dispatch(exercise.actions.setCreatedAt(data.response))
						dispatch(exercise.actions.setExerciseId(data.response))
					} else {
						dispatch(exercise.actions.setError(data.response))
						dispatch(exercise.actions.setExercise(null))
						dispatch(exercise.actions.setSets(null))
						dispatch(exercise.actions.setReps(null))
						dispatch(exercise.actions.setWeights(null))
						dispatch(exercise.actions.setComments(null))
						dispatch(exercise.actions.setSeconds(null))
						dispatch(exercise.actions.setMinutes(null))
						dispatch(exercise.actions.setDuration(null))
						dispatch(exercise.actions.setLength(null))
						dispatch(exercise.actions.setLink(null))
						dispatch(exercise.actions.setCreatedAt(null))
						dispatch(exercise.actions.setExerciseId(null))
					}
				})
				.finally(() => dispatch(ui.actions.setLoading(false)))
		}
	}, [exerciseId, dispatch])

	const Schema = Yup.object().shape({
		exercise: Yup.string().required('Username is required'),
		sets: Yup.string(),
		reps: Yup.string(),
		weights: Yup.string(),
		comments: Yup.string(),
		seconds: Yup.string(),
		minutes: Yup.string(),
		duration: Yup.string(),
		length: Yup.string(),
		link: Yup.string(),
		
	})

	const handleData = (data) => {
		setExerciseId(data.response._id)
	}

	const handleSetsState = () => {
		setDisplaySets(!displaySets)
	}
	const handleRepsState = () => {
		setDisplayReps(!displayReps)
	}
	const handleWeightsState = () => {
		setDisplayWeights(!displayWeights)
	}
	const handleCommentsState = () => {
		setDisplayComments(!displayComments)
	}
	const handleSecondsState = () => {
		setDisplaySeconds(!displaySeconds)
	}
	const handleMinutesState = () => {
		setDisplayMinutes(!displayMinutes)
	}
	const handleDurationState = () => {
		setDisplayDuration(!displayDuration)
	}
	const handleLengthState = () => {
		setDisplayLength(!displayLength)
	}
	const handleLinkState = () => {
		setDisplayLink(!displayLink)
	}

	const handleGoBack = () => {
		navigate('/')
	}

	return isLoading ? (
		<LoadingAnimation />
	) : (
		<>
			<MainContainer>
				{userHasExercise ? <h1>{programName}!</h1> : <EmptyState />}

				<Formik
					initialValues={{
						exercise: '',
						sets: '',
						reps: '',
						weights: '',
						link: '',
						seconds: '',
						minutes: '',
						duration: '',
						length: '',
						feeling: '',
						comments: '',
					}}
					validationSchema={Schema}
					onSubmit={(values, { setSubmitting, resetForm }) => {
						fetch(API_URL(`exercise/${programId}`), {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({
								exercise: values.exercise,
								sets: values.sets,
								reps: values.reps,
								weights: values.weights,
								comments: values.comments,
								link: values.link,
								seconds: values.seconds,
								minutes: values.minutes,
								duration: values.duration,
								length: values.length,
								feeling: values.feeling,
							}),
						})
							.then((res) => res.json())
							.then((data) => {
								console.log(data)
								handleData(data)
								console.log(data.response._id)
							})
							.catch((err) => {
								// handleLoginFailure(err)
							})
							.finally(() => {
								setSubmitting(false)
								resetForm()
								window.location.reload()
							})
					}}
				>
					{({ isSubmitting }) => (
						<StyledForm>
							{isSubmitting && <LoadingAnimation />}
							<StyledInput label='Exercise name' name='exercise' type='text' />
							<button onClick={handleSetsState} type='button'>
								Sets
							</button>
							<button onClick={handleRepsState} type='button'>
								Reps
							</button>
							<button onClick={handleWeightsState} type='button'>
								Weights
							</button>
							<button onClick={handleMinutesState} type='button'>
								Minutes
							</button>
							<button onClick={handleSecondsState} type='button'>
								Seconds
							</button>
							<button onClick={handleDurationState} type='button'>
								Duration
							</button>
							<button onClick={handleLengthState} type='button'>
								Length
							</button>
							<button onClick={handleCommentsState} type='button'>
								Comments
							</button>
							<button onClick={handleLinkState} type='button'>
								Link
							</button>
							{displaySets ? <StyledInput label='Sets' name='sets' type='text' /> : null}
							{displayReps ? <StyledInput label='Reps' name='reps' type='text' /> : null}
							{displayWeights ? <StyledInput label='Weights' name='weights' type='text' /> : null}
							{displaySeconds ? <StyledInput label='Seconds' name='seconds' type='text' /> : null}
							{displayMinutes ? <StyledInput label='Minutes' name='minutes' type='text' /> : null}
							{displayDuration ? <StyledInput label='Duration' name='duration' type='text' /> : null}
							{displayLength ? <StyledInput label='Length' name='length' type='text' /> : null}
							{displayComments ? <StyledInput label='Comments' name='comments' type='text' /> : null}
							{displayLink ? <StyledInput label='Link' name='link' type='text' /> : null}
							<StyledButton type='submit'>Add exercise</StyledButton>
						</StyledForm>
					)}
				</Formik>
				<button onClick={handleGoBack}>Done with program, go back to main</button>
				<div>
					{userHasExercise.exercise.map((item) => {
						return (
							<div key={item._id}>
								<h1>{item.exercise}</h1>
								<div>
									<p>{item.sets} sets</p>
									<p>{item.reps} reps</p>
									<p>{item.weights} </p>
								<p>{item.minutes} min</p>
								<p>{item.seconds} sec</p>
								<p>{item.duration}</p>
								<p>distance: {item.length} </p>
								<p>comment: {item.comments}</p>
								<p>link: {item.link}</p>
								</div>
							</div>
						)
					})}
				</div>
			</MainContainer>
			<SignOut />
		</>
	)
}

export default AddProgram

const MainContainer = styled.section``

const StyledForm = styled(Form)`
	display: flex;
	flex-direction: column;
`

const StyledInput = styled(MyTextInput)`
	max-width: 150px;
`

// const StyledCheckbox = styled(MyCheckbox)``

const StyledError = styled.div``

const StyledButton = styled.button``
