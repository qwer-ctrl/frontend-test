import styled from 'styled-components/macro'

export const StyledButton = styled.button`
	color: var(--black);
	width: ${(props) => props.width};
	border-radius: 35px;
	background: ${(props) => props.background};
	font-family: 'poppins';
	text-transform: uppercase;
	border: none;
	padding: ${(props) => props.padding};
	margin: ${(props) => props.margin};
	box-shadow: ${(props) => props.boxShadow};
	font-size: 0.7rem;
	// font-size: ${(props) => props.fontSize};
	// font-weight: bold;

	&:hover,
	&:focus {
		background: ${(props) => props.backgroundHover};
		text-decoration: ${(props) => props.textDecoration};
		color: ${(props) => props.color};
		outline: none;
	}
`

export const TimerButton = styled.button`
padding: 5px 10px;
width: 30px;
height: 30px;
border: none;
border-radius: 50%;
box-shadow: 0px 10px 13px -7px #808080;

&:hover,
&:focus {
	background: var(--tertiary);
	text-decoration: none;
	color: var(--white);
	outline: none;
}
`
