import React, {useEffect, useState} from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {program} from "../reducers/program"
import styled from 'styled-components/macro'
import ui from "../reducers/ui"
// import { createProgram } from "../reducers/program"

import { API_URL } from "../utils/utils"

const Modal = ({ showModal, setShowModal}) => {
  //refactor to use store instead for sending props to MyPage..
    const [programName, setProgramName] = useState('');
    const [programType, setProgramType] = useState('');
    const userId = useSelector((store) => store.user.userId)
    const [programId, setProgramId] = useState('')
    console.log(programId)
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const closeModal = () => {
      setShowModal(prev => !prev);
    }

    const handleProgramName = (e) => {
      setProgramName(e.target.value)
    }

    const handleProgramType = (e) => {
      setProgramType(e.target.value)
    }
    
    const handleProgramSubmit = (e) => {
      e.preventDefault()
      dispatch(ui.actions.setLoading(true))

      fetch(API_URL(`program/${userId}`), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({programName, programType})
      })
      .then(res => res.json())
      .then(data => {
          setProgramId(data.response._id)
          dispatch(program.actions.setProgramName(data.response))
          dispatch(program.actions.setProgramType(data.response))
          dispatch(program.actions.setProgramId(data.response))
          console.log(data.response._id) 
      })
      .catch((err) => {
          console.log(err);
      })
      .finally(() => {
        console.log('programID?', programId)
        dispatch(ui.actions.setLoading(false))
        // navigate(`/myprogram/${programId}`)
      })
    }

    return (
      <>
      {showModal ? 
      <ModalContainer showModal={showModal}>
        <StyledModal>
        <CloseButton onClick={closeModal}>x</CloseButton>
        <form onSubmit={handleProgramSubmit}>
        <label htmlFor="programname">Program name</label>
          <input name="programname" type="text" onChange={handleProgramName}></input>
        <label htmlFor="weights">Weights</label>
          <input type="radio" name="weights" value="weights" checked={programType === "weights"} onChange={handleProgramType}></input>
        <label htmlFor="cardio">Cardio</label>
          <input type="radio" name="cardio" value="cardio" checked={programType === "cardio"} onChange={handleProgramType}></input>
        <button type="submit">Add program</button>
        </form>
        </StyledModal>
      </ModalContainer>
      : null }
      </>
    )
}

export default Modal


const ModalContainer = styled.div`
  position: fixed;
  z-index: 1
  margin-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: rgb(0,0,0,0.2); // <-------------- change
  `
  
  const StyledModal = styled.div`
  background: white;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
`



const CardioButton = styled.button``

const WeightsButton = styled.button``

const CloseButton = styled.button``
