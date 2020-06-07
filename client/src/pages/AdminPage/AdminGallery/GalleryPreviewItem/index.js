/* eslint-disable global-require */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Form, Image, Button } from 'react-bootstrap'
import { FaFolderOpen } from 'react-icons/fa'
import { useToasts } from 'react-toast-notifications'

import GirlImage from '../../../../assets/images/girl.jpeg'

import AlbumService from '../../../../services/AlbumService'

import DeleteModal from './DeleteModal'
import ImageService from '../../../../services/ImageService'

const GalleryPreviewItem = ({
  token,
  name,
  id,
  imgSrc,
  type,
  listItems,
  images
}) => {
  const [albumName, setAlbumName] = useState()
  const [imageTitle, setImageTitle] = useState()
  const [showEditForm, setShowEditForm] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const { addToast } = useToasts()

  const handleChange = (event) => {
    if (event.target.name === 'name' && type === 'album') {
      setAlbumName(event.target.value)
    }
    if (event.target.name === 'name' && type === 'image') {
      setImageTitle(event.target.value)
    }
  }

  const editAlbum = async (albumId) => {
    const data = {
      name: albumName
    }
    try {
      await AlbumService.edit(albumId, token, data)
      addToast('Album was successfully edited', {
        appearance: 'success',
        autoDismiss: false
      })
      listItems()
    } catch (err) {
      addToast(err.response.data.message, {
        appearance: 'error',
        autoDismiss: false
      })
    }
  }

  const editImage = async (imageId) => {
    const data = {
      title: imageTitle
    }
    try {
      await ImageService.edit(imageId, token, data)
      addToast('Image was successfully edited', {
        appearance: 'success',
        autoDismiss: false
      })
      listItems()
    } catch (err) {
      addToast(err.response.data.message, {
        appearance: 'error',
        autoDismiss: false
      })
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
      addToast('Album was successfully deleted', {
        appearance: 'success',
        autoDismiss: false
      })
    } catch (err) {
      addToast(err.response.data.message, {
        appearance: 'error',
        autoDismiss: false
      })
    }
  }

  const handleImageDelete = async (imageIds) => {
    // Subject to change if passing multiple
    const images = [imageIds]
    try {
      const response = (await ImageService.delete(token, images)).data

      if (response) {
        listItems()
        setShowModal(false)
      }
      addToast('Image was successfully deleted', {
        appearance: 'success',
        autoDismiss: false
      })
    } catch (err) {
      addToast(err.response.data.message, {
        appearance: 'error',
        autoDismiss: false
      })
    }
  }

  const handleDelete = (idToDelete) => {
    if (type === 'album') handleAlbumDelete(idToDelete)
    if (type === 'image') handleImageDelete(idToDelete)
  }


  const handleEditForm = () => {
    setShowEditForm(true)
  }

  const handleEdit = (event) => {
    if (type === 'album') editAlbum(event.target.id)
    if (type === 'image') editImage(event.target.id)
    setShowEditForm(false)
  }

  const handleOpen = () => {
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
  }
  if (!images) {
    return (
      <div id={id} className="d-flex flex-column align-items-center item-preview">
        {type === 'album' && (<FaFolderOpen size={80} />)}
        {type === 'image' && (
          <Image
            src={
            // eslint-disable-next-line import/no-dynamic-require
              require(`../../../../../../server/src/public/images/small/${imgSrc}`)
            }
            fluid
            rounded
          />
        )}
        <p className="py-4">
          {type === 'album' && 'Name'}
          {type === 'image' && 'Title'}
          {' '}
          of
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
            handleDelete={handleDelete}
            id={id}
            type={type}
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
                {type === 'album' && 'Name'}
                {type === 'image' && 'Title'}
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
      </div>
    )
  }
  return (
    <div>
      {images && images.map((image) => (
        <Image
          src={
            // eslint-disable-next-line import/no-dynamic-require
            require(`../../../../../../server/src/public/images/small/${image.url}`)
          }
          fluid
          rounded
          className="my-2"
        />
      ))}
      <Button variant="danger" className="d-block mx-auto my-2">
        Delete all
      </Button>
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
