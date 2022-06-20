import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components/macro'

import { OuterWrapper, InnerWrapper, HeadingOne } from '../styles/GlobalStyles'
import { StyledButton } from '../styles/ButtonStyles'
// import notFoundImage from "../styles/images/not-found.png"
// import errorOne from "../styles/images/error-one.png"
import errorTwo from "../styles/images/error-two.png"

const NotFound = () => {
	const navigate = useNavigate()

	const handleGoBack = () => {
		navigate('/')
	}

	return (
		<OuterWrapper>
			<InnerWrapper margin="10vh auto 0">
				<NotFoundWrapper>
					<StyledImage src={errorTwo} />
					<HeadingOne fontSize="2rem" color="#8DB9BC">Sorry, couldn't find the page you were looking for</HeadingOne>
					<StyledButton
					background="var(--primary)"
					margin="1em 0 0"
					padding="6px 18px"
					boxShadow="0px 10px 13px -7px #808080"
					backgroundHover="var(--accentgreen)"
					fontSize="10px" 
					onClick={() => handleGoBack()}>Go Back</StyledButton>
				</NotFoundWrapper>
			</InnerWrapper>
		</OuterWrapper>
	)
}

export default NotFound

const NotFoundWrapper = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	gap: 1rem;

	@media screen and (min-width: 1024px) {
		flex-direction: row;
	}
`

const StyledImage = styled.img`
	width: 300px;
	height: 200px;

	@media screen and (min-width: 768px) {
		width: 500px;
		height: 400px;
	}
`