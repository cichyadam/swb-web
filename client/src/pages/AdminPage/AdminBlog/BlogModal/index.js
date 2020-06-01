/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Modal, Button, Form } from 'react-bootstrap'
import { useToasts } from 'react-toast-notifications'

import TagModal from './TagModal'

import TagService from '../../../../services/TagService'

const BlogModal = ({
  token,
  author,
  showModal,
  closeModal,
  blogPost,
  handleSave,
  handleChange,
  handleCreate,
  handleRemoveTag,
  handleTags,
  tags,
  activeTags
}) => {
  const [showTagModal, setShowTagModal] = useState(false)
  const [tagName, setTagName] = useState()

  const { addToast } = useToasts()

  const handleConfirmOpen = () => {
    setShowTagModal(true)
  }

  const handleConfirmClose = () => {
    setShowTagModal(false)
  }

  const handleTagChange = (event) => {
    if (event.target.name === 'tagName') {
      setTagName(event.target.value)
    }
  }


  const handleTagCreate = async () => {
    const data = {
      name: tagName
    }
    try {
      await TagService.create(token, data)
      handleConfirmClose()
      handleTags()
    } catch (err) {
      addToast(err.response.data.message, {
        appearance: 'error',
        autoDismiss: false
      })
    }
  }

  return (
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
              placeholder={author}
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
          <Form.Group>
            <Form.Label>Tags</Form.Label>
            <Form.Control as="select" name="tags" onChange={handleChange}>
              <option selected disabled>Choose some tags</option>
              {tags && tags.map((tag) => (
                <option key={tag._id} id={tag._id} disabled={tag.isDisabled}>
                  {tag.name}
                </option>
              ))}
            </Form.Control>
            <Button
              variant="success"
              className="mt-2"
              onClick={handleConfirmOpen}
            >
              Create new tag
            </Button>
            <TagModal
              showTagModal={showTagModal}
              closeTagModal={handleConfirmClose}
              handleTagChange={handleTagChange}
              handleTagCreate={handleTagCreate}
            />
          </Form.Group>
          {activeTags && activeTags.map((activeTag) => (
            <Button
              key={activeTag._id}
              className="my-2 mr-2"
              onClick={() => handleRemoveTag(activeTag._id)}
            >
              {activeTag.name}
              {' '}
              {' '}
              x
            </Button>
          ))}
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
}

BlogModal.propTypes = {
  token: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleTags: PropTypes.func.isRequired,
  handleCreate: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleRemoveTag: PropTypes.func.isRequired,
  blogPost: PropTypes.shape({
    _id: PropTypes.number,
    author: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    content: PropTypes.string
  }),
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.number,
      name: PropTypes.string
    })
  ).isRequired,
  activeTags: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.number,
      name: PropTypes.string
    })
  )
}

BlogModal.defaultProps = {
  blogPost: undefined,
  activeTags: undefined
}

export default BlogModal
