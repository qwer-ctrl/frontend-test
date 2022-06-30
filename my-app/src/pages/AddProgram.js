import React, { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components/macro'

import { OuterWrapper, InnerWrapper, HeadingOne } from '../styles/GlobalStyles'
import { StyledButton } from '../styles/ButtonStyles'

import { API_URL } from '../utils/utils'
import exercise from '../reducers/exercise'
import ui from '../reducers/ui'
import LoadingAnimation from '../components/LoadingAnimation'
import Footer from '../components/Footer'

const MyTextInput = ({ label, ...props }) => {
	const [field, meta] = useField(props)
	return (
		<InputContainer>
			<label htmlFor={props.id || props.name}>{label}</label>
			<input className='text-input' {...field} {...props} />
			{meta.touched && meta.error ? <StyledError className='error'>{meta.error}</StyledError> : null}
		</InputContainer>
	)
}

const MyTextArea = ({ label, ...props }) => {
	const [field, meta] = useField(props)
	return (
		<InputContainer>
			<label htmlFor={props.id || props.name}>{label}</label>
			<textarea className='text-input' {...field} {...props} />
			{meta.touched && meta.error ? <StyledError className='error'>{meta.error}</StyledError> : null}
		</InputContainer>
	)
}

const AddProgram = () => {
	const { programId } = useParams()
	const [programName, setProgramName] = useState('')
	const [exerciseContent, setExerciseContent] = useState([])
	const [displaySets, setDisplaySets] = useState(false)
	const [displayReps, setDisplayReps] = useState(false)
	const [displayWeights, setDisplayWeights] = useState(false)
	const [displayComments, setDisplayComments] = useState(false)
	const [displayMinutes, setDisplayMinutes] = useState(false)
	const [displaySeconds, setDisplaySeconds] = useState(false)
	const [displayDuration, setDisplayDuration] = useState(false)
	const [displayExerciseLength, setDisplayExerciseLength] = useState(false)
	const [displayExerciseLink, setDisplayExerciseLink] = useState(false)
	const isLoading = useSelector((store) => store.ui.isLoading)
	const navigate = useNavigate()
	const dispatch = useDispatch()

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
				if (data.success) {
					setProgramName(data.response.programName)
					setExerciseContent(data.response.exercise)
				} else {
					dispatch(exercise.actions.setError(data.response))
				}
			})
			.finally(() => dispatch(ui.actions.setLoading(false)))
	}, [dispatch, programId])

	useEffect(() => {
		if (programId) {
			fetchProgram()
		}
	}, [fetchProgram, programId])

	const Schema = Yup.object().shape({
		exercise: Yup.string()
			.required('Exercise name is required')
			.max(20, 'The name can contain maximum 20 letters'),
		sets: Yup.string(),
		reps: Yup.string(),
		weights: Yup.string(),
		comments: Yup.string().max(140, 'The maximum amount of characters is 140'),
		seconds: Yup.string(),
		minutes: Yup.string(),
		duration: Yup.string(),
		exerciseLength: Yup.string(),
		exerciseLink: Yup.string(),
	})

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
	const handleExerciseLengthState = () => {
		setDisplayExerciseLength(!displayExerciseLength)
	}
	const handleExerciseLinkState = () => {
		setDisplayExerciseLink(!displayExerciseLink)
	}

	const handleGoBack = () => {
		navigate('/mypage')
	}

	return isLoading ? (
		<LoadingAnimation />
	) : (
		<OuterWrapper>
			<InnerWrapper margin='6vh auto 4rem' desktopMargin='10vh auto 4rem'>
				{exerciseContent && (
					<HeadingOne fontSize='2rem' color='#6EB3B8' fontWeight='700'>
						{programName}
					</HeadingOne>
				)}

				<Formik
					initialValues={{
						exercise: '',
						sets: '',
						reps: '',
						weights: '',
						exerciseLink: '',
						seconds: '',
						minutes: '',
						duration: '',
						exerciseLength: '',
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
								minutes: values.minutes,
								seconds: values.seconds,
								exerciseLength: values.exerciseLength,
								duration: values.duration,
								exerciseLink: values.exerciseLink,
								comments: values.comments,
							}),
						})
							.then((res) => res.json())
							.then((data) => {
								console.log(data)
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

							<MetricsButtonContainer>
								<StyledInputButton onClick={handleSetsState} type='button' changeColor={displaySets}>
									Sets
								</StyledInputButton>

								<StyledInputButton onClick={handleRepsState} type='button' changeColor={displayReps}>
									Reps
								</StyledInputButton>

								<StyledInputButton onClick={handleWeightsState} type='button' changeColor={displayWeights}>
									Weights
								</StyledInputButton>

								<StyledInputButton onClick={handleMinutesState} type='button' changeColor={displayMinutes}>
									Minutes
								</StyledInputButton>

								<StyledInputButton onClick={handleSecondsState} type='button' changeColor={displaySeconds}>
									Seconds
								</StyledInputButton>

								<StyledInputButton onClick={handleDurationState} type='button' changeColor={displayDuration}>
									Duration
								</StyledInputButton>

								<StyledInputButton
									changeColor={displayExerciseLength}
									onClick={handleExerciseLengthState}
									type='button'
								>
									Length
								</StyledInputButton>

								<StyledInputButton
									onClick={handleExerciseLinkState}
									type='button'
									changeColor={displayExerciseLink}
								>
									Link
								</StyledInputButton>

								<StyledInputButton onClick={handleCommentsState} type='button' changeColor={displayComments}>
									Comments
								</StyledInputButton>
							</MetricsButtonContainer>

							<MetricsInputContainer>
								{displaySets ? <StyledInput label='Sets' name='sets' type='text' /> : null}
								{displayReps ? <StyledInput label='Reps' name='reps' type='text' /> : null}
								{displayWeights ? <StyledInput label='Weights' name='weights' type='text' /> : null}
								{displayMinutes ? <StyledInput label='Minutes' name='minutes' type='text' /> : null}
								{displaySeconds ? <StyledInput label='Seconds' name='seconds' type='text' /> : null}
								{displayDuration ? <StyledInput label='Duration' name='duration' type='text' /> : null}
								{displayExerciseLength ? (
									<StyledInput label='Length' name='exerciseLength' type='text' />
								) : null}
								{displayExerciseLink ? <StyledInput label='Link' name='exerciseLink' type='text' /> : null}
								{displayComments ? (
									<StyledCommentsInput label='Comments' name='comments' type='text' rows='3' />
								) : null}
							</MetricsInputContainer>

							<StyledButton
								background='var(--primary)'
								margin='1em 0 0'
								padding='6px 18px'
								boxShadow='0px 10px 13px -7px #808080'
								backgroundHover='var(--tertiary)'
								color='var(--secondary)'
								type='submit'
							>
								Add exercise
							</StyledButton>
						</StyledForm>
					)}
				</Formik>
				{exerciseContent && (
					<ExerciseGrid>
						{exerciseContent.map((exercise) => (
							<ExerciseContainer key={exercise._id}>
								<HeadingOne fontSize='1rem' color='var(--tertiary)' fontWeight='500'>
									{exercise.exercise}
								</HeadingOne>

								<MetricsOutputContainer>
									<MetricsContainer>
										{exercise.sets && <p>Sets: {exercise.sets}</p>}
										{exercise.reps && <p>Reps: {exercise.reps}</p>}
										{exercise.weights && <p>Weights: {exercise.weights}</p>}
									</MetricsContainer>

									<MetricsContainer>
										{exercise.minutes && <p>Minutes: {exercise.minutes}</p>}
										{exercise.seconds && <p>Seconds: {exercise.seconds}</p>}
									</MetricsContainer>

									<MetricsContainer>
										{exercise.duration && <p>Duration: {exercise.duration}</p>}
										{exercise.exerciseLength && <p>Distance: {exercise.exerciseLength} </p>}
									</MetricsContainer>

									<MetricsContainer>
										{exercise.exerciseLink && (
											<p>
												Link:{' '}
												<a href={exercise.exerciseLink} target='_blank' rel='noopener noreferrer'>
													{exercise.exerciseLink}
												</a>
											</p>
										)}
									</MetricsContainer>

									<MetricsContainer>
										{exercise.comments && <p>Comment: {exercise.comments}</p>}
									</MetricsContainer>
								</MetricsOutputContainer>
							</ExerciseContainer>
						))}
					</ExerciseGrid>
				)}
				<ButtonContainer>
					<StyledButton
						width='150px'
						background='var(--primary)'
						margin='1rem 0 0'
						padding='6px 18px'
						boxShadow='0px 10px 13px -7px #808080'
						backgroundHover='var(--tertiary)'
						color='var(--secondary)'
						fontSize='10px'
						onClick={handleGoBack}
					>
						Done, go back!
					</StyledButton>
				</ButtonContainer>
			</InnerWrapper>
			<Footer />
		</OuterWrapper>
	)
}

export default AddProgram

const StyledForm = styled(Form)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	margin: 1rem 0;
	background: var(--secondary);
	padding: 2rem;
	gap: 0.5rem;
	border-radius: 6px;
	box-shadow: 0px 10px 13px 0px #808080;

	@media screen and (min-width: 768px) {
		padding: 2rem 3rem;
	}
`

const InputContainer = styled.div`
	display: flex;
	flex-direction: column;

	label {
		justify-content: flex-start;
	}
`

const StyledError = styled.div`
	margin-bottom: 1.5rem;
	text-align: center;
	color: var(--accentlilac);
`

const MetricsButtonContainer = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	width: 100%;
	margin-bottom: 1rem;
	gap: 3px;
`

const MetricsInputContainer = styled.div`
	width: 100%;

	@media screen and (min-width: 768px) {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
		column-gap: 1rem;
	}
`

const StyledInput = styled(MyTextInput)`
	max-width: 150px;
	margin: 0.5rem 0;
	text-align: center;
	border: none;
	border-radius: 15px;
	padding: 6px 10px;
	-webkit-appearance: none;
	-moz-appearance: none;
	box-shadow: inset 0px 4px 4px 0px #adadad;

	&:focus {
		outline: none;
		border: 2px solid var(--primary);
	}
`

const StyledCommentsInput = styled(MyTextArea)`
	max-width: 150px;
	margin: 0.5rem 0;
	border: none;
	border-radius: 15px;
	padding: 6px 10px;
	box-shadow: inset 0px 4px 4px 0px #adadad;

	&:focus {
		outline: none;
		border-bottom: 3px solid var(--primary);
	}
`

const MetricsOutputContainer = styled.div`
	width: 100%;

	p {
		font-size: 0.9rem;
		max-width: 17ch;
		overflow-wrap: break-word;
		padding-right: 1rem;

		@media screen and (min-width: 768px) {
			font-size: 1rem;
			max-width: 25ch;
		}
	}
`

const MetricsContainer = styled.div`
	display: flex;
	margin-bottom: 0.15em;
`

const ExerciseGrid = styled.article`
	width: 100%;
`

const ExerciseContainer = styled.div`
	max-width: 765px;
	margin: auto;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-evenly;
	padding: 1rem 2rem;
	border-radius: 15px;
	box-shadow: 0px 6px 13px 0px #adadad;
`

const ButtonContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-evenly;
	margin: 0 0 2rem;
	gap: 1rem;
`

const StyledInputButton = styled.button`
	background-color: ${(props) => (props.changeColor ? 'var(--primary)' : 'var(--white)')};
	color: var(--black);
	font-family: 'poppins';
	font-size: 0.7rem;
	font-weight: 500;
	cursor: pointer;
	text-transform: uppercase;
	border: none;
	border-radius: 20px;
	width: fit-content;
	padding: 6px 18px;
	margin: 1em 0 0;
	box-shadow: 0px 10px 13px -7px #808080;

	&:hover {
		outline: none;
		background: var(--tertiary);
		color: var(--secondary);
	}

	&:focus {
		outline: 1px solid var(--tertiary);
	}
`
