import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'

import homeIcon from '../styles/images/home-icon.png'
import userIcon from '../styles/images/user-icon.png'

const Footer = () => {
	return (
		<>
			<FooterContainer>
				<StyledActiveLink to='/mypage' activeClassName='selected'>
					<StyledImage src={homeIcon} />
				</StyledActiveLink>
				<StyledActiveLink to='/profilepage' activeClassName='selected'>
					<StyledUserImage src={userIcon} />
				</StyledActiveLink>

				{/* <NavLink to='/'>
					<StyledImage src={homeIcon} />
				</NavLink>
				<NavLink to='/profilepage'>
					<StyledUserImage src={userIcon} />
				</NavLink> */}
			</FooterContainer>
		</>
	)
}

export default Footer

const FooterContainer = styled.footer`
	display: flex;
	justify-content: space-around;
	align-items: center;
	//background-image: linear-gradient(to right bottom, #d6eae3, #dceeed, #e4f2f4, #edf5f9, #f6f9fc, #f6f9fc, #f6f9fc, #f6f9fc, #edf5f9, #e4f2f4, #dceeed, #d6eae3);	//  #e8e8e8;
	background: var(--background);
	cursor: pointer;
	margin-top: 12vh;
	height: 10vh;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	//box-shadow: 5px 0px 10px 0px #adadad;
	//box-shadow: 0px 0px 8px -1px #adadad;
`

const StyledImage = styled.img`
	width: 30px;
	height: 30px;
`

const StyledUserImage = styled.img`
	width: 30px;
	height: 30px;
`

const StyledActiveLink = styled(NavLink)`
	border-bottom: none;
	&.active {
		border-bottom: 1px solid #37767a;
	}
`
