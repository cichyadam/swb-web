/* eslint-disable global-require */
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
  const [album, setAlbum] = useState()

  const [images, setImages] = useState([])
  const [image, setImage] = useState()

  const [selectedImages, setSelectedImages] = useState([])
  const [multipleSelectedImages, setMultipleSelectedImages] = useState([])

  const [showAlbumModal, setShowAlbumModal] = useState(false)
  const [albumName, setAlbumName] = useState()

  const [showImageModal, setShowImageModal] = useState(false)

  const [fileList, setFileList] = useState([])


  const { addToast } = useToasts()

  const listAlbums = async () => {
    try {
      const response = (await AlbumService.list(token)).data.data
      setAlbums(response)
      setAlbum(null)
    } catch (err) {
      addToast(err.response.data.message, {
        appearance: 'error',
        autoDismiss: false
      })
    }
  }

  const listImages = async () => {
    try {
      const response = (await ImageService.list()).data.data
      setImages(response)
      setImage(null)
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

  const listOneImage = async (id) => {
    try {
      const response = (await ImageService.listOne(id)).data.data
      setImage(response)
    } catch (err) {
      addToast(err.response.data.message, {
        appearance: 'error',
        autoDismiss: false
      })
    }
  }

  const filterSelectedImages = () => {
    // eslint-disable-next-line consistent-return
    const filteredImages = images.filter(
      (image) => selectedImages.indexOf(image.id) !== -1
    )
    setMultipleSelectedImages(filteredImages)
  }


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
    setFileList([])
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
    if (activeSection === 'albums') listOneAlbum(id)
    if (activeSection === 'images') {
      setSelectedImages(selectedImages.concat(id))
      listOneImage(id)
      filterSelectedImages()
      if (image) {
        setImage(null)
        console.log('second image clicked -> show selection of many images')
      }
    }
    /* TO DO : List images of selected album  */
  }

  const handleChange = (event) => {
    if (event.target.name === 'name') setAlbumName(event.target.value)
  }


  useEffect(() => {
    if (activeSection === 'albums') listAlbums()
    if (activeSection === 'images') listImages()
  }, [activeSection])

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
                token={token}
                albums={albums}
                showModal={showImageModal}
                fileList={fileList}
                setFileList={setFileList}
                closeModal={handleImageModalClose}
                listImages={listImages}
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
              className="my-3 album-icon text-center"
              onClick={(event) => handleSelection(event, album.id)}
            >
              <FaFolderOpen size={80} />
              <p className="text-uppercase">
                {album.name}
              </p>
            </Col>
          ))}
          {activeSection === 'images' && images && images.map((image) => (
            <Col
              lg={4}
              key={image.title}
              id={image.id}
              className="my-3 album-icon"
              onClick={(event) => handleSelection(event, image.id)}
            >
              <Image
                src={
                  // eslint-disable-next-line import/no-dynamic-require
                  require(`../../../../../server/src/public/images/small/${image.url}`)
                }
                fluid
                rounded
              />
              <p className="text-center text-uppercase">
                {image.title}
                {' '}
              </p>
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
        {
          activeSection === 'images'
          && image
          && multipleSelectedImages
          && multipleSelectedImages.length <= 1
          && (
            <GalleryPreviewItem
              token={token}
              id={image._id}
              name={image.title}
              type="image"
              imgSrc={image.url}
              listItems={listImages}
            />
          )
        }
        {
          activeSection === 'images'
          && multipleSelectedImages
          && multipleSelectedImages.length > 1
          && (
            <GalleryPreviewItem
              token={token}
              type="image"
              images={multipleSelectedImages}
              listItems={listImages}
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
