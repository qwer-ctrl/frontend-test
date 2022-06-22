import React, { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components/macro'

import { API_URL } from '../utils/utils'
import user from '../reducers/user'
import { program } from '../reducers/program'
import ui from '../reducers/ui'
import Header from '../components/Header'
import Footer from '../components/Footer'
import LoadingAnimation from '../components/LoadingAnimation'
import EmptyState from '../components/EmptyState'
import ProgramModal from '../components/ProgramModal'
import { OuterWrapper, InnerWrapper } from '../styles/GlobalStyles'
import { StyledButton } from '../styles/ButtonStyles'
import gymImage from '../styles/images/gym-two.png'
import cardioImage from '../styles/images/cardio-two.png'
import plusIcon from '../styles/images/plus-sign.png'

const MyPage = () => {
	const [showModal, setShowModal] = useState(false)
	const accessToken = useSelector((store) => store.user.accessToken)
	const userId = useSelector((store) => store.user.userId)
	const userHasProgram = useSelector((store) => store.user.program)
	console.log('userHasProgram', userHasProgram)
	const isLoading = useSelector((store) => store.ui.isLoading)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const openModal = () => {
		setShowModal((prev) => !prev)
	}

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
				if (data.success) {
					dispatch(user.actions.setProgram(data.response.program))
					dispatch(program.actions.setError(null))
				} else {
					dispatch(program.actions.setError(data.response.success))
					dispatch(user.actions.setProgram(null))
				}
			})
			.catch((error) => console.log(error))
			.finally(() => dispatch(ui.actions.setLoading(false)))
	}, [accessToken, dispatch, userId])

	useEffect(() => {
		fetchPrograms()
	}, [fetchPrograms])


	return isLoading ? (
		<LoadingAnimation />
	) : (
		<>
			<OuterWrapper>
				<Header />
				<InnerWrapper margin='18vh auto 4rem' desktopMargin='26vh auto 0'>
					{(!userHasProgram || userHasProgram.length < 1) && <EmptyState />}
					{userHasProgram.length > 0 && (
						<MainContainer>
							{userHasProgram.map((prog) => (
								<StyledLink key={prog._id} to={`/singleprogram/${prog._id}`}>
									<ProgramContainer key={prog._id}>
										<StyledImage src={prog.programType === 'weights' ? gymImage : cardioImage} />
										<StyledButton
											width='115px'
											padding='3px'
											margin='0'
											background='transparent'
											textDecoration='none'
											boxShadow='none'
											// onClick={() => handleProgram(prog._id)}
										>
											{prog.programName}
										</StyledButton>
									</ProgramContainer>
								</StyledLink>
							))}
						</MainContainer>
					)}
					<ButtonContainer>
						<ProgramModal showModal={showModal} setShowModal={setShowModal} />
						<AddProgramButton onClick={openModal}>
							<StyledPlusIcon src={plusIcon} />
						</AddProgramButton>
					</ButtonContainer>
				</InnerWrapper>
				<Footer />
			</OuterWrapper>
		</>
	)
}

export default MyPage

const MainContainer = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(120px, 0.5fr));
	grid-gap: 1rem;
	max-height: 70vh;
	overflow-y: scroll;
	padding: 7px;
	justify-content: center;

	@media screen and (min-width: 768px) {
		grid-template-columns: repeat(auto-fit, minmax(120px, 0.25fr));
	}
`
const StyledLink = styled(Link)`
	text-decoration: none;

	&:hover,
	&:focus {
		cursor: pointer;
		outline: none;
		border-top: 2px solid var(--primary);
	}
`

const ProgramContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	border-radius: 6px;
	box-shadow: 0px 5px 4px 0px #adadad;
`

const StyledImage = styled.img`
	height: 70px;
	width: 70px;
`

const ButtonContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	margin: 2rem 0;
	gap: 1rem;
	position: relative;
`

const AddProgramButton = styled.button`
	position: fixed;
	width: 60px;
	height: 60px;
	border: none;
	border-radius: 50%;
	background: var(--tertiary);
	bottom: 5.5vh;
	left: calc(50% - 30px);
	z-index: 10;
	box-shadow: 5px 0px 10px 0px #adadad;

	&:hover,
	&:focus {
		outline: none;
		background: var(--primary);
	}
`

const StyledPlusIcon = styled.img`
	width: 50px;
	height: 50px;
	position: fixed;
	left: calc(50% - 25px);
	bottom: calc(5.5vh + 5px);
`
