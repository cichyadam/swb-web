import React from 'react'
import BaseSection from '../../components/BaseSection'
import { Button, Form } from 'react-bootstrap'

const AdminPage = () => (
  <BaseSection fullScreen>
    <Form className="mx-auto">
    <Form.Group controlId="formBasicUsername">
      <Form.Label>Username</Form.Label>
      <Form.Control type="username" placeholder="Enter username" />
    </Form.Group>
    <Form.Group controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" />
    </Form.Group>
    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
  </BaseSection>
)

export default AdminPage
