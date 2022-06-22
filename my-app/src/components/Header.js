import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import SignOut from './SignOut'
import { HeadingOne } from '../styles/GlobalStyles'

const Header = () => {
	const userName = useSelector((store) => store.user.username)

	const date = new Date()
	let time = date.getHours()

	const showGreeting = () => {
		if (time >= 6 && time < 12) {
			return 'Good morning'
		} else if (time >= 12 && time < 18) {
			return 'Good afternoon'
		} else if (time >= 18 && time < 24) {
			return 'Good evening'
		} else {
			return 'Good night'
		}
	}

	return (
		<>
			<HeaderContainer>
				<HeadingOne
					fontSize='1.5rem'
					width='70%'
					color='#202020'
					textTransform='uppercase'
					margin='0 0 0 0'
					desktopWidth='300px'
				>
					{showGreeting()}
					<StyledHeader>{userName}</StyledHeader>
				</HeadingOne>
				<SignOut />
			</HeaderContainer>
		</>
	)
}

export default Header

const HeaderContainer = styled.header`
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	background: var(--background);
	// height: 17vh;
	height: 15vh;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;

	@media screen and (min-width: 768px) {
		height: 20vh;
	}
`
const StyledHeader = styled.p`
	//font-family: 'Special Elite', cursive;
	line-height: 50px;
	color: #303030;
`
