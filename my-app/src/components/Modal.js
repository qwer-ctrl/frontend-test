import React, {useEffect, useState} from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import program from "../reducers/program"
import styled from 'styled-components/macro'

import { API_URL } from "../utils/utils"

const Modal = ({ showModal, setShowModal}) => {
  //refactor to use store instead for sending props to MyPage..
  const [programName, setProgramName] = useState(null);
  const [programType, setProgramType] = useState(null);
  const userId = useSelector((store) => store.user.userId)
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const closeModal = () => {
      setShowModal(prev => !prev);
    }

    const handleProgramName = (e) => {
      console.log(programName)
      setProgramName(e.target.value)
    }

    const handleProgramType = (e, type) => {
      e.preventDefault()
      setProgramType(type)
      console.log('progn', programName)
      console.log('type', type)
    }


    useEffect((programName, programType) => {
    fetch(API_URL(`program/${userId}`), {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(programName, programType)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        dispatch(program.actions.setProgramName(programName))
        dispatch(program.actions.setProgramType(programType))
    })
    .catch((err) => {
        console.log(err);
    })
    // .finally(() => {
    //    I haven't imported loadingAnimation, needs to be done 
    // })

        
        // save to database!
        // navigate("/myprogram/:programid")
        // update path in app to navigate to program with certain id..
    }, [programType, userId, dispatch])


    return (
      <>
      {showModal ? 
      <ModalContainer showModal={showModal}>
        <StyledModal>
        <CloseButton onClick={closeModal}>x</CloseButton>
        <label htmlFor="programname">Program name</label>
        <form>
          <input name="programname" type="text" onChange={handleProgramName}></input>
        <CardioButton type='submit' onSubmit={(e) => handleProgramType(e, 'Cardio')}>Cardio</CardioButton>
        <WeightsButton type='submit' onSubmit={(e) => handleProgramType(e, 'Weights')}>Weights</WeightsButton>
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
