import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components/macro'

import { ModalContainer, StyledModal, CloseButton } from '../styles/ModalStyles'
import { StyledButton } from '../styles/ButtonStyles'

import ui from '../reducers/ui'
import { API_URL } from '../utils/utils'
import LoadingAnimation from '../components/LoadingAnimation'


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


const EditExerciseModal = () => {
	const [exerciseContent, setExerciseContent] = useState('')
	const exerciseId = useSelector((store) => store.ui.currentModalId)
	const showModal = useSelector((store) => store.ui.showEditExerciseModal)
	const dispatch = useDispatch()

	const closeModal = () => {
		dispatch(ui.actions.setShowEditExerciseModal(false))
	}

	useEffect(() => {
		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}
		fetch(API_URL(`exercise/${exerciseId}`), options)
			.then((res) => res.json())
			.then((data) => {
				setExerciseContent(data.response)
			})
	}, [exerciseId, dispatch])

	const Schema = Yup.object().shape({
		exercise: Yup.string(),
		sets: Yup.string(),
		reps: Yup.string(),
		weights: Yup.string(),
		comments: Yup.string(),
		seconds: Yup.string(),
		minutes: Yup.string(),
		duration: Yup.string(),
		exerciseLength: Yup.string(),
		exerciseLink: Yup.string(),
	})

	return (
		<>
			{showModal ? (
				<ModalContainer>
					<StyledModal>
						<CloseButton onClick={closeModal}><StyledSpan>x</StyledSpan></CloseButton>
						<Formik
							initialValues={{
								sets: exerciseContent.sets,
								reps: exerciseContent.reps,
								weights: exerciseContent.weights,
								exerciseLink: exerciseContent.exerciseLink,
								seconds: exerciseContent.seconds,
								minutes: exerciseContent.minutes,
								duration: exerciseContent.duration,
								exerciseLength: exerciseContent.exerciseLength,
								comments: exerciseContent.comments,
							}}
							validationSchema={Schema}
							onSubmit={(values, { setSubmitting, resetForm }) => {
								fetch(API_URL(`updateexercise/${exerciseId}`), {
									method: 'PATCH',
									headers: {
										'Content-Type': 'application/json',
									},
									body: JSON.stringify({
										sets: values.sets,
										reps: values.reps,
										weights: values.weights,
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
										dispatch(ui.actions.setLoading(true))
										console.log(data)
									})
									.catch((err) => {
										console.log(err)
									})
									.finally(() => {
										setSubmitting(false)
										dispatch(ui.actions.setLoading(false))
										resetForm()
										closeModal()
										window.location.reload()
									})
							}}
						>
							{({ isSubmitting }) => (
								<StyledForm>
									{isSubmitting && <LoadingAnimation />}
									<StyledTitle>{exerciseContent.exercise}</StyledTitle>
									<StyledInput label='Sets' name='sets' type='text' placeholder={exerciseContent.sets} />
									<StyledInput label='Reps' name='reps' type='text' placeholder={exerciseContent.reps} />
									<StyledInput
										label='Weights'
										name='weights'
										type='text'
										placeholder={exerciseContent.weights}
									/>
									<StyledInput
										label='Seconds'
										name='seconds'
										type='text'
										placeholder={exerciseContent.seconds}
									/>
									<StyledInput
										label='Minutes'
										name='minutes'
										type='text'
										placeholder={exerciseContent.minutes}
									/>
									<StyledInput
										label='Duration'
										name='duration'
										type='text'
										placeholder={exerciseContent.duration}
									/>
									<StyledInput
										label='Length'
										name='exerciseLength'
										type='text'
										placeholder={exerciseContent.exerciseLength}
									/>
									<StyledInput
										label='Comments'
										name='comments'
										type='text'
										placeholder={exerciseContent.comments}
									/>
									<StyledInput
										label='Link'
										name='exerciseLink'
										type='text'
										placeholder={exerciseContent.exerciseLink}
									/>
									<StyledButton
										background='var(--primary)'
										margin='1em 0 0'
										padding='6px 18px'
										boxShadow='0px 10px 13px -7px #808080'
										fontSize='10px'
										type='submit'
									>
										Update exercise
									</StyledButton>
								</StyledForm>
							)}
						</Formik>
					</StyledModal>
				</ModalContainer>
			) : null}
		</>
	)
}

export default EditExerciseModal

const StyledSpan = styled.span`
	color: var(--black);
`

const StyledTitle = styled.h1`
	margin-bottom: 1rem;
`

const StyledForm = styled(Form)`
	display: flex;
	flex-direction: column;
`

const InputContainer = styled.div`
	display: flex;
	flex-direction: column;

	label {
		justify-content: flex-start;
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
		border-bottom: 3px solid var(--primary);
	}
`
const StyledError = styled.div`
	margin-bottom: 1.5rem;
	text-align: center;
	color: var(--accentlilac);
`
