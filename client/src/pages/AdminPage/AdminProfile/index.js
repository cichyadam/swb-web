import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Col, Form, Button } from 'react-bootstrap'

import BaseSection from '../../../components/BaseSection'

import AuthService from '../../../services/AuthService'


const AdminProfile = ({ userData, token }) => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState()
  const [success, setSuccess] = useState()

  const handleChange = (event) => {
    if (event.target.name === 'username') {
      setUsername(event.target.value)
    }
    if (event.target.name === 'password') {
      setPassword(event.target.value)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = {
      username,
      password
    }
    try {
      const response = await AuthService.update(token, userData.id, data)
      setSuccess(`${response.message} has been successfully updated.`)
    } catch (err) {
      setError(err.response)
    }
  }

  return (
    <BaseSection>
      <Col lg={12}>
        <h3>
          Hello
          {' '}
          {userData.username}
          (
          {userData.role.name}
          )
        </h3>
      </Col>
      <Col lg={4} className="mx-auto">
        <h5>Change username or password</h5>
        <Form onSubmit={(event) => handleSubmit(event)}>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              type="username"
              placeholder={userData.username}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="success" type="submit">
            Change
          </Button>
        </Form>
      </Col>
    </BaseSection>
  )
}

AdminProfile.propTypes = {
  token: PropTypes.string.isRequired,
  userData: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    role: PropTypes.string
  })
}

AdminProfile.defaultProps = {
  userData: PropTypes.shape({
    id: undefined,
    username: undefined,
    role: undefined
  })
}

export default AdminProfile
