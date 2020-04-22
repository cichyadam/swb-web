import React from 'react'
import { Col } from 'react-bootstrap'

import BaseSection from '../../../../components/BaseSection'

const GallerySection = () => (
  <BaseSection>
    <Col xs={12} lg={8} className="offset-lg-2">
      <h2>Here goes the carrousel of photos</h2>
    </Col>
  </BaseSection>
)

export default GallerySection
