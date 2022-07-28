import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { OuterWrapper, InnerWrapper, HeadingOne } from '../styles/GlobalStyles'

import LoadingAnimation from '../components/LoadingAnimation'
import NavBar from '../components/NavBar'



const AboutPage = () => {
	const isLoading = useSelector((store) => store.ui.isLoading)


	return isLoading ? (
		<LoadingAnimation /> 
	) : (
		<OuterWrapper>
            <NavBarContainer>
                <NavBar />
            </NavBarContainer>
			<InnerWrapper margin='15vh auto 4rem' desktopMargin="16vh auto 4rem">
                <AboutWrapper>
                    <HeaderWrapper>
                        <HeadingOne 
                            fontSize="1.2rem" 
                            color="var(--tertiary)" 
                            width="100%" 
                            margin="0"
                            textTransform="uppercase"
                            fontWeight="700"
                            desktopFontSize="1.3rem"
                        >
                            Flex 'n Joy in creation
                        </HeadingOne>

                        <p>
                            This app was built as a final project for Technigos Web Development BootCamp in the spring of 2022
                        </p>

                        <p>The tech used in this project </p>

                        <StyledList>
                            <li>React</li>
                            <li>Redux</li>
                            <li>Node.js</li>
                            <li>MongoDB</li>
                        </StyledList>
                    </HeaderWrapper>
                                
                    <CreatorInfoWrapper>
                        <HeadingOne 
                            fontSize="1.2rem" 
                            color="var(--tertiary)" 
                            width="100%" 
                            margin="0 0 0.5rem"
                            desktopMargin="0 0 1rem"
                            textTransform="uppercase"
                            fontWeight="700"
                            desktopFontSize="1.3rem"
                        >
                            The creators
                        </HeadingOne>

                        <CreatorContainer>
                            <div>
                                <p>Emma Högberg</p>
                                <StyledLink
                                    color="var(--tertiary)" 
                                    href="https://www.linkedin.com/in/emmahogberg/" 
                                    target="_blank" rel="noopener noreferrer">
                                    Check out Emmas LinkedIn</StyledLink>
                            </div>
                            <div>
                                <p>Tiina Liukkonen</p>
                                <StyledLink 
                                    color="var(--tertiary)"
                                    href="https://www.linkedin.com/in/tiina-liukkonen/" 
                                    target="_blank" rel="noopener noreferrer">
                                    Check out Tiinas LinkedIn</StyledLink>
                            </div>
                            <div>
                                <p>Anki Palviainen</p>
                                <StyledLink
                                    color="var(--tertiary)" 
                                    href="https://www.linkedin.com/in/anki-palviainen-32a2b9234/" 
                                    target="_blank" rel="noopener noreferrer">
                                    Check out Ankis LinkedIn</StyledLink>
                            </div>
                        </CreatorContainer>
                    </CreatorInfoWrapper>

                    <LinkWrapper>
                        <HeadingOne
                            fontSize="1.2rem"
                            color="var(--tertiary)" 
                            width="100%" 
                            margin="0 0 0.5rem"
                            desktopMargin="0 0 1rem"
                            textTransform="uppercase"
                            fontWeight="700"
                            desktopFontSize="1.3rem"
                        >
                            Links to project code
                        </HeadingOne>

                        <LinkContainer>
                            <StyledLink 
                                color="var(--black)"
                                padding="5px"
                                href="https://github.com/qwer-ctrl/frontend-test" 
                                target="_blank" rel="noopener noreferrer">
                                Frontend repo</StyledLink>
                            <StyledLink 
                                color="var(--black)"
                                padding="5px"
                                href="https://github.com/qwer-ctrl/backend-test" 
                                target="_blank" rel="noopener noreferrer">
                                Backend repo</StyledLink>
                        </LinkContainer>
                        
                    </LinkWrapper>
                </AboutWrapper>
			</InnerWrapper>
		</OuterWrapper>
	)
}

export default AboutPage

const NavBarContainer = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 10vh;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
    background: var(--white);
    padding-bottom: 1rem;
`

const AboutWrapper = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 75vh;
    border-block-start: 1px solid var(--primary);
    margin: -1rem 0 0;
    padding: 1rem 0 0;

`

const HeaderWrapper = styled.article`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    text-align: center;

    p {
        margin-top: 1rem;

        @media screen and (min-width: 768px) {
            width: 70%;
        }

        @media screen and (min-width: 768px) {
            width: 85%;
        }
    }
`

const StyledList = styled.ul`
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.8rem;

    li {
        font-size: 1rem;
        color: var(--tertiary);
    }
`

const CreatorInfoWrapper = styled.article`
    width: 80%;
    background: var(--secondary);
    padding: 2rem;
    border-radius: 10px;
    text-align: center;

    @media screen and (min-width: 768px) {
        width: 90%;
    }
`

const CreatorContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
    justify-content: space-evenly;
    gap: 1rem;
`

const LinkWrapper = styled.article`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    @media screen and (min-width: 768px) {
    }
`

const LinkContainer = styled.div`
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (min-width: 768px) {
        width: 40%;
    }
`

const StyledLink = styled.a`
    text-decoration: none;
    border-bottom: none;
    color: ${props => props.color};

    &:hover,
    &:focus {
        text-decoration: underline;
    }
`

