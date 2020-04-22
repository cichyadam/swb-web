import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import PropTypes from 'prop-types'

import AuthService from '../../services/AuthService'
import BaseSection from '../../components/BaseSection'

const AdminPage = ({ token, saveToken }) => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState()

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
    const user = {
      username,
      password
    }

    try {
      const response = (await AuthService.login(user)).data
      const authToken = response.token
      sessionStorage.setItem('token', authToken)
      saveToken(authToken)
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  if (token) {
    return (
      <BaseSection fullScreen>
        <div className="mx-auto d-flex flex-column align-items-center">
          <h2>Login successful</h2>
          <h2>Welcome to the Admin Panel!</h2>
        </div>
      </BaseSection>
    )
  }
  return (
    <BaseSection fullScreen>
      <Form className="mx-auto" onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            type="username"
            placeholder="Enter username"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <p className="mt-4 text-danger">
          {error && error}
        </p>
      </Form>
    </BaseSection>
  )
}

AdminPage.propTypes = {
  token: PropTypes.string,
  saveToken: PropTypes.func.isRequired
}

AdminPage.defaultProps = {
  token: undefined
}

export default AdminPage
