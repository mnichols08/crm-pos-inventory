import React from 'react'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import { isLoaded, useFirebase } from 'react-redux-firebase'
import LoadingSpinner from 'components/LoadingSpinner'
import { useNotifications } from 'modules/notification'
import defaultUserImageUrl from 'static/User.png'
import AccountForm from '../AccountForm'

export const GridItem = styled(Grid)(({ theme }) => ({
  textAlign: 'center',
  marginTop: theme.spacing(5)
}));

export const CurrentAvatar = styled('img')(() => ({
  width: '100%',
  maxWidth: '13rem',
  marginTop: '3rem',
  height: 'auto',
  cursor: 'pointer'
}));


function AccountEditor() {
  const { showSuccess, showError } = useNotifications()
  const firebase = useFirebase()

  // Get profile from redux state
  const profile = useSelector(({ firebase }) => firebase.profile)

  if (!isLoaded(profile)) {
    return <LoadingSpinner />
  }

  async function updateAccount(newAccount) {
    try {
      await firebase.updateProfile(newAccount)
      showSuccess('Profile updated successfully')
    } catch (err) {
      console.error('Error updating profile', err) // eslint-disable-line no-console
      showError(`Error updating profile: ${err.message}`)
    }
  }

  return (
    <Grid container spacing={2} justifyContent="center">
      <GridItem item xs={12} md={6} lg={6}>
        <CurrentAvatar
          src={profile?.avatarUrl || defaultUserImageUrl}
          alt=""
        />
      </GridItem>
      <Grid item xs={12} md={6} lg={6}>
        <AccountForm onSubmit={updateAccount} account={profile} />
      </Grid>
    </Grid>
  )
}

export default AccountEditor
