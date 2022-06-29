import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'
// import  { keyframes } from 'styled-components'

import SignOut from './SignOut'
import { HeadingOne } from '../styles/GlobalStyles'
// import DumbelImg from '../styles/images/dumbel.png'

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
					fontSize="1.5rem" 
					margin="2rem 0 1rem" 
					textAlign="left" 
					width="85%" 
					padding="0 0 0 2rem" 
					desktopFontSize="1.8rem" 
					tabletPadding="0 0 0"
					tabletMargin="4rem 0 1rem"
					desktopMargin="4rem 0 1rem"
					>
						Flex 'n Joy
				</HeadingOne>
				{/* <AnimatedImg src={DumbelImg} alt='dumbel' /> */}
				<SignOut />
				<HeaderBox>
					<HeadingOne
						fontSize='0.9rem'
						width='100%'
						color='#202020'
						textTransform='uppercase'
						desktopWidth='300px'
						desktopFontSize='1.2rem'
						textShadow='2px 3px 2px #a0c1af'
					>
						{showGreeting()}
						<StyledHeader>{userName}</StyledHeader>
					</HeadingOne>
				</HeaderBox>
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
	// text-align: left;
	// background: var(--background);
	height: 22vh;
	// height: 15vh;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 2;

	@media screen and (min-width: 768px) {
		height: 20vh;
	}
`

const HeaderBox = styled.div`
	background: var(--background);
	width: 80%;
	border-radius: 10px;
	padding: 0.5rem 0 0.5rem 1rem;
	text-align: left;

	@media screen and (min-width: 768px) {
		margin-top: 0.5rem;
		width: 85%;
	}
`

const StyledHeader = styled.p`
	//font-family: 'Special Elite', cursive;
	line-height: 35px;
	color: #303030;
`

// const bounce = keyframes`
// 0% {
// 	transform: scale(1, 1) translateY(0);
// }
// 10% {
// 	transform: scale(1.1, 0.9) translateY(0);
// }
// 30% {
// 	transform: scale(0.9, 1.1) translateY(-10px);
// }
// 50% {
// 	transform: scale(1, 1) translateY(0);
// }
// 100% {
// 	transform: scale(0.7, 1, 1) translateY(-5px);
// }
// `

// const AnimatedImg = styled.img`
// 	@media screen and (min-width: 768px) {
// 		animation: ${bounce} linear 1.5s 2;
// 	}
// `
