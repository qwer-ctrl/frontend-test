import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { HeadingOne } from '../styles/GlobalStyles'

import NavBar from './NavBar'

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
		<HeaderContainer>
			<NavBar />

			<GreetingBox>
				<HeadingOne
					fontSize='0.9rem'
					width='100%'
					color='#202020'
					textTransform='uppercase'
					desktopWidth='300px'
					desktopFontSize='1.2rem'
					textShadow='2px 3px 2px #a0c1af'
					fontWeight='500'
				>
					{showGreeting()}
					<StyledHeader>{userName}</StyledHeader>
				</HeadingOne>
			</GreetingBox>
		</HeaderContainer>
	)
}

export default Header

const HeaderContainer = styled.header`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	height: 22vh;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 2;
	background: var(--white);
	padding-bottom: 1rem;

	@media screen and (min-width: 768px) {
		height: 20vh;
	}

	@media screen and (min-width: 1024px) {
		height: 25vh;
		max-width: 900px;
		margin: auto;
	}
`

const GreetingBox = styled.div`
	background: var(--background);
	width: 80%;
	border-radius: 10px;
	padding: 0.5rem 0 0.5rem 1rem;
	text-align: left;
	margin-bottom: 0.5rem;

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
