import React from "react"
import styled from 'styled-components/macro'


const LoadingAnimation = () => {

    return (
        <>
        <LoaderContainer>
        <p>Loading..</p>
        </LoaderContainer>
        </>
    )
}

export default LoadingAnimation

const LoaderContainer = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
`