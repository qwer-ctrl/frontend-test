import React from 'react'
import styled from 'styled-components/macro'

const Footer = () => {
	return (
		<>
			<FooterContainer>
				<p>👤</p>
				<p>🕒</p>
				<p>⚙️</p>
			</FooterContainer>
		</>
	)
}

export default Footer

const FooterContainer = styled.footer`
	display: flex;
	justify-content: space-around;
	align-items: center;
	background-color: #e8e8e8;
	cursor: pointer;
	// margin-top: auto;
	height: 80px;
	// position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
`
