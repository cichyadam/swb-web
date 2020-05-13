import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import { Col, Form, Button } from 'react-bootstrap'

import AuthService from '../../../services/AuthService'

import BaseSection from '../../../components/BaseSection'

const AdminUsers = ({ token }) => {
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState()

  const handleChange = (event) => {
    if (event.target.name === 'firstName') {
      setFirstName(event.target.value)
    }
    if (event.target.name === 'lastName') {
      setLastName(event.target.value)
    }
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
      firstName,
      lastName,
      username,
      password
    }

    try {
      const response = (await AuthService.register(user)).data.data
      console.log(response)
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  if (!token) {
    return (
      <Redirect to="/" />
    )
  }

  return (
    <BaseSection fullScreen>
      <Col lg={12}>
        <div className="mx-auto d-flex flex-column align-items-center">
          <h2>Create user accounts</h2>
        </div>
      </Col>
      <Col lg={4} className="mx-auto">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              name="firstName"
              type="firstName"
              placeholder="Enter first name"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              name="lastName"
              type="lastName"
              placeholder="Enter last name"
              onChange={handleChange}
            />
          </Form.Group>
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
          <Button variant="success" type="submit">
            Create
          </Button>
          <p className="mt-4 text-danger">
            {error && error}
          </p>
        </Form>
      </Col>
    </BaseSection>
  )
}

AdminUsers.propTypes = {
  token: PropTypes.string
}

AdminUsers.defaultProps = {
  token: undefined
}

export default AdminUsers
