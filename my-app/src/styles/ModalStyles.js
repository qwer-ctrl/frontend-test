import styled from 'styled-components/macro'

export const ModalContainer = styled.div`
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background: rgb(0,0,0,0.2);
	z-index: 3;
  `

export const StyledModal = styled.div`
	margin: ${props => props.margin};
	padding: 2rem 2rem 4rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 80%;
	box-sizing: border-box;
	background: var(--secondary);
	border: 25px solid var(--white);
	border-radius: 6px;
	box-shadow: 0px 10px 13px 0px #808080;
	position: relative;

	@media screen and (min-width: 768px) {
		max-width: 60%;
		margin: 30px auto;
	}
`

export const CloseButton = styled.button`
	position: absolute;
	top: 15px;
	right: 20px;
	border-radius: 20px;
	background: var(--primary);
	border: none;
	padding: 6px 15px;
	box-shadow: 1px 3px 4px 0px #808080;

	&:hover,
	&:focus {
		outline: none;
		background: var(--tertiary);
	}
`
