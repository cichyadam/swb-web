import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

const LogoutPage = ({ removeToken, removeUserData }) => {
  useEffect(() => {
    removeToken(null)
    removeUserData(null)
    sessionStorage.clear()
  }, [])
  return (
    <Redirect to="/admin" />
  )
}

LogoutPage.propTypes = {
  removeToken: PropTypes.func.isRequired,
  removeUserData: PropTypes.func.isRequired
}

export default LogoutPage
