import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Container, Row } from 'react-bootstrap'

const BaseSection = ({ children, variant, fullScreen }) => (
  <Container
    fluid
    className={
      classNames(`bg-${variant}`, {
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
  variant: PropTypes.string,
  fullScreen: PropTypes.bool
}

BaseSection.defaultProps = {
  children: undefined,
  variant: 'white',
  fullScreen: false
}

export default BaseSection
