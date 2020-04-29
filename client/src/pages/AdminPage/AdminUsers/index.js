import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import { Col } from 'react-bootstrap'

import BaseSection from '../../../components/BaseSection'

const AdminUsers = ({ token }) => {
  if (!token) {
    return (
      <Redirect to="/" />
    )
  }
  return (
    <BaseSection fullScreen>
      <Col lg={12}>
        <div className="mx-auto d-flex flex-column align-items-center">
          <h2>Create user accounts with different roles and privileges</h2>
        </div>
      </Col>
    </BaseSection>
  )
}

AdminUsers.propTypes = {
  token: PropTypes.string
}

AdminUsers.defaultProps = {
  token: undefined
}

export default AdminUsers
