import React from "react"
import styled from 'styled-components/macro'


const EmptyState = () => {

    return (
        <>
        <EmptyStateContainer>
        <p>EmptyState</p>
        </EmptyStateContainer>
        </>
    )
}

export default EmptyState

const EmptyStateContainer = styled.div`
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