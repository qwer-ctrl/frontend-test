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

	return <StyledButton onClick={() => removeToken()}>Sign out </StyledButton>
}

export default SignOut

const StyledButton = styled.button`
	width: 150px;
	padding: 5px;
	margin: 5px;
`
