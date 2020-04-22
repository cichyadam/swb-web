import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

const Header = (token) => (
  <Navbar bg="white" expand="lg">
    <Nav>
      { token ? (
        <Nav.Item>
          <Nav.Link>
            <Link to="/logout">
              Logout
            </Link>
          </Nav.Link>
        </Nav.Item>
      )
        : (
          <>
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
          </>
        )}
    </Nav>
  </Navbar>
)

Header.propTypes = {
  token: PropTypes.string
}

Header.defaultProps = {
  token: undefined
}

export default Header
