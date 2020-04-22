import React from 'react'
import PropTypes from 'prop-types'

const SponsorsImage = ({ link, src, alt }) => (
  <a href={link} target="_blank" rel="noreferrer noopener" className="sponsor">
    <img src={src} alt={alt} />
  </a>
)

SponsorsImage.propTypes = {
  link: PropTypes.string.isRequired,
  src: PropTypes.node.isRequired,
  alt: PropTypes.string.isRequired
}

export default SponsorsImage
