import React from "react"
import styled from "styled-components/macro"

import { HeadingOne } from "../styles/GlobalStyles"
import BurgerNav from "./BurgerNav"

const NavBar = () => {
    

    return (
        <Nav>
            <HeadingOne 
					fontSize="1.5rem" 
					textAlign="left" 
					desktopFontSize="1.8rem" 
					fontWeight="700"
					>
						Flex 'n Joy
			</HeadingOne>
            <BurgerNav />
        </Nav>

    )
}

export default NavBar

const Nav = styled.nav`
    width: 100%;
    height: 60px;
    padding: 1.5rem 0 0.5rem 0.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media screen and (min-width: 768px) {
        padding: 2rem 0 0;
    }

`

