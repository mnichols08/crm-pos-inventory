import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router } from 'react-router-dom'
import config from 'config'
import { Provider } from 'react-redux'
import { getAuth, connectAuthEmulator }  from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator }  from 'firebase/firestore'
import { getDatabase, connectDatabaseEmulator }  from 'firebase/database'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'
import NotificationsProvider from 'modules/notification/NotificationsProvider'
import ThemeProvider from 'modules/theme/ThemeProvider'
import { StyledEngineProvider } from '@mui/material/styles';
import FirebaseComponents from 'components/FirebaseComponents'
import { defaultRRFConfig } from './defaultConfig'
import initializeFirebase from './initializeFirebase'
import { createTheme } from '@mui/material/styles';
import theme from './theme'
initializeFirebase()
function App({ routes, store }) {
  return (
    <ThemeProvider theme={createTheme(theme)}>
      <Provider store={store}>
        <NotificationsProvider>
          <ReactReduxFirebaseProvider
            firebase={firebase}
            config={defaultRRFConfig}
            dispatch={store.dispatch}
            createFirestoreInstance={createFirestoreInstance}>
            <>
              <Router>{routes}</Router>
              <SetupMessaging />
            </>
          </ReactReduxFirebaseProvider>
        </NotificationsProvider>
      </Provider>
    </ThemeProvider>
  )
}

App.propTypes = {
  routes: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
}

export default App
