import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import user from '../reducers/user'
import { HeadingOne } from '../styles/GlobalStyles'

const Header = () => {
	const userName = useSelector((store) => store.user.username)
	console.log("userName", userName)

	const date = new Date()
	let time = date.getHours()

	const showGreeting = () => {
		if (time>=6 && time<12) {
			return "Good morning"
		} else if (time>=12 && time<18) {
			return "Good afternoon"
		} else if (time>=18 && time<24) {
			return "Good evening"
		} else {
			return "Good night"
		}
	}


	return (
		<>
			<HeaderContainer>
				<HeadingOne>{showGreeting()} {userName}!</HeadingOne>
			</HeaderContainer>
		</>
	)
}

export default Header

const HeaderContainer = styled.header`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: var(--primary);
	border-bottom-left-radius: 200px;
	height: 20vh;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
`
