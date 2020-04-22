import React from 'react'
import { Col, Image, Button } from 'react-bootstrap'

import BaseSection from '../../../../components/BaseSection'

import blogImg from '../../../../assets/images/blog-template-img.jpeg'

const BlogSection = () => (
  <BaseSection variant="light">
    <h2 className="mx-auto">News</h2>
    <div className="d-flex align-items-center mb-3">
      <Col xs={6}>
        <Image src={blogImg} alt="girl" fluid rounded />
      </Col>
      <Col xs={6}>
        <h3>Blog Heading</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <a href="/"> Read more</a>
      </Col>
    </div>
    <div className="d-flex align-items-center mb-3">
      <Col xs={6}>
        <h3>Blog Heading</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <a href="/"> Read more</a>
      </Col>
      <Col xs={6}>
        <Image src={blogImg} alt="girl" fluid rounded />
      </Col>
    </div>
    <div className="d-flex align-items-center mb-3">
      <Col xs={6}>
        <Image src={blogImg} alt="girl" fluid rounded />
      </Col>
      <Col xs={6}>
        <h3>Blog Heading</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <a href="/"> Read more</a>
      </Col>
    </div>
    <Button href="/blog" variant="outline-dark" className="mx-auto my-4">
      More news
    </Button>
  </BaseSection>
)

export default BlogSection
