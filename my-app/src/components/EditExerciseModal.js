import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'

import { program } from '../reducers/program'
import { exercise } from '../reducers/exercise'
import styled from 'styled-components/macro'
import ui from '../reducers/ui'
// import user from "../reducers/user"
import { API_URL } from '../utils/utils'
// import SingleProgram from "../pages/SingleProgram"
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

const EditExerciseModal = () => {
	//refactor to use store instead for sending props to MyPage..
	// const [programName, setProgramName] = useState('')
	// const [programType, setProgramType] = useState('')
	const [exerciseContent, setExerciseContent] = useState('')
	const exerciseId = useSelector((store) => store.ui.currentEditModalId)
	const showModal = useSelector((store) => store.ui.showEditModal)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const closeModal = () => {
		dispatch(ui.actions.setShowEditModal(false))
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
				// dispatch(ui.actions.setLoading(true))
				setExerciseContent(data.response)
			})
		// .finally(() => dispatch(ui.actions.setLoading(false)))
	}, [exerciseId])

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
						<CloseButton onClick={closeModal}>x</CloseButton>
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
									<h1>{exerciseContent.exercise}</h1>
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
									<StyledButton type='submit'>Update exercise</StyledButton>
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

const ModalContainer = styled.div`
  position: fixed;
  z-index: 1
  margin-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: rgb(0,0,0,0.2); // <-------------- change
  `

const StyledForm = styled(Form)`
	display: flex;
	flex-direction: column;
`

const StyledInput = styled(MyTextInput)`
	max-width: 200px;
	margin: 5px 0 5px;
`

const StyledModal = styled.div`
	background: white;
	margin: auto;
	padding: 20px;
	border: 1px solid #888;
	width: 80%;
`
const StyledError = styled.div``

const StyledButton = styled.button``

const CloseButton = styled.button``