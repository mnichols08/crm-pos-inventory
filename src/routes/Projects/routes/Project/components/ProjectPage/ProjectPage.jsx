import React from 'react'
import Card from '@mui/material/Card'
import { styled, useTheme } from '@mui/material/styles'
import ProjectData from '../ProjectData'

export const Root = styled('div')(({ theme }) => ({
    padding: theme.spacing(2)
}));

function ProjectPage() {
  const theme = useTheme()
  return (
    <Root>
      <Card sx={{ marginBottom: theme.spacing(2) }}>
        <ProjectData />
      </Card>
    </Root>
  )
}

export default ProjectPage
