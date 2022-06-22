import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components/macro'
import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'

import { API_URL } from '../utils/utils'
import user from '../reducers/user'
import LoadingAnimation from '../components/LoadingAnimation'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { OuterWrapper, InnerWrapper, HeadingOne } from '../styles/GlobalStyles'
import { StyledButton } from '../styles/ButtonStyles'
import profileImage from "../styles/images/profile.png"

const MyTextInput = ({ label, ...props }) => {
	const [field, meta] = useField(props)
	return (
		<>
			<StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
			<input className='text-input' {...field} {...props} />
			{meta.touched && meta.error ? <StyledError className='error'>{meta.error}</StyledError> : null}
		</>
	)
}

const ProfilePage = () => {
	const isLoading = useSelector((store) => store.ui.isLoading)
    const userId = useSelector((store) => store.user.userId)
    const userName = useSelector((store) => store.user.username)
	const dispatch = useDispatch()
    console.log(userName)

	const handleData = (data) => {
        dispatch(user.actions.setUserName(data.response.username))
    }

	// const handleGoBack = () => {
	// 	navigate('/')
	// }

    const Schema = Yup.object().shape({
		username: Yup.string()
	})


	return isLoading ? (
		<LoadingAnimation /> 
	) : (
		<OuterWrapper>
			{/* <AllDoneLoader /> */}
			<Header />
			<InnerWrapper margin='23vh auto 4rem' >
                <StyledImage src={profileImage} />	
                <HeadingOne fontSize="2rem" color="#8DB9BC" textAlign="center">Update your username</HeadingOne>			
                <Formik
                    initialValues={{
                        username: userName,
                    }}
                    validationSchema={Schema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        fetch(API_URL(`updateuser/${userId}`), {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                username: values.username,
                            }),
                        })
                            .then((res) => res.json())
                            .then((data) => {
                                console.log("data from update user", data)
                                handleData(data)
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                            .finally(() => {
                                setSubmitting(false)
                                resetForm()
                                window.location.reload()
                            })
                    }}
                >
                    {({ isSubmitting }) => (
                        <StyledForm>
                            <StyledInput label='New username' name='username' type='text' placeholder={userName} />

                            <StyledButton
                            width="150px"
                            background="var(--primary)"
                            margin="1.5em 0 0"
                            padding="6px 10px"
                            boxShadow="0px 10px 13px -7px #808080"
                            fontSize="10px"
                            type='submit'>Update username</StyledButton>
                        </StyledForm>
                    )}
				</Formik>
                {/* <StyledButton padding='6px 8px' background='var(--primary)' fontSize='0.6rem' margin="1rem 0 0" onClick={handleGoBack}>
					Go back
				</StyledButton> */}
			</InnerWrapper>
			<Footer />
		</OuterWrapper>
	)
}

export default ProfilePage

const StyledImage = styled.img`
    width: 300px;
    height: auto;
`

const StyledForm = styled(Form)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 1rem 0;
    // gap: 0.5rem;
`

const StyledLabel = styled.label`
    color: var(--accentlilac);
`

const StyledInput = styled(MyTextInput)`
	max-width: 150px;
	margin: 0.5rem 0;
	text-align: center;
	border: none;
	border-radius: 10px;
	padding: 6px 10px;
	box-shadow: inset 0px 4px 4px 0px #adadad;

    &:focus {
		outline: none;
		border: 2px solid var(--accentgreen);
	}
`

const StyledError = styled.div`
    margin-bottom: 1.5rem;
    text-align: center;
    color: var(--accentlilac);
`

