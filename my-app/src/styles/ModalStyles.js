import styled from 'styled-components/macro'

export const ModalContainer = styled.div`
  position: fixed;
  z-index: 1
  margin-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: rgb(0,0,0,0.2); // <-------------- change
  `

export const StyledModal = styled.div`
	margin: 20px auto;
	padding: 20px;
	border: 1px solid #888;
	width: 80%;
	background: var(--secondary);
	border: 3px var(--primary) solid;
`
export const CloseButton = styled.button``
