import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import styled from "styled-components/macro";

import { API_URL } from "../utils/utils"
import program from "../reducers/program"
import SignOut from "../components/SignOut"
import EmptyState from "../components/EmptyState";

const MyPage = () => {
    const accessToken = useSelector((store) => store.user.accessToken)
    const userId = useSelector((store) => store.user.userId)
    const userHasProgram = useSelector((store) => store.user.program)
    // const programType = useSelector((store) => store.program.programType)
    // const programName = useSelector((store) => store.program.programName)
    // const error = useSelector((store) => store.program.error)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
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
                if (data.success) {
                    dispatch(program.actions.setProgramType(data.response))
                    dispatch(program.actions.setProgramName(data.response))
                    dispatch(program.actions.setError(null))
                } else {
                    dispatch(program.actions.setError(data.response))
                    dispatch(program.actions.setProgramName(data.response))
                    dispatch(program.actions.setPrograms([]))
                }
            })
    }, [accessToken, userId, dispatch])
    
    return (
        <MainContainer>
            {userHasProgram ? 
                <h1>hi! I have programs!</h1>
        <SignOut />
            : <EmptyState />}
        </MainContainer>
    )
}

export default MyPage


const MainContainer = styled.section``
