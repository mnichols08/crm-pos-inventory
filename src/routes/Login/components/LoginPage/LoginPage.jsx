import React from 'react'
import { Link } from 'react-router-dom'
import { useFirebase } from 'react-redux-firebase'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import GoogleButton from 'react-google-button'
import { SIGNUP_PATH } from 'constants/paths'
import { useNotifications } from 'modules/notification'
import LoginForm from '../LoginForm'
import {
  Root,
  Panel,
  LoginProviderSection,
  OrLabel,
  SignUpSection
} from './LoginPage.styled'

function LoginPage() {
  const firebase = useFirebase()
  const { showError } = useNotifications()

  function onSubmitFail(formErrs, dispatch, err) {
    return showError(formErrs ? 'Form Invalid' : err.message || 'Error')
  }

  function googleLogin() {
    return firebase
      .login({ provider: 'google', type: 'popup' })
      .catch((err) => showError(err.message))
  }

  function emailLogin(creds) {
    return firebase.login(creds).catch((err) => showError(err.message))
  }

  return (
    <Root>
      <Panel>
        <LoginForm onSubmit={emailLogin} onSubmitFail={onSubmitFail} />
      </Panel>
      <OrLabel>or</OrLabel>
      <LoginProviderSection>
        <GoogleButton onClick={googleLogin} data-test="google-auth-button" />
      </LoginProviderSection>
      <SignUpSection>
        <Typography>Need an account?</Typography>
        <Button component={Link} to={SIGNUP_PATH}>
          Sign Up
        </Button>
      </SignUpSection>
    </Root>
  )
}

export default LoginPage
