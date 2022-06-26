import React from 'react'
import { useSelector } from 'react-redux'
import styled, { keyframes } from 'styled-components/macro'

import SignOut from './SignOut'
import { HeadingOne } from '../styles/GlobalStyles'
import DumbelImg from '../styles/images/dumbel.png'

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
				<AnimatedImg src={DumbelImg} alt='dumbel' />
				<HeadingOne
					fontSize='1.5rem'
					width='70%'
					color='#202020'
					textTransform='uppercase'
					// margin='1rem 0 0 0'
					desktopWidth='300px'
					desktopFontSize='2rem'
					textShadow='2px 3px 2px #a0c1af'
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
	flex-direction: column;
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
	line-height: 40px;
	color: #303030;
`

const bounce = keyframes`
0% {
	transform: scale(1, 1) translateY(0);
}
10% {
	transform: scale(1.1, 0.9) translateY(0);
}
30% {
	transform: scale(0.9, 1.1) translateY(-10px);
}
50% {
	transform: scale(1, 1) translateY(0);
}
100% {
	transform: scale(0.7, 1, 1) translateY(-5px);
}
`

const AnimatedImg = styled.img`
	animation: ${bounce} linear 1.5s 2;
`
