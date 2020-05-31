import React from 'react'
import { Col } from 'react-bootstrap'

import BaseSection from '../../../../components/BaseSection'

const BlogSection = () => (
  <BaseSection fullScreen>
    <Col xs={12} lg={6} className="offset-lg-3 text-center">
      <h1>News</h1>
      <h4>Skate World Better</h4>
    </Col>
  </BaseSection>
)

export default BlogSection
