import React, { useEffect, useState, useCallback } from 'react'
import { API_URL } from '../utils/utils'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components/macro'
import { OuterWrapper, InnerWrapper, HeadingOne } from '../styles/GlobalStyles'
import { StyledButton } from '../styles/ButtonStyles'

import deleteIcon from '../styles/images/delete.png'
import editIcon from '../styles/images/edit.png'

import ui from '../reducers/ui'
import Footer from '../components/Footer'
import EditExerciseModal from '../components/EditExerciseModal'
import DeleteExerciseModal from '../components/DeleteExerciseModal'
import AddExerciseModal from '../components/AddExerciseModal'
import UpdateProgramModal from '../components/UpdateProgramModal'
import DeleteProgramModal from '../components/DeleteProgramModal'
import Timer from '../components/Timer'
import AllDoneLoader from '../components/AllDoneLoader'

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
		dispatch(ui.actions.setLoading(true))
		fetch(API_URL(`myprogram/${programId}`), options)
			.then((res) => res.json())
			.then((data) => {
				dispatch(ui.actions.setLoading(true))
				setProgramExercise(data.response.exercise)
				setProgramName(data.response.programName)
			})
			.finally(() => dispatch(ui.actions.setLoading(false)))
	}, [programId, dispatch])

	useEffect(() => {
		fetchProgram()
	}, [fetchProgram])

	const handleUpdateProgramModal = (id) => {
		dispatch(ui.actions.setShowUpdateProgramModal(true))
		dispatch(ui.actions.setCurrentAddExerciseModalId(id))
		fetchProgram()
	}

	const handleAddExerciseModal = (id) => {
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

	let updatedList = [...checked]

	const handleChecked = (event) => {
		if (event.target.checked) {
			updatedList = [...checked, event.target.value]
		} else {
			updatedList.splice(checked.indexOf(event.target.value), 1)
		}
		setChecked(updatedList)
		const progressbar = (updatedList.length / programExercise.length) * 100
		setPercent(progressbar)
	}

	const progress = updatedList.length

	const maxValue = programExercise.length

	return isLoading ? (
		<AllDoneLoader />
	) : (
		<OuterWrapper>
			<InnerWrapper margin='6vh auto 3rem' desktopMargin='10vh auto 7rem'>
				<HeadingOne fontSize='1.5rem' color='var(--tertiary)' margin='0 0 1.5rem'>
					{programName}
				</HeadingOne>
				<ButtonContainer justifyContent='space-evenly' flexDirection='row'>
					<StyledButton
						padding='5px 15px'
						background='var(--primary)'
						boxShadow='0px 10px 13px -7px #808080'
						backgroundHover='var(--tertiary)'
						color='var(--white)'
						onClick={() => handleUpdateProgramModal(programId)}
					>
						Update program
					</StyledButton>
					{showUpdateProgramModal ? <UpdateProgramModal /> : null}
					<StyledButton
						padding='5px 15px'
						background='var(--primary)'
						boxShadow='0px 10px 13px -7px #808080'
						backgroundHover='var(--tertiary)'
						color='var(--white)'
						onClick={() => handleAddExerciseModal(programId)}
					>
						Add exercise
					</StyledButton>
					{showAddExerciseModal ? <AddExerciseModal /> : null}
					<StyledButton
						padding='5px 15px'
						background='var(--primary)'
						boxShadow='0px 10px 13px -7px #808080'
						backgroundHover='var(--tertiary)'
						color='var(--white)'
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
				<ExerciseTimerWrapper>
					<ExerciseGrid>
						{programExercise.map((item) => (
							<ExerciseWrapper key={item._id}>
								<HeaderAndCheck>
									<HeadingOne fontSize='1rem' color='var(--tertiary)'>
										{item.exercise}
									</HeadingOne>
									<label htmlFor='checkbox'></label>
									<StyledCheckbox id='checkbox' type='checkbox' value={item._id} onChange={handleChecked} />
								</HeaderAndCheck>
								<ExerciseContentContainer>
									<ExerciseContainer>
										<MetricsContainer>
											{item.sets ? <p>{item.sets} sets</p> : null}
											{item.reps ? <p>{item.reps} reps</p> : null}
											{item.weights ? <p>{item.weights}</p> : null}
										</MetricsContainer>
										<MetricsContainer>
											{item.minutes ? <p>{item.minutes} minutes</p> : null}
											{item.seconds ? <p>{item.seconds} seconds</p> : null}
										</MetricsContainer>
										<MetricsContainer>
											{item.duration ? <p>{item.duration}</p> : null}
											{item.exerciseLength ? <p>{item.exerciseLength}</p> : null}
										</MetricsContainer>
										<MetricsContainer>
											{item.exerciseLink ? (
												<p>
													link:&nbsp;
													<a href={item.exerciseLink} target='_blank' rel='noopener noreferrer'>
														{item.exerciseLink}
													</a>
												</p>
											) : null}
										</MetricsContainer>
										<MetricsContainer>
											{item.comments ? <p>comments: {item.comments}</p> : null}
										</MetricsContainer>
									</ExerciseContainer>
								</ExerciseContentContainer>
								<IconContainer>
									<IconButton onClick={() => handleEditExerciseModal(item._id)}>
										<IconStyle src={editIcon} alt='editIcon' />
									</IconButton>
									{showEditExerciseModal ? <EditExerciseModal /> : null}
									<IconButton onClick={() => handleDeleteExerciseModal(item._id)}>
										<IconStyle src={deleteIcon} alt='deleteIcon' />
									</IconButton>
									{showDeleteExerciseModal ? <DeleteExerciseModal /> : null}
								</IconContainer>
							</ExerciseWrapper>
						))}
					</ExerciseGrid>
					<Timer />
				</ExerciseTimerWrapper>
			</InnerWrapper>
			<Footer />
		</OuterWrapper>
	)
}

export default SingleProgram

const ExerciseTimerWrapper = styled.section`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 2rem;

	@media screen and (min-width: 1024px) {
		flex-direction: row;
		margin-top: 1rem;
		align-items: flex-start;
	}
`

const ExerciseGrid = styled.section`
	width: 100%;
`

const HeaderAndCheck = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 0.8rem;
`

const ExerciseWrapper = styled.article`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	border-radius: 6px;
	box-shadow: 0px 6px 13px 0px #adadad;
	padding: 0.8rem 0.8rem 1.6rem;
	margin-top: 1rem;
	position: relative;
	width: 90%;

	@media screen and (min-width: 768px) {
		margin: 1.2rem auto;
	}
`

const ExerciseContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	p {
		font-size: 0.9rem;
		max-width: 25ch;
		overflow-wrap: break-word;
		padding-right: 0.5em;
		font-weight: 500;

		@media screen and (min-width: 768px) {
			font-size: 1rem;
			max-width: 25ch;
		}
`
const MetricsContainer = styled.div`
	display: flex;
	margin-bottom: 0.1em;
`

const StyledCheckbox = styled.input`
	accent-color: var(--tertiary);

	&:hover,
	&:focus {
		outline: 4px solid var(--primary);
	}

	@media screen and (min-width: 768px) {
		height: 20px;
		width: 20px;
	}
	@media screen and (min-width: 1024px) {
		height: 25px;
		width: 25px;
	}
`

const IconContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	position: absolute;
	bottom: 0.2em;
	right: 0.42em;
`

const IconButton = styled.button`
	background: transparent;
	border: none;
	cursor: pointer;
	align-self: baseline;

	&:hover,
	&:focus {
		background: var(--primary);
		border-radius: 15px;
	}
`

const IconStyle = styled.img`
	max-width: 18px;
	padding: 0.35em 0.5em 0.25em;

	@media screen and (min-width: 768px) {
		max-width: 20px;
	}

	@media screen and (min-width: 1024px) {
		max-width: 25px;
	}
`

const ButtonContainer = styled.div`
	display: flex;
	flex-direction: ${(props) => props.flexDirection};
	justify-content: ${(props) => props.justifyContent};
	margin: 0.2rem 0;
	gap: 5px;
`

const ProgressContainer = styled.div`
	height: 12px;
	width: 100%;
	max-width: 300px;
	position: relative;
	z-index: -1;
	margin: 1rem 0 0.5rem;

	@media screen and (min-width: 768px) {
		margin: 2rem 0 1.5rem;
	}
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

const ExerciseContentContainer = styled.section`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
	width: 100%;
	column-gap: 5px;
`
