import React from 'react'
import PropTypes from 'prop-types'

import { Modal, Button } from 'react-bootstrap'

const ConfirmModal = ({
  showConfirmModal,
  closeConfirmModal,
  handleDelete,
  userId
}) => (
  <Modal
    show={showConfirmModal}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header>
      <Modal.Title id="contained-modal-title-vcenter">
        Confrim user delete
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <h4>Are you sure?</h4>
      <p>
        Once you will delete this user it will be removed forever. You
        can not undo this action. I have warned you.
      </p>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={closeConfirmModal}>Close</Button>
      <Button variant="danger" onClick={() => handleDelete(userId)}>Delete</Button>
    </Modal.Footer>
  </Modal>
)

ConfirmModal.propTypes = {
  showConfirmModal: PropTypes.bool.isRequired,
  closeConfirmModal: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired
}

export default ConfirmModal
