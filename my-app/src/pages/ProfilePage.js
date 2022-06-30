import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components/macro'
import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'

import { OuterWrapper, InnerWrapper, HeadingOne } from '../styles/GlobalStyles'
import { StyledButton } from '../styles/ButtonStyles'
// import profileImage from "../styles/images/profile.png"

import { API_URL } from '../utils/utils'
import user from '../reducers/user'
import LoadingAnimation from '../components/LoadingAnimation'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'


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
    const workoutCounter = useSelector((store) => store.ui.workoutCounter)
	const dispatch = useDispatch()

	const handleData = (data) => {
        dispatch(user.actions.setUserName(data.response.username))
    }


    const Schema = Yup.object().shape({
		username: Yup.string()
	})


	return isLoading ? (
		<LoadingAnimation /> 
	) : (
		<OuterWrapper>
            <NavBarContainer>
                <NavBar />
            </NavBarContainer>
			<InnerWrapper margin='10vh auto 4rem' desktopMargin="10vh auto 4rem">
                {/* <StyledImage src={profileImage} />	 */}
                <HeaderWrapper>
                    <HeadingOne 
                        fontSize="1.2rem" 
                        color="var(--tertiary)" 
                        width="100%" 
                        margin="0 0 1rem"
                        textTransform="uppercase"
                        fontWeight="700"
                        desktopFontSize="1.3rem"
                        >
                            Your profile
                    </HeadingOne>
                </HeaderWrapper>
                			
                <ProfileInfoWrapper>
                    {/* <HeadingOne fontSize="0.8rem" margin="0 0 1rem">Name: </HeadingOne> */}
                    <HeadingOne 
                        fontSize="0.9rem" 
                        margin="0 0 1rem">
                            Username: {userName}
                    </HeadingOne>
                    <HeadingOne 
                        fontSize="0.9rem" 
                        margin="0 0 1rem">
                            Total workouts: {workoutCounter > 0 ? workoutCounter : '-'}
                    </HeadingOne>
                            
                </ProfileInfoWrapper>

                <Formik
                    initialValues={{
                        username: "",
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
                            <StyledInput label='Edit username' name='username' type='text' placeholder={userName}/>

                            <StyledButton
                            width="130px"
                            background="var(--primary)"
                            margin="1rem 0 0"
                            padding="6px 15px"
                            boxShadow="0px 10px 13px -7px #808080"
                            backgroundHover='var(--tertiary)'
							color='var(--secondary)'
                            type='submit'>Save changes</StyledButton>
                        </StyledForm>
                    )}
				</Formik>
			</InnerWrapper>
			<Footer />
		</OuterWrapper>
	)
}

export default ProfilePage

// const StyledImage = styled.img`
//     width: 100px;
//     height: auto;
// `

const NavBarContainer = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 10vh;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
    background: var(--white);
    padding-bottom: 1rem;
`

const HeaderWrapper = styled.section`
    width: 100%;
    text-align: center;
    border-block-start: 1px solid var(--primary);
    padding: 7rem 0 0;
    margin: 1rem 0 0;

    @media screen and (min-width: 768px) {
    }
`

const ProfileInfoWrapper = styled.article`
    background: var(--secondary);
    padding: 1rem;
    border-radius: 10px;
    margin: 0 0 4rem;
    width: 60%;
    text-align: center;

    @media screen and (min-width: 768px) {
        width: 50%;
    }
`

const StyledForm = styled(Form)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 1rem 0;
`

const StyledLabel = styled.label`
    color: var(--black);
`

const StyledInput = styled(MyTextInput)`
	max-width: 150px;
	margin: 0.5rem 0;
	text-align: center;
	border: none;
	border-radius: 15px;
	padding: 6px 10px;
    -webkit-appearance: none;
	-moz-appearance: none;
	box-shadow: inset 0px 4px 4px 0px #adadad;
    font-size: 1rem;

    &:focus {
		outline: none;
		border-bottom: 3px solid var(--primary);
	}

    @media screen and (min-width: 768px) {
        // width: 250px;
    }
`

const StyledError = styled.div`
    margin-bottom: 1.5rem;
    text-align: center;
    color: var(--accentlilac);
`

