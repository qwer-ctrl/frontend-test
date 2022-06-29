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
	width: 35px;
	height: 35px;
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
	top: 6%;
	right: 9%;
	color: var(--black);
	font-weight: bold;

	&:hover,
	&:focus {
		outline: none;
		background: var(--accentlilac);
	}

	@media screen and (min-width: 768px) {
		top: 16%;
		right: 7%;
	}

	@media screen and (min-width: 1024px) {
		top: 15%;
		right: 7%;
		width: 40px;
		height: 40px;
	}	
`

const StyledImage = styled.img` 
	width: 25px;
	height: 25px;
`
