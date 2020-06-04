/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Modal, Button, Form } from 'react-bootstrap'

import FileInput from '../../../../components/FileInput'

const handleUpload = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.2) {
      resolve()
    } else {
      reject()
    }
  }, 2000)
})

const ImageModal = ({
  showModal,
  closeModal,
  albums
}) => {
  const [fileList, setFileList] = useState()

  const handleFileList = (files) => {
    setFileList(files)
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
          Upload Images
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-upload">
        <FileInput
          upload={handleUpload}
          name="image upload"
          multiple
          onValueChange={(files) => handleFileList(files)}
        />
      </Modal.Body>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicName">
            <Form.Label>
              Assign to album
            </Form.Label>
            <Form.Control as="select" name="albums">
              <option selected disabled>Choose one album</option>
              {albums && albums.map((album) => (
                <option key={album._id} id={album._id}>
                  {album.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={closeModal}>Upload</Button>
        <Button variant="danger" onClick={closeModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

ImageModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
}

export default ImageModal
