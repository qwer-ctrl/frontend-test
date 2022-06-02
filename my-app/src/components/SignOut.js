import React from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import user from "../reducers/user"
import styled from 'styled-components/macro'

const SignOut = () => {
    // const accessToken = useSelector((store) => store.user.accessToken)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const removeToken = () => {
        dispatch(user.actions.setAccessToken(null))
        navigate("/login")
    }

    return (
        <StyledButton onClick={() => removeToken()}>Sign out </StyledButton>
    )

}

export default SignOut


const StyledButton = styled.button`
`
