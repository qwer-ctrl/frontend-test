import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components/macro'

import user from '../reducers/user'
import signOutIcon from "../styles/images/sign-out.png"
import signOutHoverIcon from "../styles/images/sign-out-hover.png"

const SignOut = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const removeToken = () => {
		dispatch(user.actions.setAccessToken(null))
		navigate('/')
	}

	return (
		<>
			<SignOutButton onClick={() => removeToken()}><StyledImage src={signOutIcon} /></SignOutButton>
		</>
	)
}

export default SignOut

// const ButtonContainer = styled.div`
// 	position: relative;
// `

const SignOutButton = styled.button`
	width: 60px;
	border-radius: 15px;
	background: transparent;
	font-family: 'poppins';
	text-transform: uppercase;
	border: none;
	padding: 6px 15px;
	margin-top: 1em;
	// box-shadow: 0px 10px 13px -7px #808080; <-------change
	font-size: 0.5rem;
	position: absolute;
	top: 10px;
	right: 10px;
	color: var(--black);
	font-weight: bold;

	&:hover,
	&:focus {
		filter: invert(100%);
		outline: none;
	}
`

const StyledImage = styled.img` 
	width: 35px;
	height: 35px;
`
