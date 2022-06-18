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
	padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
	// border: 1px solid #888;
	width: 80%;
	background: var(--secondary);
  border: none;
	border-left: 7px var(--primary) solid;
  border-radius: 6px;
  box-shadow: 0px 10px 13px 0px #808080;
  position: relative;
`

export const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  border-radius: 20px;
  background: var(--primary);
  border: none;
  padding: 6px 15px;
  box-shadow: 2px 3px 2px #888888; /* <---------Change*/
`
