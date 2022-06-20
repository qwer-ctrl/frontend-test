import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components/macro'
import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'

import { program } from '../reducers/program'
import ui from '../reducers/ui'
import { API_URL } from '../utils/utils'
import { StyledModal, ModalContainer, CloseButton } from '../styles/ModalStyles'
import { StyledButton } from '../styles/ButtonStyles'

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

const MyCheckbox = ({ label, ...props }) => {
	const [field, meta] = useField({ ...props, type: 'radio' })
	return (
		<>
			<label htmlFor={props.id || props.name}>{label}</label>
			<input className='radio-input' {...field} {...props} type='radio' />

			{meta.touched && meta.error ? <StyledError className='error'>{meta.error}</StyledError> : null}
		</>
	)
}

const UpdateProgramModal = () => {
	const [exerciseContent, setExerciseContent] = useState('')
	const showModal = useSelector((store) => store.ui.showUpdateProgramModal)
	const programId = useSelector((store) => store.ui.currentAddExerciseModalId)
	const dispatch = useDispatch()

	const closeModal = () => {
		dispatch(ui.actions.setShowUpdateProgramModal(false))
	}


	useEffect(() => {
		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}

		fetch(API_URL(`myprogram/${programId}`), options)
			.then((res) => res.json())
			.then((data) => {
				// dispatch(ui.actions.setLoading(true))
				setExerciseContent(data.response)
			})
		// .finally(() => dispatch(ui.actions.setLoading(false)))
	}, [programId])



	const handleData = (data) => {
		dispatch(program.actions.setProgramName(data.response.programName))
		dispatch(program.actions.setProgramType(data.response.programType))
		dispatch(program.actions.setProgramId(data.response._id))
		console.log('hello', data.response._id)
	}

	const Schema = Yup.object().shape({
		programName: Yup.string()
			.max(20, 'The name can contain maximum 20 letters'),
		programType: Yup.string(),
	})

	return (
		<>
			{showModal ? (
				<ModalContainer>
					<StyledModal>
						<CloseButton onClick={closeModal}>x</CloseButton>
						<Formik
							initialValues={{
								programName: exerciseContent.programName,
								programType: exerciseContent.programType,
							}}
							validationSchema={Schema}
							onSubmit={(values, { setSubmitting, resetForm }) => {
								fetch(API_URL(`updateprogram/${programId}`), {
									method: 'PATCH',
									headers: {
										'Content-Type': 'application/json',
									},
									body: JSON.stringify({
										programName: values.programName,
										programType: values.programType,
									}),
								})
									.then((res) => res.json())
									.then((data) => {
										console.log("data from update program modal post", data)
										handleData(data)
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
									<StyledInput label='Program name' name='programName' type='text' placeholder={exerciseContent.programName} />

									<MyCheckbox label='Weights' name='programType' value='weights' />

									<MyCheckbox label='Cardio' name='programType' value='cardio' />

									<StyledButton
									background="var(--primary)"
									margin="1em 0 0"
									padding="6px 18px"
									boxShadow="0px 10px 13px -7px #808080"
									fontSize="10px"
									type='submit'>Update program</StyledButton>
								</StyledForm>
							)}
						</Formik>
					</StyledModal>
				</ModalContainer>
			) : null}
		</>
	)
}

export default UpdateProgramModal


const StyledForm = styled(Form)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 1rem 0;
`

const StyledInput = styled(MyTextInput)`
	max-width: 150px;
	margin: 0.5rem 0;
	text-align: center;
	border: none;
	border-radius: 10px;
	padding: 6px 10px;
	box-shadow: inset 0px 4px 4px 0px #adadad;
`

const StyledError = styled.div`
	margin-bottom: 1.5rem;
	text-align: center;
	color: var(--accentlilac);
`