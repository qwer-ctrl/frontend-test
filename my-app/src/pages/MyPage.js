import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import styled from "styled-components/macro";

import { API_URL } from "../utils/utils"
// import programs from "../reducers/programs"
import SignOut from "../components/SignOut"

const MyPage = () => {
    // const accessToken = useSelector((store) => store.user.accessToken)
    // const programItems = useSelector((store) => store.programs.programs)
    // const navigate = useNavigate()
    // const dispatch = useDispatch()
    
    // useEffect(() => {
    //     if (!accessToken) {
    //         navigate("/login")
    //     }
    // }, [accessToken])

    // useEffect(() => {
    //     const options = {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": accessToken,
    //         }
    //     }

    //     fetch(API_URL("programs"), options)
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.success) {
    //                 dispatch(programs.actions.setPrograms(data.response))
    //                 dispatch(programs.actions.setError(null))
    //             } else {
    //                 dispatch(programs.actions.setError(data.response))
    //                 dispatch(programs.actions.setPrograms([]))
    //             }
    //         })
    // }, [])
    
    return (
        <MainContainer>
        <SignOut />
        </MainContainer>
    )
}

export default MyPage


const MainContainer = styled.section``