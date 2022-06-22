import React from 'react'
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
		<>
			<label htmlFor={props.id || props.name}>{label}</label>
			<input className='text-input' {...field} {...props} />
			{meta.touched && meta.error ? <StyledError className='error'>{meta.error}</StyledError> : null}
		</>
	)
}

const AddExerciseModal = () => {
	const showModal = useSelector((store) => store.ui.showAddExerciseModal)
	const programId = useSelector((store) => store.ui.currentAddExerciseModalId)
	const dispatch = useDispatch()

	const closeModal = () => {
		dispatch(ui.actions.setShowAddExerciseModal(false))
	}

	const Schema = Yup.object().shape({
		exercise: Yup.string().required('Exercise name is required'),
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
						<CloseButton onClick={closeModal}>x</CloseButton>
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
										exerciseLink: values.exerciseLink,
										seconds: values.seconds,
										minutes: values.minutes,
										duration: values.duration,
										exerciseLength: values.exerciseLength,
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
										closeModal()
										window.location.reload()
									})
							}}
						>
							{({ isSubmitting }) => (
								<StyledForm>
									{isSubmitting && <LoadingAnimation />}
									<MetricsInputContainer>
									<StyledInput label='Exercise name' name='exercise' type='text' />
									<StyledInput label='Sets' name='sets' type='text' />
									<StyledInput label='Reps' name='reps' type='text' />
									<StyledInput label='Weights' name='weights' type='text' />
									<StyledInput label='Seconds' name='seconds' type='text' />
									<StyledInput label='Minutes' name='minutes' type='text' />
									<StyledInput label='Duration' name='duration' type='text' />
									<StyledInput label='Length' name='exerciseLength' type='text' />
									<StyledInput label='Comments' name='comments' type='text' />
									<StyledInput label='Link' name='exerciseLink' type='text' />
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
					</StyledModal>
				</ModalContainer>
			) : null}
		</>
	)
}

export default AddExerciseModal

const StyledForm = styled(Form)`
	// display: flex;
	// flex-direction: column;
`

const StyledInput = styled(MyTextInput)`
	max-width: 200px;
	margin: 5px 0 5px;
	text-align: center;
	border: none;
	border-radius: 15px;
	padding: 6px 10px;
	box-shadow: inset 0px 4px 4px 0px #adadad;
	//box-shadow: inset 2px -1px 4px 0px #adadad;

	&:focus {
		outline: none;
		border-bottom: 3px solid var(--primary);
		// border-bottom: 3px solid var(--tertiary);
	}
`

const MetricsInputContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
	width: 100%;
	column-gap: 5px;

	@media screen and (min-width: 768px) {
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
	}
`

const StyledError = styled.div`
	margin-bottom: 1.5rem;
	text-align: center;
	color: var(--accentlilac);
`
