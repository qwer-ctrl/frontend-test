import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components/macro'

import user from '../reducers/user'

const SignOut = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const removeToken = () => {
		dispatch(user.actions.setAccessToken(null))
		navigate('/')
	}

	return <SignOutButton onClick={() => removeToken()}>Sign out </SignOutButton>
}

export default SignOut

const SignOutButton = styled.button`
	width: 150px;
	border-radius: 15px;
	background: var(--primary);
	font-family: 'poppins';
	text-transform: uppercase;
	border: none;
	padding: 6px 15px;
	margin-top: 1em;
	box-shadow: 0px 10px 13px -7px #808080; <-------change
	font-size: 0.5rem;

	&:hover {
		background: var(--accentgreen);
	}
`
