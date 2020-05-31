/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import {
  Col, Button, Table
} from 'react-bootstrap'

import AuthService from '../../../services/AuthService'
import RolesService from '../../../services/RolesService'

import BaseSection from '../../../components/BaseSection'
import UserModal from './UserModal'

const AdminUsers = ({ token, userData }) => {
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [role, setRole] = useState()
  const [roles, setRoles] = useState([])
  const [error, setError] = useState()
  const [success, setSuccess] = useState()

  const [users, setUsers] = useState()

  const [showModal, setShowModal] = useState(false)


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
    if (event.target.name === 'roles') {
      const roleIndex = event.target.selectedIndex
      const _id = event.target[roleIndex].id
      setRole(_id)
    }
    if (event.target.name === 'password') {
      setPassword(event.target.value)
    }
  }

  const listRoles = async () => {
    try {
      const response = (await RolesService.list(token)).data.data.rolesList
      setRoles(response)
    } catch (err) {
      setError(err.response)
    }
  }

  const listUsers = async () => {
    try {
      const response = (await AuthService.list(token)).data.data
      setUsers(response)
    } catch (err) {
      setError(err.response)
    }
  }

  const handleOpenModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const user = {
      firstName,
      lastName,
      username,
      password,
      role
    }
    try {
      const response = (await AuthService.register(user)).data.data
      const userCreated = response.user.username
      setSuccess(`User ${userCreated} was successfuly created`)
    } catch (err) {
      setError(err.response)
    }
  }

  useEffect(() => {
    listRoles()
    listUsers()
  }, [])

  if (!token) {
    return (
      <Redirect to="/" />
    )
  }

  if (userData.role === 'cooperator') {
    return (
      <Redirect to="/admin" />
    )
  }

  return (
    <BaseSection fullScreen>
      <Col lg={12}>
        <Button className="my-4" onClick={handleOpenModal}>
          Create user
        </Button>
        <UserModal
          error={error}
          success={success}
          roles={roles}
          showModal={showModal}
          closeModal={handleCloseModal}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userData.role === 'admin' && users && users
              .filter((user) => (user.role.name !== 'superadmin'))
              .map((filteredUser) => (
                <tr key={filteredUser.username}>
                  <td>{filteredUser.username}</td>
                  <td>{filteredUser.role.name}</td>
                  <td className="d-flex justify-content-center">
                    <>
                      <Button
                        variant="danger"
                      >
                        Delete
                      </Button>
                    </>
                  </td>
                </tr>

              ))}
            {userData.role === 'superadmin' && users && users.map((user) => (
              <tr key={user.username}>
                <td>{user.username}</td>
                <td>{user.role.name}</td>
                <td className="d-flex justify-content-center">
                  <>
                    <Button
                      variant="danger"
                    >
                      Delete
                    </Button>
                  </>
                </td>
              </tr>

            ))}
          </tbody>
        </Table>
      </Col>
    </BaseSection>
  )
}

AdminUsers.propTypes = {
  token: PropTypes.string,
  userData: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    role: PropTypes.string
  }).isRequired
}

AdminUsers.defaultProps = {
  token: undefined
}

export default AdminUsers
