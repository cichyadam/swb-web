/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Redirect } from 'react-router-dom'

import {
  Row, Col, Modal, Button, Table, Form, Alert
} from 'react-bootstrap'

import BaseSection from '../../../components/BaseSection'

import BlogService from '../../../services/BlogService'

const BlogModal = ({
  showModal, closeModal, blogPost, handleSave, handleChange, handleCreate, error
}) => (
  <Modal
    show={showModal}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header>
      <Modal.Title id="contained-modal-title-vcenter">
        {blogPost && ('Edit')}
        {!blogPost && ('Create')}
        {' '}
        blog post
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group controlId="formBasicAuthor">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Author"
            defaultValue={blogPost && blogPost.author}
            disabled
          />
        </Form.Group>
        <Form.Group controlId="formBasicTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Title"
            defaultValue={
              blogPost && blogPost.title
            }
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicSubtitle">
          <Form.Label>Subtitle</Form.Label>
          <Form.Control
            type="text"
            name="subtitle"
            placeholder="Subtitle"
            defaultValue={
              blogPost && blogPost.subtitle
            }
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicContent">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows="10"
            type="text"
            name="content"
            placeholder="Content"
            defaultValue={
              blogPost && blogPost.content
            }
            onChange={handleChange}
          />
        </Form.Group>
      </Form>
      {error && (<p className="text-danger">{error}</p>)}
    </Modal.Body>
    <Modal.Footer>
      {blogPost && (
        <Button
          variant="success"
          onClick={() => handleSave(blogPost._id)}
        >
          Save
        </Button>
      )}
      {!blogPost && (
        <Button
          variant="success"
          onClick={handleCreate}
        >
          Create
        </Button>
      )}
      <Button variant="danger" onClick={closeModal}>Close</Button>
    </Modal.Footer>
  </Modal>
)

const ConfirmModal = ({
  showConfirmModal, closeConfirmModal, handleDelete, postId
}) => (
  <Modal
    show={showConfirmModal}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header>
      <Modal.Title id="contained-modal-title-vcenter">
        Confrim your action
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <h4>Are you sure?</h4>
      <p>
        Once you will delete this blog post it will be removed forever. You
        can not undo this action. I have warned you.
      </p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="success" onClick={() => handleDelete(postId)}>Delete</Button>
      <Button variant="danger" onClick={closeConfirmModal}>Close</Button>
    </Modal.Footer>
  </Modal>
)

const formatDate = (date) => moment(date).format('DD/MM/YY')

const AdminBlog = ({ token }) => {
  const [showModal, setShowModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showAlert, setShowAlert] = useState(true)
  const [blogPosts, setBlogPosts] = useState()
  const [blogPost, setBlogPost] = useState()
  const [author, setAuthor] = useState()
  const [title, setTitle] = useState()
  const [subtitle, setSubtitle] = useState()
  const [content, setContent] = useState()
  const [imageUrl, setImageUrl] = useState()

  const [message, setMessage] = useState()
  const [error, setError] = useState()

  const handleChange = (event) => {
    if (event.target.name === 'title') {
      setTitle(event.target.value)
    }
    if (event.target.name === 'subtitle') {
      setSubtitle(event.target.value)
    }
    if (event.target.name === 'content') {
      setContent(event.target.value)
    }
  }

  const handleList = async () => {
    try {
      const response = (await BlogService.list()).data
      setBlogPosts(response)
    } catch (err) {
      setMessage(err.response.data.message)
    }
  }

  const handleOnePost = async (id) => {
    try {
      const response = (await BlogService.listOne(id)).data
      setBlogPost(response)
    } catch (err) {
      setMessage(err.response.data.message)
    }
  }

  const handleOpen = (id) => {
    setShowModal(true)
    handleOnePost(id)
  }

  const handleClose = () => {
    setBlogPost()
    setShowModal(false)
  }

  const handleSave = async (id) => {
    handleList()
    handleClose()
    const data = {
      author,
      title,
      subtitle,
      content,
      imageUrl
    }
    try {
      const response = (await BlogService.edit(id, token, data)).data
      setMessage(response.message)
    } catch (err) {
      setMessage(err.response.data.message)
    }
  }

  const handleCreate = async () => {
    const data = {
      author,
      title,
      subtitle,
      content,
      imageUrl
    }
    try {
      const response = (await BlogService.create(token, data)).data
      setMessage(response.message)
      handleClose()
      handleList()
    } catch (err) {
      setError(err.response.data.message)
    }
  }


  const handleConfirmOpen = () => {
    setShowConfirmModal(true)
  }

  const handleConfirmClose = () => {
    setShowConfirmModal(false)
  }

  const handleDelete = async (id) => {
    handleList()
    handleConfirmClose()
    try {
      const response = (await BlogService.delete(id, token)).data
      setMessage(response.message)
    } catch (err) {
      setMessage(err.response.data.message)
    }
  }

  const handleAlertClose = () => {
    setMessage()
    setShowAlert(false)
  }

  useEffect(() => {
    handleList()
    // This will be removed once the image upload will be done
    setImageUrl('image.png')
    setAuthor('Adam')
  }, [])


  if (!token) {
    return (
      <Redirect to="/" />
    )
  }

  return (
    <BaseSection fullScreen>
      <Col lg={12}>
        <div className="mx-auto d-flex flex-column align-items-center">
          <h2>Manage blog</h2>
        </div>
      </Col>
      <Col lg={12}>
        <Row>
          <Col lg={12}>
            <Button onClick={handleOpen} variant="dark">
              Create Blog Post
            </Button>
            <BlogModal
              blogPost={blogPost}
              showModal={showModal}
              closeModal={handleClose}
              handleCreate={handleCreate}
              handleSave={handleSave}
              handleChange={handleChange}
              error={error}
            />
          </Col>
        </Row>
        <Row className="py-4">
          <Col lg={12}>
            {message && (
              <Alert variant="success" onClose={handleAlertClose} dismissible>
                <p>{message}</p>
              </Alert>
            )}
          </Col>
          <Col lg={12}>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogPosts && blogPosts.map((post) => (
                  <tr key={post._id}>
                    <td>{formatDate(post.updatedAt)}</td>
                    <td>{post.title}</td>
                    <td>{post.author}</td>
                    <td className="d-flex justify-content-center">
                      <>
                        <Button
                          variant="dark"
                          className="mr-4"
                          onClick={() => handleOpen(post._id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          onClick={handleConfirmOpen}
                        >
                          Delete
                        </Button>
                        <ConfirmModal
                          showConfirmModal={showConfirmModal}
                          closeConfirmModal={handleConfirmClose}
                          handleDelete={handleDelete}
                          postId={post._id}
                        />
                      </>
                    </td>
                  </tr>

                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Col>
    </BaseSection>
  )
}

AdminBlog.propTypes = {
  token: PropTypes.string
}

AdminBlog.defaultProps = {
  token: undefined
}

BlogModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleCreate: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  blogPost: PropTypes.shape({
    _id: PropTypes.number,
    author: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    content: PropTypes.string
  })
}

BlogModal.defaultProps = {
  blogPost: undefined
}

ConfirmModal.propTypes = {
  showConfirmModal: PropTypes.bool.isRequired,
  closeConfirmModal: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired
}


export default AdminBlog
