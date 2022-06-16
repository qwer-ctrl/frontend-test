import styled from 'styled-components/macro'
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
		--primary: #6EB3B8;
		--secondary: #D6EAE3;
		--white: #FFFFFF;
		--black: #202020;
		--gray: #F4F4F4;
		padding: 0; 
		margin: 0;
   	box-sizing: border-box;
		font-family: 'Jost', sans-serif;
  	-webkit-font-smoothing: antialiased;
  	-moz-osx-font-smoothing: grayscale;
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
	margin: 25vh auto 4rem;
`

export const HeadingOne = styled.h1`
	font-family: 'Poppins', sans-serif;
`
