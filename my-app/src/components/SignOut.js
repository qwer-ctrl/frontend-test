import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components/macro'

import user from '../reducers/user'
import logOffIcon from "../styles/images/log-off.png"

const SignOut = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const removeToken = () => {
		dispatch(user.actions.setAccessToken(null))
		navigate('/')
	}

	return (
		<>
			<SignOutButton onClick={() => removeToken()}><StyledImage src={logOffIcon} /></SignOutButton>
		</>
	)
}

export default SignOut

const SignOutButton = styled.button`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background: var(--primary);
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: 'poppins';
	text-transform: uppercase;
	border: none;
	// padding: 6px 15px;
	margin-top: 1em;
	// box-shadow: 0px 10px 13px -7px #808080; <-------change
	font-size: 0.5rem;
	position: absolute;
	top: 10px;
	right: 20px;
	color: var(--black);
	font-weight: bold;

	&:hover,
	&:focus {
		outline: none;
		background: var(--accentlilac);
	}
`

const StyledImage = styled.img` 
	width: 25px;
	height: 25px;
`
