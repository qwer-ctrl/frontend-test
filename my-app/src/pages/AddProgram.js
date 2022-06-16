import React, { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useRef } from 'react'
import { Formik, Form, useField, Field, FieldArray } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components/macro'

import { API_URL } from '../utils/utils'
import { program } from '../reducers/program'
import exercise from '../reducers/exercise'
import ui from '../reducers/ui'
import LoadingAnimation from '../components/LoadingAnimation'
import SignOut from '../components/SignOut'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { OuterWrapper, InnerWrapper } from '../styles/GlobalStyles'

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
	const userId = useSelector((store) => store.user.userId)
	const [programName, setProgramName] = useState('')
	const [exerciseId, setExerciseId] = useState('')
	const [inputSet, setInputSets] = useState([])
	const [displaySets, setDisplaySets] = useState(false)
	// const [displayReps, setDisplayReps] = useState(false)
	// const [displayWeights, setDisplayWeights] = useState(false)
	const [displayComments, setDisplayComments] = useState(false)
	const [displayMinutes, setDisplayMinutes] = useState(false)
	const [displaySeconds, setDisplaySeconds] = useState(false)
	const [displayDuration, setDisplayDuration] = useState(false)
	const [displayExerciseLength, setDisplayExerciseLength] = useState(false)
	const [displayExerciseLink, setDisplayExerciseLink] = useState(false)
	const isLoading = useSelector((store) => store.ui.isLoading)
	const userHasExercise = useSelector((store) => store.program.exercise)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	// const arrOfReps = []
	const ref = useRef(null)

	const fetchProgram = useCallback(() => {
		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}

		dispatch(ui.actions.setLoading(true))
		fetch(API_URL(`myprogram/${programId}`), options)
			.then((res) => res.json())
			.then((data) => {
				// console.log(data)
				if (data.success) {
					dispatch(program.actions.setExercise(data.response))
					dispatch(exercise.actions.setExercise(data.response))
					dispatch(exercise.actions.setSets(data.response))
					// dispatch(exercise.actions.setReps(data.response))
					// dispatch(exercise.actions.setWeights(data.response))
					dispatch(exercise.actions.setComments(data.response))
					dispatch(exercise.actions.setSeconds(data.response))
					dispatch(exercise.actions.setMinutes(data.response))
					dispatch(exercise.actions.setDuration(data.response))
					dispatch(exercise.actions.setExerciseLength(data.response))
					dispatch(exercise.actions.setExerciseLink(data.response))
					dispatch(exercise.actions.setCreatedAt(data.response))
					dispatch(exercise.actions.setExerciseId(data.response))
					dispatch(exercise.actions.setError(null))
					console.log('from post in FE', data.response)
					setProgramName(data.response.programName)
				} else {
					dispatch(exercise.actions.setError(data.response))
					dispatch(program.actions.setExercise(null))
					dispatch(exercise.actions.setExercise(null))
					dispatch(exercise.actions.setSets(null))
					// dispatch(exercise.actions.setReps(null))
					// dispatch(exercise.actions.setWeights(null))
					dispatch(exercise.actions.setComments(null))
					dispatch(exercise.actions.setSeconds(null))
					dispatch(exercise.actions.setMinutes(null))
					dispatch(exercise.actions.setDuration(null))
					dispatch(exercise.actions.setExerciseLength(null))
					dispatch(exercise.actions.setExerciseLink(null))
					dispatch(exercise.actions.setCreatedAt(null))
					dispatch(exercise.actions.setExerciseId(null))
				}
			})
			.finally(() => dispatch(ui.actions.setLoading(false)))
	}, [dispatch, programId])

	useEffect(() => {
		fetchProgram()
	}, [fetchProgram])

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
					if (data.success) {
						console.log('fetch from BE', data)
						dispatch(exercise.actions.setError(null))
						dispatch(exercise.actions.setExercise(data.response))
						dispatch(exercise.actions.setSets(data.response))
						// dispatch(exercise.actions.setReps(data.response))
						// dispatch(exercise.actions.setWeights(data.response))
						dispatch(exercise.actions.setComments(data.response))
						dispatch(exercise.actions.setSeconds(data.response))
						dispatch(exercise.actions.setMinutes(data.response))
						dispatch(exercise.actions.setDuration(data.response))
						dispatch(exercise.actions.setExerciseLength(data.response))
						dispatch(exercise.actions.setExerciseLink(data.response))
						dispatch(exercise.actions.setCreatedAt(data.response))
						dispatch(exercise.actions.setExerciseId(data.response))
					} else {
						dispatch(exercise.actions.setError(data.response))
						dispatch(exercise.actions.setExercise(null))
						// dispatch(exercise.actions.setSets(null))
						// dispatch(exercise.actions.setReps(null))
						dispatch(exercise.actions.setWeights(null))
						dispatch(exercise.actions.setComments(null))
						dispatch(exercise.actions.setSeconds(null))
						dispatch(exercise.actions.setMinutes(null))
						dispatch(exercise.actions.setDuration(null))
						dispatch(exercise.actions.setExerciseLength(null))
						dispatch(exercise.actions.setExerciseLink(null))
						dispatch(exercise.actions.setCreatedAt(null))
						dispatch(exercise.actions.setExerciseId(null))
					}
				})
				.finally(() => dispatch(ui.actions.setLoading(false)))
		}
	}, [exerciseId, dispatch])

	const Schema = Yup.object().shape({
		exercise: Yup.string().required('Exercise name is required'),
		sets: Yup.array(
			Yup.object().shape({
				reps: Yup.string(),
				weights: Yup.string(),
			})
		),
		// reps: Yup.string(),
		// weights: Yup.string(),
		comments: Yup.string().max(140, 'The maximum amount of characters is 140'),
		seconds: Yup.string(),
		minutes: Yup.string(),
		duration: Yup.string(),
		exerciseLength: Yup.string(),
		exerciseLink: Yup.string(),
	})

	const handleData = (data) => {
		setExerciseId(data.response._id)
	}

	const handleSetsState = () => {
		setDisplaySets(!displaySets)
	}
	// const handleRepsState = () => {
	// 	setDisplayReps(!displayReps)
	// }
	// const handleWeightsState = () => {
	// 	setDisplayWeights(!displayWeights)
	// }
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
	const handleExerciseLengthState = () => {
		setDisplayExerciseLength(!displayExerciseLength)
	}
	const handleExerciseLinkState = () => {
		setDisplayExerciseLink(!displayExerciseLink)
	}

	const handleGoBack = () => {
		navigate(`/mypage/${userId}`)
	}

	useEffect(() => {
		if (ref.current) {
			console.log(ref)
			console.log(ref.current.values.sets)
			// const numberOfSets = ref.current.values.sets
			// console.log(numberOfSets)

			// for (let i = 1; i <= numberOfSets; i++) {
			// 	arrOfReps.push('hej')
			// 	console.log(arrOfReps)
			// 	console.log('hej')
			// }
			// console.log(ref.current.values)
		}
	}, [])

	return isLoading ? (
		<LoadingAnimation />
	) : (
		<OuterWrapper>
			<Header />
			<InnerWrapper>
				<MainContainer>
					{userHasExercise && <h1>{programName}!</h1>}

					<Formik
						initialValues={{
							exercise: '',
							// sets: '',
							// reps: '',
							// weights: '',
							exerciseLink: '',
							seconds: '',
							minutes: '',
							duration: '',
							exerciseLength: '',
							feeling: '',
							comments: '',
							sets: [
								{
									reps: '',
									weights: '',
								},
							],
						}}
						validationSchema={Schema}
						innerRef={ref}
						onSubmit={(values, { setSubmitting, resetForm }) => {
							fetch(API_URL(`exercise/${programId}`), {
								method: 'POST',
								headers: {
									'Content-Type': 'application/json',
								},
								body: JSON.stringify({
									exercise: values.exercise,
									sets: values.sets,
									// reps: values.reps,
									// weights: values.weights,
									comments: values.comments,
									exerciseLink: values.exerciseLink,
									seconds: values.seconds,
									minutes: values.minutes,
									duration: values.duration,
									exerciseLength: values.exerciseLength,
								}),
							})
								.then((res) => res.json())
								.then((data) => {
									// console.log(data)
									handleData(data)
									// console.log(data.response._id)
								})
								.catch((err) => {
									console.log(err)
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
								{/* 
								<StyledButton onClick={handleSetsState} type='button'>
									Sets
								</StyledButton>
								{displaySets ? <StyledInput label='Sets' name='sets' type='text' /> : null} */}

								<FieldArray name='sets'>
									{({ remove, push, form }) => (
										<div>
											{form.values.sets.length > 0 &&
												form.values.sets.map((sets, index) => (
													<div key={index}>
														<StyledButton onClick={handleSetsState} type='button'>
															Sets
														</StyledButton>
														<div>
															{displaySets ? <label htmlFor={`${sets}.${index}.reps`}>Reps</label> : null}
															{displaySets ? <Field name={`${sets}.${index}.reps`} type='text' /> : null}
														</div>
														<div>
															{displaySets ? (
																<label htmlFor={`${sets}.${index}.weights`}>Weights</label>
															) : null}
															{displaySets ? <Field name={`${sets}.${index}.weights`} type='text' /> : null}
														</div>
														<button type='button' className='secondary' onClick={() => remove(index)}>
															X
														</button>
													</div>
												))}
											<button type='button' onClick={() => push({ reps: '', weights: '' })}>
												Add new set
											</button>
										</div>
									)}
								</FieldArray>

								{/* <StyledButton onClick={handleRepsState} type='button'>
									Reps
								</StyledButton>
								{displayReps ? <StyledInput label='Reps' name='reps' type='text' /> : null} */}

								{/* <StyledButton onClick={handleWeightsState} type='button'>
									Weights
								</StyledButton>
								{displayWeights ? <StyledInput label='Weights' name='weights' type='text' /> : null} */}

								<StyledButton onClick={handleMinutesState} type='button'>
									Minutes
								</StyledButton>
								{displayMinutes ? <StyledInput label='Minutes' name='minutes' type='text' /> : null}

								<StyledButton onClick={handleSecondsState} type='button'>
									Seconds
								</StyledButton>
								{displaySeconds ? <StyledInput label='Seconds' name='seconds' type='text' /> : null}

								<StyledButton onClick={handleDurationState} type='button'>
									Duration
								</StyledButton>
								{displayDuration ? <StyledInput label='Duration' name='duration' type='text' /> : null}

								<StyledButton onClick={handleExerciseLengthState} type='button'>
									Length
								</StyledButton>
								{displayExerciseLength ? (
									<StyledInput label='Length' name='exerciseLength' type='text' />
								) : null}

								<StyledButton onClick={handleCommentsState} type='button'>
									Comments
								</StyledButton>
								{displayComments ? <StyledInput label='Comments' name='comments' type='text' /> : null}

								<StyledButton onClick={handleExerciseLinkState} type='button'>
									Link
								</StyledButton>
								{displayExerciseLink ? <StyledInput label='Link' name='exerciseLink' type='text' /> : null}
								<StyledButton type='submit'>Add exercise</StyledButton>
							</StyledForm>
						)}
					</Formik>
					<div>
						{userHasExercise &&
							userHasExercise.exercise.map((item) => {
								console.log('exercises from store', item.sets)
								return (
									<div key={item._id}>
										<h1>{item.exercise}</h1>
										<div>
											{item.sets && <p>{item.sets} sets</p>}
											{/* {item.reps && <p>{item.reps} reps</p>}
											{item.weights && <p>{item.weights} </p>} */}
											{item.minutes && <p>{item.minutes} min</p>}
											{item.seconds && <p>{item.seconds} sec</p>}
											{item.duration && <p>{item.duration}</p>}
											{item.exerciseLength && <p>distance: {item.exerciseLength} </p>}
											{item.comments && <p>comment: {item.comments}</p>}
											{item.exerciseLink && (
												<p>
													link:
													<a href={item.exerciseLink} target='_blank' rel='noopener noreferrer'>
														{item.exerciseLink}
													</a>
												</p>
											)}
										</div>
									</div>
								)
							})}
					</div>
					<ButtonContainer>
						<StyledButton onClick={handleGoBack}>Done with program, go back to main</StyledButton>
						<SignOut />
					</ButtonContainer>
				</MainContainer>
			</InnerWrapper>
			<Footer />
		</OuterWrapper>
	)
}

export default AddProgram

const MainContainer = styled.section`
	text-align: center;
`

const StyledForm = styled(Form)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 2rem 0 0;
`

const StyledInput = styled(MyTextInput)`
	max-width: 150px;
	margin: 0.5rem 0;
	text-align: center;
`

// const StyledCheckbox = styled(MyCheckbox)``

const ButtonContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	margin: 2rem 0;
	gap: 1rem;
`

const StyledError = styled.div``

const StyledButton = styled.button`
	width: 150px;
	margin: 5px;
	padding: 5px;
`
