import React, { useState } from 'react'
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import {
  useFirestore,
  useFirestoreConnect,
  isLoaded,
  isEmpty
} from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { useNotifications } from 'modules/notification'
import LoadingSpinner from 'components/LoadingSpinner'
import { PROJECTS_COLLECTION } from 'constants/firebasePaths'
import ProjectCard from '../ProjectCard'
import NewProjectDialog from '../NewProjectDialog'
import { Root, CardsList } from './ProjectsList.styled'

function useProjectsList() {
  const { showSuccess, showError } = useNotifications()
  const firestore = useFirestore()

  // Get auth from redux state
  const auth = useSelector(({ firebase: { auth } }) => auth)

  useFirestoreConnect([
    {
      collection: PROJECTS_COLLECTION,
      where: ['createdBy', '==', auth.uid]
    }
  ])

  // Get projects from redux state
  const projects = useSelector(({ firestore: { ordered } }) => ordered.projects)

  // New dialog
  const [newDialogOpen, changeDialogState] = useState(false)
  const toggleDialog = () => changeDialogState(!newDialogOpen)

  async function addProject(newInstance) {
    if (!auth.uid) {
      return showError('You must be logged in to create a project')
    }
    try {
      await firestore
        .add(PROJECTS_COLLECTION, {
          ...newInstance,
          createdBy: auth.uid,
          createdAt: firestore.serverTimestamp()
      })
      toggleDialog()
      showSuccess('Project added successfully')
    } catch(err) {
      console.error('Error:', err) // eslint-disable-line no-console
      showError(err.message || 'Could not add project')
      throw err
    }
  }

  return { projects, addProject, newDialogOpen, toggleDialog }
}

function ProjectsList() {
  const theme = useTheme()
  const {
    projects,
    addProject,
    newDialogOpen,
    toggleDialog
  } = useProjectsList()

  // Show spinner while projects are loading
  if (!isLoaded(projects)) {
    return <LoadingSpinner />
  }

  return (
    <Root>
      <Button variant="contained" onClick={toggleDialog}>
        Add Project
      </Button>
      <NewProjectDialog
        onSubmit={addProject}
        open={newDialogOpen}
        onRequestClose={toggleDialog}
      />
      <CardsList role="list">
        {!isEmpty(projects) ?
          projects.map((project, ind) => {
            const { id: projectId, ...rest } = project || {}
            return (
              <ProjectCard
                key={projectId}
                projectId={projectId}
                {...rest}
              />
            )
          })
        : (
          <Typography sx={{ padding: theme.spacing(4) }} variant="h5">
            No Projects Found. Click "Add Project" above to add one
          </Typography>
        )}
      </CardsList>
    </Root>
  )
}

export default ProjectsList
