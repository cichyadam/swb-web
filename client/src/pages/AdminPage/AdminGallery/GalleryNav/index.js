import React from 'react'
import PropTypes from 'prop-types'

import { FaImages, FaFolderOpen } from 'react-icons/fa'

const GalleryNav = ({ setActiveSection }) => {
  const handleClick = (data) => {
    setActiveSection(data)
  }

  return (
    <>
      <div className="d-flex flex-column justify-content-center gallery-side-nav">
        <FaImages size={50} className="my-5" onClick={() => handleClick('images')} />
        <FaFolderOpen size={50} className="my-5" onClick={() => handleClick('albums')} />
      </div>
    </>
  )
}

GalleryNav.propTypes = {
  setActiveSection: PropTypes.func.isRequired
}

export default GalleryNav
