import React from "react"
import styled from 'styled-components/macro'
import Lottie from 'lottie-react'

import animationData from "../lotties/purple-loader.json"

const AllDoneLoader = () => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }

    return (
        <>
        <LoaderContainer>
        <Lottie options={defaultOptions} width={300} height={300} />
        </LoaderContainer>
        </>
    )
}

export default AllDoneLoader

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