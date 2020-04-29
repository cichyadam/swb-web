import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import { Col } from 'react-bootstrap'

import BaseSection from '../../../components/BaseSection'

const AdminContent = ({ token }) => {
  if (!token) {
    return (
      <Redirect to="/" />
    )
  }
  return (
    <BaseSection fullScreen>
      <Col lg={12}>
        <div className="mx-auto d-flex flex-column align-items-center">
          <h2>Coming soon...</h2>
        </div>
      </Col>
    </BaseSection>
  )
}

AdminContent.propTypes = {
  token: PropTypes.string
}

AdminContent.defaultProps = {
  token: undefined
}

export default AdminContent
