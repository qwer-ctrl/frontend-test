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
import { OuterWrapper } from '../styles/GlobalStyles'
import { InnerWrapper } from '../styles/GlobalStyles'

const MyPage = () => {
	const [showModal, setShowModal] = useState(false)
	const accessToken = useSelector((store) => store.user.accessToken)
	const userId = useSelector((store) => store.user.userId)
	const userHasProgram = useSelector((store) => store.user.program)
	const programs = userHasProgram.program
	console.log('test', userHasProgram)
	const isLoading = useSelector((store) => store.ui.isLoading)
	console.log(isLoading)
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
			navigate('/login')
		}
	}, [accessToken, navigate])

	useEffect(() => {
		fetchPrograms()
	}, [accessToken, userId, dispatch])


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
				console.log(data)
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
			<InnerWrapper>
				<MainContainer>
					{userHasProgram ? (
						<>
							{programs.map((program) => (
								<div key={program._id}>
									<button onClick={() => handleProgram(program._id)}>{program.programName}</button>
								</div>
							))}
						</>
					) : (
						<EmptyState />
					)}
				</MainContainer>
				<StyledButton onClick={openModal}>Add new program </StyledButton>
				<ProgramModal showModal={showModal} setShowModal={setShowModal} />
				<SignOut />
			</InnerWrapper>
		</OuterWrapper>
	)
}

export default MyPage

const MainContainer = styled.section``

const StyledButton = styled.button``
