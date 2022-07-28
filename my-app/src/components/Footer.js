import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'

import homeImage from '../styles/images/home.png'
import profileImage from '../styles/images/profile-icon.png'

const Footer = () => {
	return (
		<>
			<FooterContainer>
				<StyledActiveLink to='/mypage' activeclassname='selected'>
					<StyledImage src={homeImage} />
				</StyledActiveLink>
				<StyledActiveLink to='/profilepage' activeclassname='selected'>
					<StyledImage src={profileImage} />
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
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom: none;

	@media screen and (min-width: 768px) {
		display: none;

		&:hover {
			outline: none;
			background: var(--accentlilac);
		}
	}

	&.active:after {
		display: block;
		background: var(--tertiary);
		content: '';
		height: 2px;
		width: 30px;
		position: absolute;
		bottom: 0.15rem;
	}

	&:focus {
		outline: none;
		background: var(--accentlilac);
	}
`
