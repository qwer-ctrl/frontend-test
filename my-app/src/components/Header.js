import React from "react"
import styled from 'styled-components/macro'


const Header = () => {

    return (
        <>
        <HeaderContainer>
            <h1>I'm header!</h1>
        </HeaderContainer>
        </>
    )
}

export default Header

const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  background-color: #E8E8E8;
`