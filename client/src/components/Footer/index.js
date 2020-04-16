import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => (
  <Container>
    <Row>
      <Col xs={12} md={6} lg={3}>
        <h4>Skate World Better</h4>
      </Col>
      <Col xs={12} md={6} lg={3}>
        <h4>Sitemap</h4>
      </Col>
      <Col xs={12} md={6} lg={3}>
        <h4>Contact</h4>
      </Col>
      <Col xs={12} md={6} lg={3}>
        <h4>Newsletter</h4>
      </Col>
    </Row>
  </Container>
)

export default Footer
