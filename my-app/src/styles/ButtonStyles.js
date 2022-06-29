import styled from 'styled-components/macro'

export const StyledButton = styled.button`
	color: var(--black);
	font-family: 'poppins';
	font-size: 0.7rem;
	font-weight: 500;
	cursor: pointer;
	text-transform: uppercase;
	border: none;
	border-radius: 20px;
	// border-radius: 35px;
	width: ${(props) => props.width};
	background: ${(props) => props.background};
	padding: ${(props) => props.padding};
	margin: ${(props) => props.margin};
	box-shadow: ${(props) => props.boxShadow};
	position: ${(props) => props.position};
	bottom: ${(props) => props.bottom};

	&:hover,
	&:focus {
		outline: none;
		background: ${(props) => props.backgroundHover};
		text-decoration: ${(props) => props.textDecoration};
		color: ${(props) => props.color};
	}

	@media screen and (min-width: 768px) {
		width: auto;
		padding: 5px 15px;
	}

	@media screen and (min-width: 1024px) {
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
