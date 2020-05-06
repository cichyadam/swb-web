/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Redirect } from 'react-router-dom'

import {
  Row, Col, Button, Table, Alert
} from 'react-bootstrap'

import BaseSection from '../../../components/BaseSection'
import BlogModal from './BlogModal'
import ConfirmModal from './ConfirmModal'

import BlogService from '../../../services/BlogService'
import TagService from '../../../services/TagService'

const formatDate = (date) => moment(date).format('DD/MM/YY')

const AdminBlog = ({ token }) => {
  const [showModal, setShowModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showAlert, setShowAlert] = useState(true)
  const [blogPosts, setBlogPosts] = useState()
  const [tags, setTags] = useState()
  const [blogPost, setBlogPost] = useState()

  // TO DO: save everyhing below to blogPost state
  const [author, setAuthor] = useState()
  const [title, setTitle] = useState()
  const [subtitle, setSubtitle] = useState()
  const [content, setContent] = useState()
  const [imageUrl, setImageUrl] = useState()
  const [activeTags, setActiveTags] = useState([])

  const [message, setMessage] = useState()
  const [error, setError] = useState()

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

  const handleTags = async () => {
    try {
      const response = (await TagService.list()).data
      setTags(response)
    } catch (err) {
      setMessage(err.response.data.message)
    }
  }

  const handleRemoveTag = (id) => {
    const tagToDelete = activeTags.map((tag) => {
      if (tag._id === id) {
        return tag
      }
    }).filter((tag) => {
      if (tag !== undefined) {
        return tag
      }
    })
    const filteredTags = activeTags.map((tag) => {
      const isRemoved = tag._id === tagToDelete._id
      if (isRemoved) {
        return tag
      }
    })
    console.log(filteredTags)
  }

  const filterTags = (isDisabled) => {
    const filteredTags = tags.map((tag) => {
      const isSelected = activeTags.some((activeTag) => tag._id === activeTag._id)

      if (isSelected) {
        return {
          ...tag,
          isDisabled
        }
      }
      return tag
    })
    setTags(filteredTags)
  }

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
    if (event.target.name === 'tags') {
      const tagIndex = event.target.selectedIndex
      const _id = event.target[tagIndex].id
      const name = event.target.value
      setActiveTags(activeTags.concat({ _id, name }))
      filterTags(true)
      console.log(tags)
    }
  }

  const handleOpen = (id) => {
    setShowModal(true)
    handleOnePost(id)
  }

  const handleClose = () => {
    setBlogPost()
    setActiveTags([])
    filterTags(false)
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
    handleTags()
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
              activeTags={activeTags}
              blogPost={blogPost}
              error={error}
              tags={tags}
              showModal={showModal}
              closeModal={handleClose}
              handleCreate={handleCreate}
              handleSave={handleSave}
              handleChange={handleChange}
              handleRemoveTag={handleRemoveTag}
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

export default AdminBlog