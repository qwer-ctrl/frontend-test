import React from 'react'
import styled from 'styled-components/macro'

const EmptyState = () => {
	return (
		<>
			<EmptyStateContainer>
				<h1>EmptyState!!!</h1>
			</EmptyStateContainer>
		</>
	)
}

export default EmptyState

const EmptyStateContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	background: white;
`
