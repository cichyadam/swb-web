import React from 'react'
import Link from 'react-router-dom/Link'
import Col from 'react-bootstrap/Col'

import BaseSection from '../BaseSection'

const Footer = () => (
  <BaseSection variant="dark">
    <Col xs={12} md={6} lg={3}>
      <h4 className="text-white">Skate World Better</h4>
      <p className="text-white">
        Skate world better raises money for Mozambique and its citizens. It is
        a young, innovative and charitable organization
      </p>
    </Col>
    <Col xs={12} md={6} lg={3}>
      <h4 className="text-white">Sitemap</h4>
      <ul className="list-unstyled">
        <li>
          <Link to="/">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about">
            About
          </Link>
        </li>
        <li>
          <Link to="/projects">
            Projects
          </Link>
        </li>
        <li>
          <Link to="/blog">
            Blog
          </Link>
        </li>
      </ul>
    </Col>
    <Col xs={12} md={6} lg={3}>
      <h4 className="text-white">Contact</h4>
      <ul className="list-unstyled">
        <li>Town,Country</li>
        <li>666420</li>
        <li>mail@mail.com</li>
      </ul>

    </Col>
    <Col xs={12} md={6} lg={3}>
      <h4 className="text-white">Newsletter</h4>
      <p>Here goes the form</p>
    </Col>
  </BaseSection>
)

export default Footer
