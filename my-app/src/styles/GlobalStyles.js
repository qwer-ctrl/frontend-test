import styled from 'styled-components/macro'
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
		--primary: #8DB9BC;
		//  #6EB3B8;
		--secondary: #D6EAE3;
		--accentlilac: #a486fe;
		--accentgreen: #9de9a4;
		--white: #FFFFFF;
		--black: #202020;
		--grey: #F4F4F4;
		padding: 0; 
		margin: 0;
   		box-sizing: border-box;
		font-family: 'Jost', sans-serif;
  		-webkit-font-smoothing: antialiased;
  		-moz-osx-font-smoothing: greyscale;
  }
`

export const OuterWrapper = styled.main`
	width: 100%;
	height: 100vh;
	overflow-y: scroll;
	position: relative;
`

export const InnerWrapper = styled.section`
	width: 80%;
	margin: ${props => props.margin};
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	

	@media screen and (min-width: 768px) {
		width: 60%;
	}
`

export const HeadingOne = styled.h1`
	font-family: 'Poppins', sans-serif;
	font-size: ${props => props.fontSize};
	color: ${props => props.color};
	width: ${props => props.width};
	text-transform: ${props => props.textTransform};
	padding: ${props => props.padding};
	margin: ${props => props.margin};
	text-align: ${props => props.textAlign};
`


