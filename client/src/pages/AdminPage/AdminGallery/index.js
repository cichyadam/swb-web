/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

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


const AdminGallery = ({ token }) => {
  const [activeSection, setActiveSection] = useState()

  const [albums, setAlbums] = useState([])
  const [album, setAlbum] = useState([])

  const [images, setImages] = useState([])
  const [image, setImage] = useState([])

  const [showAlbumModal, setShowAlbumModal] = useState(false)
  const [albumName, setAlbumName] = useState()

  const [message, setMessage] = useState()


  const listAlbums = async () => {
    try {
      const response = (await AlbumService.list(token)).data.data
      setAlbums(response)
    } catch (err) {
      setMessage(err.response.data.message)
    }
  }

  const listImages = async () => {
    try {
      const response = (await ImageService.list(token)).data.data
      setImages(response)
    } catch (err) {
      setMessage(err.response.data.message)
    }
  }

  const listOneAlbum = async (id) => {
    try {
      const response = (await AlbumService.listOne(token, id)).data.data
      setAlbum(response)
    } catch (err) {
      setMessage(err.response.data.message)
    }
  }

  const listOneImage = async (id) => {
    try {
      const response = (await ImageService.listOne(token, id)).data.data
      setImage(response)
    } catch (err) {
      setMessage(err.response.data.message)
    }
  }

  const createAlbum = async (albumName) => {
    const data = {
      name: albumName
    }
    try {
      await AlbumService.create(token, data)
      listAlbums()
    } catch (err) {
      setMessage(err.response.data.message)
    }
  }

  const handleSelection = (event) => {
    event.preventDefault()
    listOneAlbum(event.target.id)
    /* TO DO : List images of selected album  */


    listOneImage(event.target.id)
  }

  const handleOpen = () => {
    setShowAlbumModal(true)
  }

  const handleClose = () => {
    setShowAlbumModal(false)
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
                error={message}
              />
            </>
          )
        }
        {
          activeSection === 'images'
          && (
            <Button className="my-3">
              Upload images
            </Button>
          )
        }
        <Row>
          {activeSection === 'albums' && albums && albums.map((album) => (
            <Col
              lg={4}
              key={album.name}
              id={album.id}
              className="d-flex flex-column align-items-center mx-auto my-3 album-icon"
              onClick={(event) => handleSelection(event)}
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
              type="album"
            />
          )
        }
        {/* TO DO : Finish detailed preview of one image */}
        {
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
        }
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
