import React from 'react'
import { useNavigate } from 'react-router-dom'

import { OuterWrapper } from '../styles/GlobalStyles'
import { InnerWrapper } from '../styles/GlobalStyles'
import { StyledButton } from '../styles/ButtonStyles'

const NotFound = () => {
	const navigate = useNavigate()

	const handleGoBack = () => {
		navigate('/')
	}

	return (
		<OuterWrapper>
			<InnerWrapper margin="0 auto">
				<h1>Not found..</h1>
				<StyledButton
				background="var(--primary)"
				margin="1em 0 0"
				padding="6px 18px"
				boxShadow="0px 10px 13px -7px #808080"
				backgroundHover="var(--accentgreen)"
				fontSize="10px" 
				onClick={() => handleGoBack()}>Go Back</StyledButton>
			</InnerWrapper>
		</OuterWrapper>
	)
}

export default NotFound
