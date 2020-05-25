import React from 'react'
import PropTypes from 'prop-types'

import { Modal, Button, Form } from 'react-bootstrap'

const AlbumModal = ({
  showModal,
  closeModal,
  handleChange,
  handleCreate,
  error
}) => (
  <Modal
    show={showModal}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header>
      <Modal.Title id="contained-modal-title-vcenter">
        Create new album
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form className="mt-5">
        <Form.Group controlId="formBasicName">
          <Form.Label>
            Album name
          </Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Here goes the name of album"
            onChange={handleChange}
          />
        </Form.Group>
        {error && (<p className="text-danger">{error}</p>)}
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="danger" onClick={closeModal}>Close</Button>
      <Button variant="success" onClick={() => handleCreate()}>Create</Button>
    </Modal.Footer>
  </Modal>
)

AlbumModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  handleCreate: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  error: PropTypes.string
}

AlbumModal.defaultProps = {
  error: undefined
}

export default AlbumModal
