import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from "styled-components/macro"

import { ModalContainer, StyledModal } from '../styles/ModalStyles'
import { HeadingOne } from '../styles/GlobalStyles'
import { StyledButton } from '../styles/ButtonStyles'

import ui from '../reducers/ui'
import user from '../reducers/user'

const LogOutModal = () => {
	const showModal = useSelector((store) => store.ui.showLogOutModal)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const closeModal = () => {
		dispatch(ui.actions.setShowLogOutModal(false))
	}

    const removeToken = () => {
		dispatch(user.actions.setAccessToken(null))
		navigate('/')
        dispatch(ui.actions.setShowLogOutModal(false))
	}


	return (
		<>
			{showModal ? (
				<ModalContainer>
					<StyledModal margin="80px auto">
						<HeadingOne 
							fontSize="1rem" 
							margin="1rem 0 0" 
							textAlign="center" 
							color="var(--black)"
							fontWeight="500"
							>Are you sure you want to log out?
						</HeadingOne>

                        <ButtonContainer>
                            <StyledButton
                                width="175px"
                                // tabletWidth="200px"
                                background="var(--primary)"
                                margin="1.5em 0 0"
                                padding="6px 10px"
                                boxShadow="0px 10px 13px -7px #808080"
                                backgroundHover="var(--tertiary)"
                                onClick={closeModal}>No, go back
                            </StyledButton>

                            <StyledButton
                                width="175px"
                                // tabletWidth="200px"
                                background="transparent"
                                margin="1.5em 0 0"
                                padding="6px 8px"
                                textDecoration="underline"
                                backgroundHover="var(--tertiary)"
                                onClick={() => removeToken()}>Yes, I'm sure
                            </StyledButton>
                        </ButtonContainer>
					</StyledModal>
				</ModalContainer>
			) : null}
		</>
	)
}

export default LogOutModal

const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (min-width: 768px) {
        width: 60%;
    }
`
