import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'

import homeImage from '../styles/images/home-image.png'
import userImage from '../styles/images/profile-image.png'
// import homeIcon from '../styles/images/home-icon.png'
// import userIcon from '../styles/images/user-icon.png'

const Footer = () => {
	return (
		<>
			<FooterContainer>
				<StyledActiveLink to='/mypage' activeclassname='selected'>
					<StyledImage src={homeImage} />
				</StyledActiveLink>
				<StyledActiveLink to='/profilepage' activeclassname='selected'>
					<StyledImage src={userImage} />
				</StyledActiveLink>
			</FooterContainer>
		</>
	)
}

export default Footer

const FooterContainer = styled.footer`
	display: flex;
	justify-content: space-around;
	align-items: center;
	background: var(--background);
	cursor: pointer;
	margin-top: 12vh;
	height: 10vh;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
`

const StyledImage = styled.img`
	width: 40px;
	height: 40px;
`

const StyledActiveLink = styled(NavLink)`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background: transparent;
	background: var(--secondary);
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom: none;

	&.active:after {
		display: block;
		background: var(--black);
		content: '';
		height: 2px;
		width: 30px;
		position: absolute;
		bottom: 0.5em;
	}

	&:hover,
	&:focus {
		outline: none;
		background: var(--accentlilac);
	}
`
