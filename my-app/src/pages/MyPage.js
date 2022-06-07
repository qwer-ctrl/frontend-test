import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components/macro'
// import Swal from 'sweetalert2'

import { API_URL } from '../utils/utils'
import user from '../reducers/user'
import { program } from '../reducers/program'
import ui from '../reducers/ui'
import LoadingAnimation from '../components/LoadingAnimation'
import Modal from '../components/Modal'
import SignOut from '../components/SignOut'
import EmptyState from '../components/EmptyState'

const MyPage = () => {
	const [showModal, setShowModal] = useState(false)

	const accessToken = useSelector((store) => store.user.accessToken)
	const userId = useSelector((store) => store.user.userId)
	const userHasProgram = useSelector((store) => store.user.program)
	// const programs = userHasProgram.program
	// console.log("test", userHasProgram)
	const isLoading = useSelector((store) => store.ui.isLoading)
	//console.log(isLoading)
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
		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: accessToken,
			},
		}

		fetch(API_URL(`mypage/${userId}`), options)
			.then((res) => res.json())
			.then((data) => {
				dispatch(ui.actions.setLoading(true))
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
			.finally(() => dispatch(ui.actions.setLoading(false)))
	}, [accessToken, userId, dispatch])

	return isLoading ? (
		<LoadingAnimation />
	) : (
		<>
			<MainContainer>
				{userHasProgram ? (
					<>
						{/* {programs.map((program) => (
                    <div key={program.programId}>
                        <h1>{program.programName}</h1>
                    </div>
                 ))} */}
					</>
				) : (
					<EmptyState />
				)}
			</MainContainer>
			<StyledButton onClick={openModal}>Add new program </StyledButton>
			<Modal showModal={showModal} setShowModal={setShowModal} />
			<SignOut />
		</>
	)
}

export default MyPage

const MainContainer = styled.section``

const StyledButton = styled.button``
