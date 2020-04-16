import React from 'react'
import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'

const Header = () => (
  <Nav defaultActiveKey="/" as="ul">
    <Nav.Item as="li">
      <Nav.Link>
        <Link to="/">
          Home
        </Link>
      </Nav.Link>
    </Nav.Item>
    <Nav.Item as="li">
      <Nav.Link>
        <Link to="/about">
          About
        </Link>
      </Nav.Link>
    </Nav.Item>
    <Nav.Item as="li">
      <Nav.Link>
        <Link to="/projects">
          Projects
        </Link>
      </Nav.Link>
    </Nav.Item>
    <Nav.Item as="li">
      <Nav.Link>
        <Link to="/blog">
          Blog
        </Link>
      </Nav.Link>
    </Nav.Item>
  </Nav>

)

export default Header
