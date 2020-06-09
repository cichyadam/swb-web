import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'

import BaseSection from '../../../../components/BaseSection'

import BlogList from './BlogList'

import BlogService from '../../../../services/BlogService'

const BlogSection = () => {
  const [blogPosts, setBlogPosts] = useState([])
  const [error, setError] = useState()

  const listBlogPosts = async () => {
    try {
      const response = (await (BlogService.list())).data
      setBlogPosts(response)
    } catch (err) {
      setError(err.data)
    }
  }

  useEffect(() => {
    listBlogPosts()
  }, [])

  return (
    <BaseSection fullScreen>
      <Col xs={12} lg={6} className="offset-lg-3 text-center">
        <h1>News</h1>
        <h4>Skate World Better</h4>
        {error && <p className="text-danger">{error.message}</p>}
      </Col>
      <Col lg={12}>
        <Row className="my-5">
          <BlogList blogPosts={blogPosts} />
        </Row>
      </Col>
    </BaseSection>
  )
}

export default BlogSection
