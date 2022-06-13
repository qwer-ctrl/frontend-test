import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components/macro'

import { API_URL } from '../utils/utils'
import user from '../reducers/user'
import { program } from '../reducers/program'
import ui from '../reducers/ui'
import LoadingAnimation from '../components/LoadingAnimation'
import ProgramModal from '../components/ProgramModal'
import SignOut from '../components/SignOut'
import EmptyState from '../components/EmptyState'
import Header from '../components/Header'
import { OuterWrapper, InnerWrapper } from '../styles/GlobalStyles'
import Footer from '../components/Footer'

const MyPage = () => {
	const [showModal, setShowModal] = useState(false)
	const accessToken = useSelector((store) => store.user.accessToken)
	const userId = useSelector((store) => store.user.userId)
	const userHasProgram = useSelector((store) => store.user.program)
	const programs = userHasProgram.program
	const isLoading = useSelector((store) => store.ui.isLoading)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const openModal = () => {
		setShowModal((prev) => !prev)
	}

	// const onProgramClick = () => {
	//     const inputOptions = new Promise((resolve) => {
	//       setTimeout(() => {
	//         resolve({
	//           "weights": "Weights",
	//           "cardio": "Cardio"
	//         })
	//       }, 1000)
	//     })

	useEffect(() => {
		if (!accessToken) {
			navigate('/')
		}
	}, [accessToken, navigate])

	useEffect(() => {
		fetchPrograms()
	},)

	const fetchPrograms = () => {
		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: accessToken,
			},
		}

		dispatch(ui.actions.setLoading(true))

		fetch(API_URL(`mypage/${userId}`), options)
			.then((res) => res.json())
			.then((data) => {
				// console.log(data)
				if (data.success) {
					dispatch(user.actions.setProgram(data.response))
					dispatch(program.actions.setProgramType(data.response))
					dispatch(program.actions.setProgramName(data.response))
					dispatch(program.actions.setError(null))
				} else {
					dispatch(program.actions.setError(data.response))
					dispatch(program.actions.setProgramType(null))
					dispatch(program.actions.setProgramName(null))
					dispatch(user.actions.setProgram([]))
				}
			})
			.catch((error) => console.log(error))
			.finally(() => dispatch(ui.actions.setLoading(false)))
	}

	const handleProgram = (programId) => {
		navigate(`/singleprogram/${programId}`)
	}
	//console.log('programs', programs)

	return isLoading ? (
		<LoadingAnimation />
	) : (
		<OuterWrapper>
			<Header />
			<InnerWrapper>
				<MainContainer>
					{userHasProgram ? (
						<>
							{programs.map((program) => (
								<ProgramContainer key={program._id}>
									<StyledImage src="" />
									<button onClick={() => handleProgram(program._id)}>{program.programName}</button>
								</ProgramContainer>
							))}
						</>
					) : (
						<EmptyState />
					)}
				</MainContainer>
				<ButtonContainer>
					<StyledButton onClick={openModal}>Add new program </StyledButton>
					<ProgramModal showModal={showModal} setShowModal={setShowModal} />
					<SignOut />
				</ButtonContainer>
			</InnerWrapper>
			<Footer />
		</OuterWrapper>
	)
}

export default MyPage

const MainContainer = styled.section`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
	grid-gap: 1rem;
`

const ProgramContainer = styled.div`
	display: flex;
	flex-direction: column;
`
const StyledImage = styled.img`
	width: 100%;
	height: 100px;
	margin: 0 0 2rem;
`

const ButtonContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	margin: 2rem 0;
	gap: 1rem;
`

const StyledButton = styled.button`
	width: 150px;
	padding: 5px;
	margin: 5px;
`
