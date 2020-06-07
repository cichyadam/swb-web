/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useToasts } from 'react-toast-notifications'

import { Modal, Button, Form } from 'react-bootstrap'

import FileInput from '../../../../components/FileInput'

import ImageService from '../../../../services/ImageService'

const ImageModal = ({
  token,
  showModal,
  closeModal,
  albums
}) => {
  const [fileList, setFileList] = useState([])
  const [titles, setTitles] = useState([])
  const [albumId, setAlbumId] = useState([])
  const [typingTimeout, setTypingTimeout] = useState(0)
  const [, setTyping] = useState(false)

  const { addToast } = useToasts()

  const handleFileList = (files) => {
    setFileList(files)
  }


  const handleTitles = (event) => {
    if (typingTimeout) setTypingTimeout(0)
    if (event.target.name === 'title') {
      const title = event.target.value
      setTyping(false)
      setTimeout(() => {
        setTitles(titles.concat(title))
      }, 2000)
    }
  }

  const handleImageUpload = async () => {
    const data = new FormData()
    for (let i = 0; i < fileList.length; i += 1) {
      data.append('images', fileList[i])
      data.append('title', titles[i])
      data.append('album', albumId)
    }
    try {
      await ImageService.create(token, data)
      addToast('Images successfully uploaded', {
        appearance: 'success',
        autoDismiss: false
      })
      closeModal()
    } catch (err) {
      addToast(err.response.data.message, {
        appearance: 'error',
        autoDismiss: false
      })
    }
  }

  const handleAlbumId = (event) => {
    if (event.target.name === 'albums') {
      const albumIndex = event.target.selectedIndex
      if (albums[albumIndex - 1] === undefined) {
        setAlbumId(null)
      } else {
        const idOfAlbum = albums[albumIndex - 1].id
        setAlbumId(idOfAlbum)
      }
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
          Upload Images
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-upload">
        <FileInput
          name="image upload"
          multiple
          onValueChange={(files) => handleFileList(files)}
        />
      </Modal.Body>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicName">
            <Form.Label>
              Create title for images
            </Form.Label>
            {fileList && Array.from(fileList).map((file) => (
              <Form.Group key={file.name} controlId={file.name}>
                <Form.Label>{file.name}</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Title of image"
                  onChange={handleTitles}
                />
              </Form.Group>
            ))}
          </Form.Group>
          <Form.Group controlId="formBasicName">
            <Form.Label>
              Assign to album
            </Form.Label>
            <Form.Control as="select" name="albums" onChange={handleAlbumId}>
              <option selected disabled>Choose one album</option>
              {albums && albums.map((album) => (
                <option key={album._id} id={album._id}>
                  {album.name}
                </option>
              ))}
              <option id="null">uncategorised</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleImageUpload}>Upload</Button>
        <Button variant="danger" onClick={closeModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

ImageModal.propTypes = {
  token: PropTypes.string.isRequired,
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  albums: PropTypes.node.isRequired
}

export default ImageModal
