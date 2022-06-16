import React, { useEffect, useState, useCallback } from 'react'
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
import { StyledButton } from '../styles/ButtonStyles'
import Footer from '../components/Footer'

const MyPage = () => {
	const [showModal, setShowModal] = useState(false)
	const accessToken = useSelector((store) => store.user.accessToken)
	const userId = useSelector((store) => store.user.userId)
	const userHasProgram = useSelector((store) => store.user.program)
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

	const fetchPrograms = useCallback(() => {
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
	}, [accessToken, dispatch, userId])

	useEffect(() => {
		fetchPrograms()
	}, [fetchPrograms])

	const handleProgram = (programId) => {
		navigate(`/singleprogram/${programId}`)
	}
	//console.log('programs', programs)

	return isLoading ? (
		<LoadingAnimation />
	) : (
		<>
			<OuterWrapper>
				<Header />
				<InnerWrapper>
					<>{userHasProgram.program.length === 0 ? <EmptyState /> : null}</>
					<MainContainer>
						{userHasProgram.program.map((program) => (
							<ProgramContainer key={program._id}>
								<StyledImage src='' />
								<button onClick={() => handleProgram(program._id)}>{program.programName}</button>
							</ProgramContainer>
						))}
						{!userHasProgram.program ? <EmptyState /> : null}
					</MainContainer>
					<ButtonContainer>
						<ProgramModal showModal={showModal} setShowModal={setShowModal} />
						<AddProgramButton onClick={openModal}>+ </AddProgramButton>
						<SignOut />
					</ButtonContainer>
				</InnerWrapper>
				<Footer />
			</OuterWrapper>
		</>
	)
}

export default MyPage

const MainContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
	grid-gap: 1rem;
	height: 70vh;
	overflow-y: scroll;
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

const AddProgramButton = styled.button`
	position: fixed;
	width: 60px;
	height: 60px;
	border: none;
	border-radius: 50%;
	background: var(--primary);
	bottom: 2.5vh;
	left: calc(50% - 30px);
	z-index: 10;
`
