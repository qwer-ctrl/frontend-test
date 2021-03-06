import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components/macro'
import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'

import { StyledModal, ModalContainer, CloseButton } from '../styles/ModalStyles'
import { StyledButton } from '../styles/ButtonStyles'

import { program } from '../reducers/program'
import ui from '../reducers/ui'
import { API_URL } from '../utils/utils'


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
				setExerciseContent(data.response)
			})
	}, [programId])

	const handleData = (data) => {
		dispatch(program.actions.setProgramName(data.response.programName))
		dispatch(program.actions.setProgramType(data.response.programType))
		dispatch(program.actions.setProgramId(data.response._id))
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
					<StyledModal margin="20px auto">
						<CloseButton onClick={closeModal}><StyledSpan>x</StyledSpan></CloseButton>
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
									<StyledInput
										label='Program name'
										name='programName'
										type='text'
										placeholder={exerciseContent.programName}
									/>

								<CheckboxContainer>
									<StyledCheckbox label='Weights' name='programType' value='weights' />

									<StyledCheckbox label='Cardio' name='programType' value='cardio' />
								</CheckboxContainer>

									<StyledButton
										background='var(--primary)'
										margin='1.5rem 0 0'
										padding='6px 18px'
										boxShadow='0px 10px 13px -7px #808080'
										backgroundHover='var(--tertiary)'
										colorHover='var(--secondary)'
										type='submit'
									>
										Update program
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

export default UpdateProgramModal

const StyledSpan = styled.span`
	color: var(--black);
`

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
	-webkit-appearance: none;
	-moz-appearance: none;
	box-shadow: inset 0px 4px 4px 0px #adadad;

	&:focus {
		outline: none;
		border: 2px solid var(--primary);
	}
`

const CheckboxContainer = styled.div`
	display: flex;
	gap: 1em;
	margin-top: 1rem;
`

const StyledCheckbox = styled(MyCheckbox)`
	margin: 3px;
	accent-color: var(--tertiary);

	&:hover,
	&:focus {
		outline: 2px solid var(--primary);
	}
`

const StyledError = styled.div`
	margin-bottom: 1.5rem;
	text-align: center;
	color: var(--accentlilac);
`
