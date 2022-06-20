import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'

import clockImage from "../styles/images/clock-two.png"
import userIcon from "../styles/images/user-icon.png"

const Footer = () => {
	return (
		<>
			<FooterContainer>
				<StyledImage src={clockImage} />
				<NavLink to='/profilepage'><StyledUserImage src={userIcon} /></NavLink>
			</FooterContainer>
		</>
	)
}

export default Footer

const FooterContainer = styled.footer`
	display: flex;
	justify-content: space-around;
	align-items: center;
	background-color: #D6EAE3;
	//  #e8e8e8;
	cursor: pointer;
	margin-top: 12vh;
	height: 9vh;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
`

const StyledImage = styled.img`
	width: 50px;
	height: 50px;
`

const StyledUserImage = styled.img`
	width: 60px;
	height: 60px;
`
