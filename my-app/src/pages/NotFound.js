import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components/macro'

import { OuterWrapper, InnerWrapper, HeadingOne } from '../styles/GlobalStyles'
import { StyledButton } from '../styles/ButtonStyles'
import errorImage from "../styles/images/error-image.png"

const NotFound = () => {
	const navigate = useNavigate()

	const handleGoBack = () => {
		navigate('/')
	}

	return (
		<OuterWrapper>
			<InnerWrapper margin="20vh auto 0">
				<NotFoundWrapper>
					<StyledImage src={errorImage} />
					<HeadingOne fontSize="1rem" color="#8DB9BC" desktopFontSize="2rem">Sorry, could not find the page you were looking for, but keep calm and head back</HeadingOne>
				</NotFoundWrapper>
				<StyledButton
					background="var(--primary)"
					margin="2rem 0 0"
					padding="6px 18px"
					boxShadow="0px 10px 13px -7px #808080"
					backgroundHover='var(--tertiary)'
					color='var(--white)'
					onClick={() => handleGoBack()}>Go Back</StyledButton>
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
	gap: 2rem;

	@media screen and (min-width: 1024px) {
		flex-direction: row;
	}
`

const StyledImage = styled.img`
	width: 300px;
	height: auto;

	@media screen and (min-width: 768px) {
		width: 400px;
		height: 300px;
	}
`