import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Container, Row } from 'react-bootstrap'

const BaseSection = ({ children, fullScreen }) => (
  <Container
    fluid
    className={
      classNames({
        'min-vh-100': fullScreen
      })
    }
  >
    <Container>
      <Row className="py-5">
        {children}
      </Row>
    </Container>
  </Container>
)

BaseSection.propTypes = {
  children: PropTypes.node,
  fullScreen: PropTypes.bool
}

BaseSection.defaultProps = {
  children: undefined,
  fullScreen: false
}

export default BaseSection
