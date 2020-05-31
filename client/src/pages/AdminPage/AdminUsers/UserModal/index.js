/* eslint-disable no-underscore-dangle */
import React from 'react'
import PropTypes from 'prop-types'

import { Modal, Form, Button } from 'react-bootstrap'

const UserModal = ({
  roles,
  showModal,
  closeModal,
  handleChange,
  handleSubmit,
  error,
  success
}) => (
  <Modal
    show={showModal}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header>
      <Modal.Title id="contained-modal-title-vcenter">
        Create new user.
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
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
        <Form.Group>
          <Form.Label>Roles</Form.Label>
          <Form.Control as="select" name="roles" onChange={handleChange}>
            <option selected disabled>Choose a role</option>
            {/* eslint-disable-next-line no-shadow */}
            {roles && roles.map((role) => (
              <option key={role._id} id={role._id}>
                {role.name}
              </option>
            ))}
          </Form.Control>
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
        <p className="mt-4 text-success">
          {success && success}
        </p>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="danger" onClick={closeModal}>Close</Button>
    </Modal.Footer>
  </Modal>
)

UserModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  success: PropTypes.string.isRequired,
  roles: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.number,
      name: PropTypes.string
    })
  ).isRequired
}

export default UserModal
