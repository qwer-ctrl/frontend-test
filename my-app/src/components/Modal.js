import React, {useEffect, useState} from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {program} from "../reducers/program"
import styled from 'styled-components/macro'
import ui from "../reducers/ui"
import { createProgram } from "../reducers/program"

import { API_URL } from "../utils/utils"

const Modal = ({ showModal, setShowModal}) => {
  //refactor to use store instead for sending props to MyPage..
  const [programName, setProgramName] = useState('');
  const [programType, setProgramType] = useState("");
  const userId = useSelector((store) => store.user.userId)
  const programId = useSelector((store) => store.program.programId)
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const closeModal = () => {
      setShowModal(prev => !prev);
    }

    const handleProgramName = (e) => {
      console.log(programName)
      setProgramName(e.target.value)
    }

    const handleProgramType = (event) => {
      setProgramType(event.target.value)
      // console.log('progn', programName)
      // console.log('type', type)
    }


    // useEffect((programName, programType) => {
    // fetch(API_URL(`program/${userId}`), {
    //   method: "POST",
    //   headers: {
    //       "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(programName, programType)
    // })
    // .then(res => res.json())
    // .then(data => {
    //     console.log(data)
    //     dispatch(program.actions.setProgramName(data))
    //     dispatch(program.actions.setProgramType(data))
    //     dispatch(program.actions.setProgramId(data))
    // })
    // .catch((err) => {
    //     console.log(err);
    // })
    // // .finally(() => {
    // //    dispatch(ui.actions.setLoading(false))
    // // })

        
    //     // save to database!
    //     // navigate("/myprogram/:programid")
    //     // update path in app to navigate to program with certain id..
    // }, [programType, userId, dispatch])
    
    
    const handleProgramSubmit = () => {
    
      console.log("programName ja Type", programName, programType)

      dispatch(program.actions.createProgram(programName, programType))

      // fetch(API_URL(`myprogram/${programId}`), {
      //   method: "GET",
      //   headers: {
      //       "Content-Type": "application/json"
      //   }
      // })
      // .then(res => res.json())
      // .then(data => {
      //   console.log(data)
      // })
      // fetch(API_URL(`program/${userId}`), {
      //   method: "POST",
      //   headers: {
      //       "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify({programName, programType})
      // })
      // .then(res => res.json())
      // .then(data => {
      //     dispatch(program.actions.setProgramName(data))
      //     dispatch(program.actions.setProgramType(data))
      //     dispatch(program.actions.setProgramId(data))
      //   console.log(data)
      // })
      // .catch((err) => {
      //     console.log(err);
      // })
      // .finally(() => {
      //    dispatch(ui.actions.setLoading(false))
      // })
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
        {/* <CardioButton type='submit' onSubmit={(e) => handleProgramType(e, 'Cardio')}>Cardio</CardioButton>
        <WeightsButton type='submit' onSubmit={(e) => handleProgramType(e, 'Weights')}>Weights</WeightsButton> */}
        </form>
        </StyledModal>
      </ModalContainer>
      : null }
      </>
    )

}

export default Modal


const ModalContainer = styled.div`
  opacity: ${(props) => props.opacity};
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
  background: red;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
`



const CardioButton = styled.button``

const WeightsButton = styled.button``

const CloseButton = styled.button``
