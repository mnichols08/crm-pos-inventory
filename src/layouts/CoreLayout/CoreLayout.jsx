import React from 'react'
import PropTypes from 'prop-types'
import Navbar from 'components/Navbar'

function CoreLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

CoreLayout.propTypes = {
  children: PropTypes.element.isRequired
}

export default CoreLayout
