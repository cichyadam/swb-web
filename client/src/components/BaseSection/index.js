import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Container, Row } from 'react-bootstrap'

const BaseSection = ({ children, fullScreen, fluid }) => (
  <Container
    fluid
    className={
      classNames({
        'min-vh-100': fullScreen
      })
    }
  >
    <Container fluid={fluid}>
      <Row className="py-5">
        {children}
      </Row>
    </Container>
  </Container>
)

BaseSection.propTypes = {
  children: PropTypes.node,
  fullScreen: PropTypes.bool,
  fluid: PropTypes.bool
}

BaseSection.defaultProps = {
  children: undefined,
  fullScreen: false,
  fluid: false
}

export default BaseSection
