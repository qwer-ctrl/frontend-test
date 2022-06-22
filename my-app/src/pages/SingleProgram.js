import React, { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components/macro'

import EditExerciseModal from '../components/EditExerciseModal'
import DeleteExerciseModal from '../components/DeleteExerciseModal'
import { API_URL } from '../utils/utils'
import ui from '../reducers/ui'
import Timer from '../components/Timer'
import AllDoneLoader from '../components/AllDoneLoader'
// import LoadingAnimation from '../components/LoadingAnimation'
import AddExerciseModal from '../components/AddExerciseModal'
import UpdateProgramModal from '../components/UpdateProgramModal'
import DeleteProgramModal from '../components/DeleteProgramModal'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { OuterWrapper, InnerWrapper, HeadingOne } from '../styles/GlobalStyles'
import { StyledButton } from '../styles/ButtonStyles'

const SingleProgram = () => {
	const { programId } = useParams()
	const [programName, setProgramName] = useState('')
	const [programExercise, setProgramExercise] = useState([])
	const [checked, setChecked] = useState([])
	const [percent, setPercent] = useState(0)

	const isLoading = useSelector((store) => store.ui.isLoading)
	const showDeleteProgramModal = useSelector((store) => store.ui.showDeleteProgramModal)
	const showAddExerciseModal = useSelector((store) => store.ui.showAddExerciseModal)
	const showUpdateProgramModal = useSelector((store) => store.ui.showUpdateProgramModal)
	const showEditExerciseModal = useSelector((store) => store.ui.showEditExerciseModal)
	const showDeleteExerciseModal = useSelector((store) => store.ui.showDeleteExerciseModal)
	const dispatch = useDispatch()

	const fetchProgram = useCallback(() => {
		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}
		fetch(API_URL(`myprogram/${programId}`), options)
			.then((res) => res.json())
			.then((data) => {
				console.log('data from single program fetch', data)
				dispatch(ui.actions.setLoading(true))
				setProgramExercise(data.response.exercise)
				setProgramName(data.response.programName)
			})
			.finally(() => dispatch(ui.actions.setLoading(false)))
	}, [dispatch, programId])

	useEffect(() => {
		fetchProgram()
	}, [fetchProgram])

	const handleUpdateProgramModal = (id) => {
		dispatch(ui.actions.setShowUpdateProgramModal(true))
		dispatch(ui.actions.setCurrentAddExerciseModalId(id))
		fetchProgram()
	}

	const handleAddExerciseModal = (id) => {
		console.log(id)
		dispatch(ui.actions.setShowAddExerciseModal(true))
		dispatch(ui.actions.setCurrentAddExerciseModalId(id))
		fetchProgram()
	}

	const handleDeleteProgramModal = (id) => {
		dispatch(ui.actions.setShowDeleteProgramModal(true))
		dispatch(ui.actions.setCurrentModalId(id))
	}

	const handleEditExerciseModal = (id) => {
		dispatch(ui.actions.setShowEditExerciseModal(true))
		dispatch(ui.actions.setCurrentModalId(id))
	}

	const handleDeleteExerciseModal = (id) => {
		dispatch(ui.actions.setShowDeleteExerciseModal(true))
		dispatch(ui.actions.setCurrentModalId(id))
		fetchProgram()
	}

	// const handleGoBack = () => {
	// 	navigate('/')
	// }

	let updatedList = [...checked]

	const handleChecked = (event) => {
		if (event.target.checked) {
			updatedList = [...checked, event.target.value]
		} else {
			updatedList.splice(checked.indexOf(event.target.value), 1)
		}
		setChecked(updatedList)
		console.log(updatedList.length, programExercise.length)
		const progressbar = (updatedList.length / programExercise.length) * 100
		setPercent(progressbar)
	}

	const progress = updatedList.length

	const maxValue = programExercise.length

	return isLoading ? (
		<AllDoneLoader />
	) : (
		<OuterWrapper>
			{/* <AllDoneLoader /> */}
			<Header />
			<InnerWrapper margin='25vh auto 4rem'>
				<HeadingOne fontSize='1.5rem' color='var(--tertiary)' margin='0 0 0.5rem'>
					{programName}
				</HeadingOne>
				<ButtonContainer justifyContent='space-evenly' flexDirection='row'>
					<StyledButton
						padding='5px 15px'
						background='var(--primary)'
						boxShadow='0px 10px 13px -7px #808080'
						onClick={() => handleUpdateProgramModal(programId)}
					>
						Update program
					</StyledButton>
					{showUpdateProgramModal ? <UpdateProgramModal /> : null}
					<StyledButton
						padding='5px 15px'
						background='var(--primary)'
						boxShadow='0px 10px 13px -7px #808080'
						onClick={() => handleAddExerciseModal(programId)}
					>
						Add exercise
					</StyledButton>
					{showAddExerciseModal ? <AddExerciseModal /> : null}
					<StyledButton
						padding='5px 15px'
						background='var(--primary)'
						boxShadow='0px 10px 13px -7px #808080'
						onClick={() => handleDeleteProgramModal(programId)}
					>
						Delete program
					</StyledButton>
					{showDeleteProgramModal ? <DeleteProgramModal /> : null}
				</ButtonContainer>
				<ProgressContainer>
					<Background />
					<Progress percent={percent} />
				</ProgressContainer>
				{progress}/{maxValue}
				<ExerciseGrid>
					{programExercise.map((item) => (
						<ExerciseWrapper key={item._id}>
							<HeadingThree>{item.exercise}</HeadingThree>
							<ExerciseContainer>
								{item.sets ? <p>{item.sets} sets</p> : null}
								{item.reps ? <p>{item.reps} sets</p> : null}
								{item.weights ? <p>{item.weights}</p> : null}
								{item.minutes ? <p>{item.minutes} minutes</p> : null}
								{item.seconds ? <p>{item.seconds} seconds</p> : null}
								{item.duration ? <p>{item.duration}</p> : null}
								{item.exerciseLength ? <p>{item.exerciseLength}</p> : null}
								{item.comments ? <p>comments: {item.comments}</p> : null}
								{item.exerciseLink ? (
									<p>
										link:
										<a href={item.exerciseLink} target='_blank' rel='noopener noreferrer'>
											{item.exerciseLink}
										</a>
									</p>
								) : null}

								<label htmlFor='checkbox'></label>
								<StyledCheckbox id='checkbox' type='checkbox' value={item._id} onChange={handleChecked} />
							</ExerciseContainer>
							<ButtonContainer justifyContent='center' flexDirection='row'>
								<StyledButton
									width='65px'
									background='var(--primary)'
									margin='0'
									padding='5px 10px'
									boxShadow='0px 10px 13px -7px #808080'
									backgroundHover='var(--tertiary)'
									color='var(--secondary)'
									onClick={() => handleEditExerciseModal(item._id)}
								>
									Edit
								</StyledButton>
								{showEditExerciseModal ? <EditExerciseModal /> : null}
								<StyledButton
									width='65px'
									background='var(--primary)'
									margin='0'
									padding='5px 10px'
									boxShadow='0px 10px 13px -7px #808080'
									backgroundHover='var(--tertiary)'
									color='var(--secondary)'
									onClick={() => handleDeleteExerciseModal(item._id)}
								>
									Delete
								</StyledButton>
								{showDeleteExerciseModal ? <DeleteExerciseModal /> : null}
							</ButtonContainer>
						</ExerciseWrapper>
					))}
				</ExerciseGrid>
				{/* <StyledButton padding='6px 8px' background='var(--primary)' fontSize='0.6rem' onClick={handleGoBack}>
					Go back
				</StyledButton> */}
			</InnerWrapper>
			<Timer />
			<Footer />
		</OuterWrapper>
	)
}

export default SingleProgram

const ExerciseGrid = styled.section`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(140px, 0.5fr));
	gap: 5px;
	margin-top: 1rem;
`

const ExerciseWrapper = styled.article`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	border-radius: 6px;
	box-shadow: 0px 6px 13px 0px #adadad;
	padding: 0.8rem;
`

const HeadingThree = styled.h3`
	font-size: 1rem;
	color: var(--tertiary);
`

const ExerciseContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	// justify-content: space-evenly;
	padding: 10px;
	// margin: 2rem;

	p {
		font-size: 0.7rem;
	}
`
const StyledCheckbox = styled.input`
	accent-color: var(--tertiary);
	margin-top: 0.5rem;
`

const ButtonContainer = styled.div`
	display: flex;
	flex-direction: ${(props) => props.flexDirection};
	justify-content: ${(props) => props.justifyContent};
	margin: 0.5rem 0;
	gap: 5px;
`
const ProgressContainer = styled.div`
	height: 12px;
	width: 100%;
	max-width: 300px;
	position: relative;
	z-index: -1;
	margin: 1rem 0 0.5rem;
`

const BaseBox = styled.div`
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	border-radius: 3px;
	transition: width 2s ease-in-out;
`

const Background = styled(BaseBox)`
	background: var(--grey);
	width: 100%;
	max-width: 300px;
`

const Progress = styled(BaseBox)`
	background: var(--accentlilac);
	width: ${({ percent }) => percent}%;
`
// const StyledButton = styled.button``
