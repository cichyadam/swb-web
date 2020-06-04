/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'

import {
  Row,
  Col,
  Button,
  Image
} from 'react-bootstrap'

import { FaFolderOpen } from 'react-icons/fa'

import BaseSection from '../../../components/BaseSection'

import GalleryNav from './GalleryNav'
import GalleryFilter from './GalleryFilter'
import GalleryPreviewItem from './GalleryPreviewItem'

import AlbumService from '../../../services/AlbumService'
import ImageService from '../../../services/ImageService'

import AlbumModal from './AlbumModal'
import ImageModal from './ImageModal'


const AdminGallery = ({ token }) => {
  const [activeSection, setActiveSection] = useState()

  const [albums, setAlbums] = useState([])
  const [album, setAlbum] = useState([])

  const [images, setImages] = useState([])
  /* const [image, setImage] = useState([]) */

  const [showAlbumModal, setShowAlbumModal] = useState(false)
  const [albumName, setAlbumName] = useState()

  const [showImageModal, setShowImageModal] = useState(false)


  const { addToast } = useToasts()


  const listAlbums = async () => {
    try {
      const response = (await AlbumService.list(token)).data.data
      setAlbums(response)
    } catch (err) {
      addToast(err.response.data.message, {
        appearance: 'error',
        autoDismiss: false
      })
    }
  }

  const listImages = async () => {
    try {
      const response = (await ImageService.list(token)).data.data
      setImages(response)
    } catch (err) {
      addToast(err.response.data.message, {
        appearance: 'error',
        autoDismiss: false
      })
    }
  }

  const listOneAlbum = async (id) => {
    try {
      const response = (await AlbumService.listOne(token, id)).data.data
      setAlbum(response)
    } catch (err) {
      addToast(err.response.data.message, {
        appearance: 'error',
        autoDismiss: false
      })
    }
  }

  /*  const listOneImage = async (id) => {
    try {
      const response = (await ImageService.listOne(token, id)).data.data
      setImage(response)
    } catch (err) {
      setMessage(err.response.data.message)
    }
  } */


  const handleOpen = () => {
    setShowAlbumModal(true)
  }

  const handleClose = () => {
    setShowAlbumModal(false)
  }

  const handleImageModalOpen = () => {
    setShowImageModal(true)
  }

  const handleImageModalClose = () => {
    setShowImageModal(false)
  }

  const createAlbum = async () => {
    const data = {
      name: albumName
    }
    try {
      await AlbumService.create(token, data)
      addToast('Album was successfully created', {
        appearance: 'success',
        autoDismiss: false
      })
      listAlbums()
      handleClose()
    } catch (err) {
      addToast(err.response.data.message, {
        appearance: 'error',
        autoDismiss: false
      })
    }
  }

  const handleSelection = (event, id) => {
    event.preventDefault()
    listOneAlbum(id)
    /* TO DO : List images of selected album  */


    // listOneImage(event.target.id)
  }

  const handleChange = (event) => {
    if (event.target.name === 'name') {
      setAlbumName(event.target.value)
    }
  }


  useEffect(() => {
    listAlbums()
    listImages()
  }, [])

  if (!token) {
    return (
      <Redirect to="/" />
    )
  }

  return (
    <BaseSection fullScreen fluid>
      <Col lg={1}>
        <GalleryNav setActiveSection={setActiveSection} />
      </Col>
      <Col lg={8} className="gallery-main">
        <GalleryFilter />
        {
          activeSection === 'albums'
          && (
            <>
              <Button className="my-3" onClick={() => handleOpen()}>
                Create new album
              </Button>
              <AlbumModal
                showModal={showAlbumModal}
                closeModal={handleClose}
                handleCreate={createAlbum}
                handleChange={handleChange}
              />
            </>
          )
        }
        {
          activeSection === 'images'
          && (
            <>
              <Button className="my-3" onClick={() => handleImageModalOpen()}>
                Upload images
              </Button>
              <ImageModal
                albums={albums}
                showModal={showImageModal}
                closeModal={handleImageModalClose}
              />
            </>
          )
        }
        <Row>
          {activeSection === 'albums' && albums && albums.map((album) => (
            <Col
              lg={4}
              key={album.name}
              id={album.id}
              className="d-flex flex-column align-items-center mx-auto my-3 album-icon"
              onClick={(event) => handleSelection(event, album.id)}
            >
              <FaFolderOpen size={80} />
              <p>{album.name}</p>
            </Col>
          ))}
          {activeSection === 'images' && images && images.map((image) => (
            <Col
              lg={4}
              key={image.name}
              id={image.id}
              className="d-flex flex-column align-items-center mx-auto my-3 album-icon"
              onClick={(event) => handleSelection(event)}
            >
              <Image src={image.src} fluid rounded />
              <p>{album.name}</p>
            </Col>
          ))}
        </Row>
      </Col>
      <Col lg={3}>
        {
          activeSection === 'albums'
          && album
          && (
            <GalleryPreviewItem
              token={token}
              id={album._id}
              name={album.name}
              listItems={listAlbums}
              type="album"
            />
          )
        }
        {/* TO DO : Finish detailed preview of one image */}
        {/* {
          activeSection === 'images'
          && image
          && (
            <GalleryPreviewItem
              token={token}
              id={image._id}
              name={image.name}
              type="album"
              imgSrc={image.src}
            />
          )
        } */}
      </Col>
    </BaseSection>
  )
}

AdminGallery.propTypes = {
  token: PropTypes.string
}

AdminGallery.defaultProps = {
  token: undefined
}

export default AdminGallery
