import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

const Header = () => (
  <Navbar bg="white" expand="lg">
    <Nav>
      <Nav.Item>
        <Nav.Link>
          <Link to="/">
            Home
          </Link>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link>
          <Link to="/about">
            About
          </Link>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link>
          <Link to="/projects">
            Projects
          </Link>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link>
          <Link to="/blog">
            Blog
          </Link>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  </Navbar>
)

export default Header
