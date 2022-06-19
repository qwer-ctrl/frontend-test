import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { program } from '../reducers/program'
import styled from 'styled-components/macro'
import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'

import { ModalContainer, StyledModal, CloseButton } from '../styles/ModalStyles'
import { StyledButton } from '../styles/ButtonStyles'
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

const ProgramModal = ({ showModal, setShowModal }) => {
	//refactor to use store instead of sending props to MyPage..
	const [programId, setProgramId] = useState('')
	console.log(programId)
	const userId = useSelector((store) => store.user.userId)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const closeModal = () => {
		setShowModal((prev) => !prev)
	}

	const handleData = (data) => {
		dispatch(program.actions.setProgramName(data.response.programName))
		dispatch(program.actions.setProgramType(data.response.programType))
		dispatch(program.actions.setProgramId(data.response._id))
		dispatch(program.actions.setProgramName(data.response.exercise))
		setProgramId(data.response._id)
		console.log('hello', data.response._id)
		navigate(`/addprogram/${data.response._id}`) //<---------------------change?
	}

	const Schema = Yup.object().shape({
		programName: Yup.string()
			.required('Program name is required')
			.min(5, 'The name must contain minimum 5 characters')
			.max(20, 'The name can contain maximum 20 letters'),
		programType: Yup.string().required('You have to choose a program type'),
	})

	return (
		<>
			{showModal ? (
				<ModalContainer showModal={showModal}>
					<StyledModal>
						<CloseButton onClick={closeModal}>x</CloseButton>
						<Formik
							initialValues={{
								programName: '',
								programType: '',
							}}
							validationSchema={Schema}
							onSubmit={(values, { setSubmitting, resetForm }) => {
								fetch(API_URL(`program/${userId}`), {
									method: 'POST',
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
										console.log("data from program modal post", data)
										handleData(data)
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
									<StyledInput label='Program name' name='programName' type='text' width="" />

									<MyCheckbox label='Weights' name='programType' value='weights' />

									<MyCheckbox label='Cardio' name='programType' value='cardio' />

									<StyledButton
									background="var(--primary)"
									margin="1em 0 0"
									padding="6px 18px"
									boxShadow="0px 10px 13px -7px #808080"
									fontSize="10px"
									type='submit'>Add program</StyledButton>
								</StyledForm>
							)}
						</Formik>
					</StyledModal>
				</ModalContainer>
			) : null}
		</>
	)
}

export default ProgramModal

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
	box-shadow: inset 0px 4px 4px 0px #ADADAd;
`

const StyledError = styled.div``
