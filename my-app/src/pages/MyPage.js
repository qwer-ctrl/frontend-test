import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import styled from "styled-components/macro";
import Swal from 'sweetalert2'

import { API_URL } from "../utils/utils"
import user from "../reducers/user"
import program from "../reducers/program"
import ui from "../reducers/ui";
import LoadingAnimation from "../components/LoadingAnimation";
import SignOut from "../components/SignOut"
import EmptyState from "../components/EmptyState";

const MyPage = () => {
    const accessToken = useSelector((store) => store.user.accessToken)
    const userId = useSelector((store) => store.user.userId)
    const userHasProgram = useSelector((store) => store.user.program)
    const programs = userHasProgram.program
    console.log("test", userHasProgram)
    const isLoading = useSelector((store) => store.ui.isLoading)
    console.log(isLoading)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
const onProgramClick = () => {
    Swal.fire({
        title: 'Submit your Github username',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Look up',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
          return fetch(`//api.github.com/users/${login}`)
            .then(response => {
              if (!response.ok) {
                throw new Error(response.statusText)
              }
              return response.json()
            })
            .catch(error => {
              Swal.showValidationMessage(
                `Request failed: ${error}`
              )
            })
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: `${result.value.login}'s avatar`,
            imageUrl: result.value.avatar_url
          })
        }
      })
}
    useEffect(() => {
        if (!accessToken) {
            navigate("/login")
        }
    }, [accessToken, navigate])

    useEffect(() => {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": accessToken,
            }
        }

        fetch(API_URL(`mypage/${userId}`), options)
        .then(res => res.json())
        .then(data => {
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
    
    
    
    return isLoading ? <LoadingAnimation /> : (
        <>
        <MainContainer>
            {userHasProgram ? 
                <>
                 {programs.map((program) => (
                    <div key={program.programId}>
                        <h1>{program.programName}</h1>
                    </div>
                 ))}
                 </>
                : <EmptyState />}
    
        </MainContainer>
        <button onClick={onProgramClick}>Add new program</button>
        <SignOut />
        </>
    )
}

export default MyPage


const MainContainer = styled.section``
