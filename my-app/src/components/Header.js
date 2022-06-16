import React from 'react'
import styled from 'styled-components/macro'
import { HeadingOne } from '../styles/GlobalStyles'

const Header = () => {
	return (
		<>
			<HeaderContainer>
				<HeadingOne>I'm a header!</HeadingOne>
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
