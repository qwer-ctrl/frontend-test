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
	// background-image: linear-gradient(
	// 	to left bottom,
	// 	#9de9a4,
	// 	#8de2b0,
	// 	#84daba,
	// 	#81d1bf,
	// 	#84c7c1,
	// 	#84c8c4,
	// 	#84c8c8,
	// 	#85c9cb,
	// 	#7ed5d6,
	// 	#75e2e0,
	// 	#6beee9,
	// 	#5ffbf1
	// );
	// background-image: linear-gradient(
	// 	to right top,
	// 	#d6eae3,
	// 	#c8e1da,
	// 	#bad7d2,
	// 	#adcecb,
	// 	#9fc5c4,
	// 	#97c6c6,
	// 	#8ec8c8,
	// 	#85c9cb,
	// 	#7ed5d6,
	// 	#75e2e0,
	// 	#6beee9,
	// 	#5ffbf1
	// );
	background: var(--background);
	// #f0f7f5;
	// border-bottom-left-radius: 70px;
	// box-shadow: 0px 10px 13px -7px #808080;
	//box-shadow: 3px -8px 12px 4px #606060;
	//box-shadow: 0px 0px 8px -1px #adadad;
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
