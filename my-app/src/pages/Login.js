import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components/macro'

import LoadingAnimation from '../components/LoadingAnimation'
import { API_URL } from '../utils/utils'
import user from '../reducers/user'
import { OuterWrapper, InnerWrapper } from '../styles/GlobalStyles'
import Header from '../components/Header'
import Footer from '../components/Footer'
// import MyPage from './MyPage'

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

const Login = () => {
	const [mode, setMode] = useState('login')
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const accessToken = useSelector((store) => store.user.accessToken)

	const handleLoginSuccess = (data) => {
		batch(() => {
			dispatch(user.actions.setUserId(data.userId))
			dispatch(user.actions.setAccessToken(data.accessToken))
			dispatch(user.actions.setUserName(data.username))
			dispatch(user.actions.setProgram(data.program))
			dispatch(user.actions.setError(null))
		})
	}
	const handleLoginFailure = (data) => {
		batch(() => {
			dispatch(user.actions.setError(data.response))
			dispatch(user.actions.setUserId(null))
			dispatch(user.actions.setAccessToken(null))
			dispatch(user.actions.setUserName(null))
			dispatch(user.actions.setProgram(null))
		})
	}

	useEffect(() => {
		if (accessToken) {
			navigate('/')
		}
	}, [accessToken, navigate])

	let Schema = {}
	if (mode === 'register') {
		Schema = Yup.object().shape({
			username: Yup.string().required('Username is required'),
			password: Yup.string()
				.required('Password is required')
				.min(8, 'The password must contain at least 8 characters'),
			confirmPassword: Yup.string()
				.required('Please, fill in your password again')
				.oneOf([Yup.ref('password'), null], 'Passwords must match'),
		})
	} else if (mode === 'login') {
		Schema = Yup.object().shape({
			username: Yup.string().required('Username is required'),
			password: Yup.string()
				.required('Password is required')
				.min(8, 'The password must contain at least 8 characters'),
		})
	}

	return (
		<OuterWrapper>
			<Header />
			<InnerWrapper>
				{/* <StyledLoginSection>
                    <StyledLoginWrapper> */}
				{mode === 'login' ? <StyledTitle>Login here</StyledTitle> : <StyledTitle>Register here</StyledTitle>}

				<Formik
					initialValues={{ username: '', password: '', confirmPassword: '', email: '' }}
					validationSchema={Schema}
					onSubmit={(values, { setSubmitting, resetForm }) => {
						fetch(API_URL(mode), {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({ username: values.username, password: values.password }),
						})
							.then((res) => res.json())
							.then((data) => {
								console.log(data)
								handleLoginSuccess(data)
								setMode('login')
							})
							.catch((err) => {
								handleLoginFailure(err)
							})
							.finally(() => {
								setSubmitting(false)
								resetForm()
							})
					}}
				>
					{({ isSubmitting }) => (
						<StyledForm>
							{isSubmitting && <LoadingAnimation />}

							<StyledInput label='Username' name='username' type='text' />

							{/* <StyledInput
                                    label="Email address"
                                    name="email"
                                    type="email" 
                                    /> */}

							<StyledInput label='Password' name='password' type='password' />

							{mode === 'register' ? (
								<StyledInput label='Confirm password' name='confirmPassword' type='password' />
							) : null}

							{mode === 'login' ? (
								<StyledButton type='submit'>Login</StyledButton>
							) : (
								<StyledButton type='submit'>Register</StyledButton>
							)}

							{mode === 'login' ? (
								<StyledButton type='button' onClick={() => setMode('register')}>
									Not a member yet? Register here
								</StyledButton>
							) : (
								<StyledButton type='button' onClick={() => setMode('login')}>
									Already a member? Login here
								</StyledButton>
							)}
						</StyledForm>
					)}
				</Formik>
				{/* </StyledLoginWrapper>
                </StyledLoginSection> */}
			</InnerWrapper>
			<Footer />
		</OuterWrapper>
	)
}

export default Login


const StyledTitle = styled.h1``

const StyledForm = styled(Form)``

const StyledInput = styled(MyTextInput)``

const StyledError = styled.div``

const StyledButton = styled.button``
