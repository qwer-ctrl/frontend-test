import React from 'react'
import { useNavigate } from 'react-router-dom'

import { OuterWrapper } from '../styles/GlobalStyles'
import { InnerWrapper } from '../styles/GlobalStyles'

const NotFound = () => {
	const navigate = useNavigate()

	const handleGoBack = () => {
		navigate('/')
	}

	return (
		<OuterWrapper>
			<InnerWrapper>
				<h1>Not found..</h1>
				<button onClick={() => handleGoBack()}>Go Back</button>
			</InnerWrapper>
		</OuterWrapper>
	)
}

export default NotFound
