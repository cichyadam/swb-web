import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Form, Image, Button } from 'react-bootstrap'
import { FaFolderOpen } from 'react-icons/fa'

import GirlImage from '../../../../assets/images/girl.jpeg'

import AlbumService from '../../../../services/AlbumService'

import DeleteModal from './DeleteModal'

const GalleryPreviewItem = ({
  token,
  name,
  id,
  imgSrc,
  type,
  listItems
}) => {
  const [albumName, setAlbumName] = useState()
  const [showEditForm, setShowEditForm] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [message, setMessage] = useState()

  const handleChange = (event) => {
    if (event.target.name === 'name' && type === 'album') {
      setAlbumName(event.target.value)
    }
  }

  const editAlbum = async (albumId) => {
    const data = {
      name: albumName
    }
    try {
      const response = (await AlbumService.edit(albumId, token, data)).data

      if (response) listItems()
    } catch (err) {
      setMessage(err.response.data.message)
    }
  }

  const handleAlbumDelete = async (albumIds) => {
    // Subject to change if passing multiple
    const albums = [albumIds].toString()
    try {
      const response = (await AlbumService.delete(token, albums)).data

      if (response) {
        listItems()
        setShowModal(false)
      }
    } catch (err) {
      setMessage(err.response.data.message)
    }
  }

  /* TO DO : Handle edit of image title and handle delete of image */

  const handleEditForm = () => {
    setShowEditForm(true)
  }

  const handleEdit = (event) => {
    editAlbum(event.target.id)
    setShowEditForm(false)
  }

  const handleOpen = () => {
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <div id={id} className="d-flex flex-column align-items-center item-preview">
      {type === 'album' && (<FaFolderOpen size={80} />)}
      {type === 'image' && (<Image src={imgSrc} alt={name} fluid rounded />)}
      <p className="py-4">
        Name of
        {' '}
        {type}
        :
        {' '}
        {name}
      </p>
      <div className="d-flex flex-row justify-content-center">
        <Button className="mx-2" onClick={handleEditForm}>
          Edit
        </Button>
        <Button variant="danger" className="mx-2" onClick={handleOpen}>
          Delete
        </Button>
        <DeleteModal
          showModal={showModal}
          closeModal={handleClose}
          handleDelete={handleAlbumDelete}
          id={id}
        />
      </div>
      {showEditForm && (
        <Form className="mt-5">
          <Form.Group controlId="formBasicName">
            <Form.Label>
              Edit
              {' '}
              {type}
              {' '}
              Name
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder={name}
              onChange={handleChange}
            />
          </Form.Group>
          <Button
            id={id}
            variant="success"
            onClick={(event) => handleEdit(event)}
          >
            Save
          </Button>
        </Form>
      )}
      {message && (<p className="text-danger">{message}</p>)}
    </div>
  )
}

GalleryPreviewItem.propTypes = {
  token: PropTypes.string.isRequired,
  name: PropTypes.string,
  id: PropTypes.string,
  imgSrc: PropTypes.node,
  type: PropTypes.string.isRequired,
  listItems: PropTypes.func.isRequired
}

GalleryPreviewItem.defaultProps = {
  name: undefined,
  id: undefined,
  imgSrc: GirlImage
}


export default GalleryPreviewItem
