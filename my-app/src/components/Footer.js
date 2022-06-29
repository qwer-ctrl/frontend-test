import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'

import homeIcon from '../styles/images/home-icon.png'
import userIcon from '../styles/images/user-icon.png'

const Footer = () => {
	return (
		<>
			<FooterContainer>
				<StyledActiveLink to='/mypage' activeclassname='selected'>
					<StyledImage src={homeIcon} />
				</StyledActiveLink>
				<StyledActiveLink to='/profilepage' activeclassname='selected'>
					<StyledImage src={userIcon} />
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
	width: 20px;
	height: 20px;
`


const StyledActiveLink = styled(NavLink)`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background: var(--primary);
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom: none;
	// border: 2px solid var(--tertiary);
	&.active {
		border-bottom: 1px solid var(--tertiary);
	}

	&:hover,
	&:focus {
		outline: none;
		background: var(--accentlilac);
	}
`
