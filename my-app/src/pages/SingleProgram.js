import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
// import { useNavigate } from "react-router-dom"
import styled from "styled-components/macro";

import { API_URL } from "../utils/utils"
import program from "../reducers/program"
import exercise from "../reducers/exercise"
import ui from "../reducers/ui"
import LoadingAnimation from "../components/LoadingAnimation"
import SignOut from "../components/SignOut"
import EmptyState from "../components/EmptyState"

const SingleProgram = () => {
    const isLoading = useSelector((store) => store.ui.isLoading)
    const userHasExercise = useSelector((store) => store.program.exercise)
    const programId = useSelector((store) => store.program.programId)
    console.log(userHasExercise)
    // const navigate = useNavigate()
    const dispatch = useDispatch()
    
    // useEffect(() => {
    //     if (!accessToken) {
    //         navigate("/login")
    //     }
    // }, [accessToken, navigate])

    useEffect(() => {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }

        fetch(API_URL(`myprogram/${programId}`), options)
        .then(res => res.json())
        .then(data => {
                dispatch(ui.actions.setLoading(true))
                console.log(data)
                if (data.success) {
                    dispatch(program.actions.setExercise(data.response))
                    dispatch(exercise.actions.setExercise(data.response))
                    dispatch(exercise.actions.setSets(data.response))
                    dispatch(exercise.actions.setReps(data.response))
                    dispatch(exercise.actions.setWeights(data.response))
                    dispatch(exercise.actions.setComments(data.response))
                    dispatch(exercise.actions.setCreatedAt(data.response))
                    dispatch(exercise.actions.setExerciseId(data.response))
                    dispatch(exercise.actions.setError(null))
                } else {
                    dispatch(exercise.actions.setError(data.response))
                    dispatch(program.actions.setExercise(null))
                    dispatch(exercise.actions.setExercise(null))
                    dispatch(exercise.actions.setSets(null))
                    dispatch(exercise.actions.setReps(null))
                    dispatch(exercise.actions.setWeights(null))
                    dispatch(exercise.actions.setComments(null))
                    dispatch(exercise.actions.setCreatedAt(null))
                    dispatch(exercise.actions.setExerciseId(null))
                }
            })
            .finally(() => dispatch(ui.actions.setLoading(false)))
        
            
    }, [programId, dispatch])
    
    
    
    return isLoading ? <LoadingAnimation /> : (
        <>
        <MainContainer>
            {userHasExercise ? 
                <h1>hi! I have programs!</h1>
                : <EmptyState />}
        </MainContainer>
        <SignOut />
        </>
    )
}

export default SingleProgram


const MainContainer = styled.section``
