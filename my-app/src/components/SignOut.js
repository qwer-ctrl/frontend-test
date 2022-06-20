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

	return (
		<>
			<SignOutButton onClick={() => removeToken()}>Sign out </SignOutButton>
		</>
	)
}

export default SignOut

// const ButtonContainer = styled.div`
// 	position: relative;
// `

const SignOutButton = styled.button`
	width: 100px;
	border-radius: 15px;
	background: var(--secondary);
	font-family: 'poppins';
	text-transform: uppercase;
	border: none;
	padding: 6px 15px;
	margin-top: 1em;
	box-shadow: 0px 10px 13px -7px #808080; <-------change
	font-size: 0.5rem;
	position: absolute;
	top: 10px;
	right: 10px;
	color: var(--black);
	font-weight: bold;

	&:hover {
		background: var(--accentgreen);
	}
`
