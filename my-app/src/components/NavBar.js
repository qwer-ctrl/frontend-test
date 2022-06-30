import React from "react"
import styled from "styled-components/macro"

import BurgerNav from "./BurgerNav"

const NavBar = () => {
    

    return (
        <Nav>
            <LogoTitle>
				Flex 'n Joy
			</LogoTitle>
            <BurgerNav />
        </Nav>

    )
}

export default NavBar

const Nav = styled.nav`
    width: 82%;
    height: 60px;
    padding: 1.5rem 0 0.5rem 0.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media screen and (min-width: 768px) {
        padding: 2rem 0 0;
    }

    @media screen and (min-width: 1024px) {
        width: 90%;
    }
`

const LogoTitle = styled.h1`
    font-family: "Boogaloo", cursive;
    font-size: 2rem;
    // text-transform: uppercase;
    text-align: left;
    color: var(--tertiary);
    // font-weight: 700;
    
    @media screen and (min-width: 1024px) {
        font-size: 3rem;
    }
`

