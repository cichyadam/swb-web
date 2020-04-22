import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

const LogoutPage = (removeToken) => {
  useEffect(() => {
    /* removeToken(null) */
    sessionStorage.clear()
  }, [])
  return (
    <Redirect to="/admin" />
  )
}

LogoutPage.propTypes = {
  removeToken: PropTypes.func.isRequired
}

export default LogoutPage
