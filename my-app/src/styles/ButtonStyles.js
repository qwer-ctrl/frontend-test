import styled from 'styled-components/macro'

export const StyledButton = styled.button`
	color: var(--black);
	width: ${(props) => props.width};
	border-radius: 20px;
	// border-radius: 35px;
	background: ${(props) => props.background};
	font-family: 'poppins';
	text-transform: uppercase;
	border: none;
	padding: ${(props) => props.padding};
	margin: ${(props) => props.margin};
	box-shadow: ${(props) => props.boxShadow};
	font-size: 0.7rem;
	cursor: pointer;
	position: ${(props) => props.position};
	bottom: ${(props) => props.bottom};

	&:hover,
	&:focus {
		background: ${(props) => props.backgroundHover};
		text-decoration: ${(props) => props.textDecoration};
		color: ${(props) => props.color};
		outline: none;
	}

	@media screen and (min-width: 768px) {
		// font-size: 0.8rem;
		width: auto;
		padding: 5px 15px;
	}

	@media screen and (min-width: 1024px) {
		// font-size: 0.8rem;
		width: auto;
		padding: 7px 14px;
	}
`

export const TimerButton = styled.button`
	padding: 5px 10px;
	width: 30px;
	height: 30px;
	border: none;
	border-radius: 50%;
	box-shadow: 0px 10px 13px -7px #808080;
	cursor: pointer;

	&:hover,
	&:focus {
		background: var(--tertiary);
		text-decoration: none;
		color: var(--white);
		outline: none;
	}
`
