import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import styled from "styled-components/macro"
import { useDispatch, useSelector } from 'react-redux'

import ui from "../reducers/ui"
import LogOutModal from "./LogOutModal"

const BurgerNav = () => {
    const [open, setOpen] = useState(false)
	const dispatch = useDispatch()
    const showLogOutModal = useSelector((store) => store.ui.showLogOutModal)

	const handleLogOut = () => {
        dispatch(ui.actions.setShowLogOutModal(true))
    }

     return (
        <>
            <StyledBurger open={open} onClick={() => setOpen(!open)}>
                <div></div>
                <div></div>
                <div></div>
            </StyledBurger>
            <NavContainer open={open}></NavContainer>
            <StyledList open={open}>
                <li><StyledNavLink to="/mypage" activeclassname='selected'>Home</StyledNavLink></li>
                <li><StyledNavLink to="/about" activeclassname='selected'>About</StyledNavLink></li>
                <li><StyledNavLink to="/profilepage" activeclassname='selected'>Profile</StyledNavLink></li>
                <li><LogOutButton onClick={() => handleLogOut()}>Log Out</LogOutButton></li>
            </StyledList>
            {showLogOutModal ? <LogOutModal /> : null}
        </>
     )
}

export default BurgerNav

const NavContainer = styled.section`
    display: ${({ open}) => open ? "block" : "none"};
    width: 90%;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: #e4f1ed42;
`

const StyledBurger = styled.div`
    width: 2rem;
    height: 2rem;
    position: fixed;
    top: 3.5%;
    right: 25px;
    z-index: 20;
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;

    @media screen and (min-width: 768px) {
        display: none;
    }

    div {
        width: 2rem;
        height: 0.25rem;
        background-color: ${({ open}) => open ? "var(--tertiary)" : "var(--tertiary)"};
        border-radius: 10px;
        transform-origin: 1px;
        transition: all 0.3s linear;

        &:nth-child(1) {
            transform: ${({ open }) => open ? "rotate(45deg)" : "rotate(0deg)"};
        }

        &:nth-child(2) {
            transform: ${({ open }) => open ? "translateX(100%)" : "translateX(0)"};
            opacity: ${({ open }) => open ? 0 : 1}
        }

        &:nth-child(3) {
            transform: ${({ open }) => open ? "rotate(-45deg)" : "rotate(0deg)"}
        }
    }
`

const StyledList = styled.ul`
    list-style: none;
    display: flex;
    justify-content: center;
    flex-flow: row nowrap;
    text-align: center;
    z-index: 1;

    li {
        padding: 18px 10px;
        font-size: 1rem;
    }

    @media screen and (max-width: 768px) {
        flex-flow: column nowrap;
        background-color: var(--secondary);
        position: fixed;
        transform: ${({ open }) => open ? "translateX(0)" : "translateX(100%)"};
        top: 0;
        right: 0;
        height: 55vh;
        width: 200px;
        padding-top: 1.5rem;
        border-bottom-left-radius: 100% 50%;
        border-top-left-radius: 100% 50%;
        transition: transform 0.4s ease-in-out;

        li {
            color: var(--black);
        }
    }
`

const StyledNavLink = styled(NavLink)`
    text-decoration: none;
    border-bottom: none;
    color: var(--black);

    &.active {
        border-bottom: 1px solid var(--black);
}

`

const LogOutButton = styled.button`
    font-family: "Jost", sans-serif;
    appearance: none;
    border: none;
    background: transparent;
    font-size: 1rem;
    color: var(--black);
`
