import React from 'react'
import styled from 'styled-components/macro'
import Lottie from 'lottie-react'

import CheckLoader from '../lotties/purple-loader.json'

const AllDoneLoader = () => {

	return (
		<>
			<LoaderContainer>
				<Lottie animationData={CheckLoader} />
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
