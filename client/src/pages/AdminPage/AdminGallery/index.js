import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import { Col } from 'react-bootstrap'

import BaseSection from '../../../components/BaseSection'

const AdminGallery = ({ token }) => {
  if (!token) {
    return (
      <Redirect to="/" />
    )
  }
  return (
    <BaseSection fullScreen>
      <Col lg={12}>
        <div className="mx-auto d-flex flex-column align-items-center">
          <h2>Manage Gallery</h2>
        </div>
      </Col>
    </BaseSection>
  )
}

AdminGallery.propTypes = {
  token: PropTypes.string
}

AdminGallery.defaultProps = {
  token: undefined
}

export default AdminGallery
