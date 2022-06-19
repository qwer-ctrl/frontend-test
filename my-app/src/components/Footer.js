import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'

import clockImage from "../styles/images/clock-two.png"

const Footer = () => {
	return (
		<>
			<FooterContainer>
				<NavLink to='/mypage/:userId'>👤</NavLink>
				<StyledImage src={clockImage} />
			</FooterContainer>
		</>
	)
}

export default Footer

const FooterContainer = styled.footer`
	display: flex;
	justify-content: space-around;
	align-items: center;
	background-color: #e8e8e8;
	cursor: pointer;
	margin-top: 12vh;
	height: 8vh;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
`

const StyledImage = styled.img`
	width: 50px;
	height: 50px;
`
