import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components/macro'

import { OuterWrapper, InnerWrapper, HeadingOne } from '../styles/GlobalStyles'
import { StyledButton } from '../styles/ButtonStyles'
import loginImage from '../styles/images/login-image.png'

import { API_URL } from '../utils/utils'
import LoadingAnimation from '../components/LoadingAnimation'
import user from '../reducers/user'


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

const Login = () => {
	const [mode, setMode] = useState('login')
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const userId = useSelector((store) => store.user.userId)
	const accessToken = useSelector((store) => store.user.accessToken)

	const handleLoginSuccess = (data) => {
		if (mode === "register") {
			setMode("login")
		}
		batch(() => {
			dispatch(user.actions.setUserId(data.userId))
			dispatch(user.actions.setAccessToken(data.accessToken))
			dispatch(user.actions.setUserName(data.username))
			if (data.program.length > 0) {
				dispatch(user.actions.setProgram(data.program))
			} else {
				dispatch(user.actions.setProgram([]))
			}
			dispatch(user.actions.setError(null))
		})
	}

	const handleLoginFailure = (data) => {
		dispatch(user.actions.setError(data.response))
		dispatch(user.actions.setUserId(null))
		dispatch(user.actions.setAccessToken(null))
		dispatch(user.actions.setUserName(null))
		dispatch(user.actions.setProgram(null))
	}

	useEffect(() => {
		if (accessToken) {
			navigate('/mypage')
		}
	}, [accessToken, navigate, userId])

	let Schema = {}
	if (mode === 'register') {
		Schema = Yup.object().shape({
			username: Yup.string().required('Username is required'),
			password: Yup.string()
				.required('Password is required')
				.min(8, 'The password must contain at least 8 characters'),
			confirmPassword: Yup.string()
				.required('Please, confirm password')
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
			<InnerWrapper margin='5vh auto 2rem' tabletMargin="15vh auto 2rem" desktopMargin="15vh auto 2rem">

				<LoginContainer>
					<ImageGreetingWrapper>
						<StyledImage src={loginImage} />

						<TitleContainer>
							{mode === 'login' ? (
								<HeadingOne fontSize="1.4rem">Login and start moving!</HeadingOne>
							) : (
								<HeadingOne fontSize="1.4rem">Register for Flex 'n Joy!</HeadingOne>
							)}
							{mode === 'register' ? (
								<p>
									Flex 'n Joy gives you the opportunity to bring your workouts with you wherever you go, easily
									and effectively!
								</p>
							) : null}
						</TitleContainer>
					</ImageGreetingWrapper>

					<Formik
						initialValues={{ username: '', password: '', confirmPassword: '' }}
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
									handleLoginSuccess(data)
								})
								.catch((error) => {
									handleLoginFailure(error)
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

								<StyledInput label='Password' name='password' type='password' />
								{mode === 'register' ? (
									<StyledInput label='Confirm password' name='confirmPassword' type='password' />
								) : null}

								{mode === 'login' ? (
									<StyledButton
										background='var(--primary)'
										margin='1em 0 0'
										padding='6px 18px'
										boxShadow='0px 10px 13px -7px #808080'
										backgroundHover='var(--tertiary)'
										color='var(--white)'
										type='submit'
									>
										Login
									</StyledButton>
								) : (
									<StyledButton
										background='var(--primary)'
										margin='1em 0 0'
										padding='6px 18px'
										boxShadow='0px 10px 13px -7px #808080'
										backgroundHover='var(--tertiary)'
										color='var(--white)'
										type='submit'
									>
										Register
									</StyledButton>
								)}

								{mode === 'login' ? (
									<StyledButton
										background='transparent'
										margin='1em 0 0'
										padding='6px 18px'
										boxShadow='none'
										textDecorationHover='underline'
										type='button'
										onClick={() => setMode('register')}
									>
										Not a member yet? Register here
									</StyledButton>
								) : (
									<StyledButton
										background='transparent'
										margin='1em 0 0'
										padding='6px 18px'
										boxShadow='none'
										textDecorationHover='underline'
										type='button'
										onClick={() => setMode('login')}
									>
										Already a member? Login here
									</StyledButton>
								)}
							</StyledForm>
						)}
					</Formik>
				</LoginContainer>
			</InnerWrapper>
		</OuterWrapper>
	)
}

export default Login

const LoginContainer = styled.main`
	display: flex;
	flex-direction: column;

	@media screen and (min-width: 768px) {
		flex-direction: row-reverse;
		align-items: center;
		gap: 5rem;
	}
`

const ImageGreetingWrapper = styled.section`
	display: flex;
	flex-direction: column-reverse;
	align-items: center;
`

const StyledImage = styled.img`
	width: 300px;
	height: auto;
	margin: 1rem 0 0;

	@media screen and (min-width: 768px) {
		width: 400px;
		margin: 0;
	}

	@media screen and (min-width: 1024px) {
		width: 500px;
	}
`

const TitleContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	gap: 0.5rem;

	@media screen and (min-width: 768px) {
		width: 80%;
		gap: 1rem;
		margin: 0;
	}
`

const StyledForm = styled(Form)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: var(--secondary);
	padding: 2rem;
	border-radius: 6px;
	box-shadow: 0px 10px 13px 0px #808080;

	@media screen and (min-width: 1024px) {
		padding: 3rem;
	}
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

