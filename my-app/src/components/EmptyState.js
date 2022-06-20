import React from 'react'
import styled from 'styled-components/macro'

import { HeadingOne } from '../styles/GlobalStyles'
import yogaOne from "../styles/images/yoga-outdoors.png"

const EmptyState = () => {
	return (
		<>
			<EmptyStateContainer>
				<HeadingOne fontSize="1.5rem" color="#8DB9BC">Hey there, add some programs and get moving!</HeadingOne>
				<StyledImage src={yogaOne} />
			</EmptyStateContainer>
		</>
	)
}

export default EmptyState

const EmptyStateContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: white;
	text-align: center;
	margin-top: 4vh;
`

const StyledImage = styled.img`
	width: 250px;
	height: 250px;
`
