import React from 'react'
import PropTypes from 'prop-types'

import { Modal, Button, Form } from 'react-bootstrap'

const TagModal = ({
  showTagModal,
  closeTagModal,
  handleTagChange,
  handleTagCreate,
  tagError
}) => (
  <Modal
    show={showTagModal}
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header>
      <Modal.Title id="contained-modal-title-vcenter">
        Create Tag
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group controlId="formBasicAuthor">
          <Form.Label>Tag name</Form.Label>
          <Form.Control
            type="text"
            name="tagName"
            placeholder="Tag name"
            onChange={handleTagChange}
          />
        </Form.Group>
      </Form>
      {tagError && (<p className="text-danger">{tagError}</p>)}
    </Modal.Body>
    <Modal.Footer>
      <Button
        variant="success"
        onClick={() => handleTagCreate()}
      >
        Save
      </Button>
      <Button variant="danger" onClick={closeTagModal}>Close</Button>
    </Modal.Footer>
  </Modal>
)

TagModal.propTypes = {
  tagError: PropTypes.string.isRequired,
  showTagModal: PropTypes.bool.isRequired,
  closeTagModal: PropTypes.func.isRequired,
  handleTagChange: PropTypes.func.isRequired,
  handleTagCreate: PropTypes.func.isRequired
}

export default TagModal
