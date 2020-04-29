import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import { Col } from 'react-bootstrap'

import BaseSection from '../../../components/BaseSection'

const AdminNewsletter = ({ token }) => {
  if (!token) {
    return (
      <Redirect to="/" />
    )
  }
  return (
    <BaseSection fullScreen>
      <Col lg={12}>
        <div className="mx-auto d-flex flex-column align-items-center">
          <h2>Manage Content</h2>
        </div>
      </Col>
    </BaseSection>
  )
}

AdminNewsletter.propTypes = {
  token: PropTypes.string
}

AdminNewsletter.defaultProps = {
  token: undefined
}

export default AdminNewsletter
