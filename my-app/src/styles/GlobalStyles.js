import styled from 'styled-components/macro'
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
		--primary: #8DB9BC;
		--secondary: #D6EAE3;
		--tertiary: #37767A;
		--background: #e4f1ed;
		--accentlilac: #D1C2FE;
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
	margin: ${(props) => props.margin};
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	@media screen and (min-width: 1024px) {
		width: 70%;
		margin: ${(props) => props.desktopMargin};
	}
`

export const HeadingOne = styled.h1`
	font-family: 'Poppins', sans-serif;
	font-size: ${(props) => props.fontSize};
	color: ${(props) => props.color};
	width: ${(props) => props.width};
	text-transform: ${(props) => props.textTransform};
	padding: ${(props) => props.padding};
	margin: ${(props) => props.margin};
	text-align: ${(props) => props.textAlign};
	text-shadow: ${(props) => props.textShadow};
	letter-spacing: 1.7px;
	font-weight: ${props => props.fontWeight};

	@media screen and (min-width: 768px) {
		font-size: ${(props) => props.tabletFontSize};
		padding: ${props => props.tabletPadding};
	}

	@media screen and (min-width: 1024px) {
		width: ${(props) => props.desktopWidth};
		font-size: ${(props) => props.desktopFontSize};
		padding: ${props => props.desktopPadding};
		margin: ${props => props.desktopMargin};
	}
`
