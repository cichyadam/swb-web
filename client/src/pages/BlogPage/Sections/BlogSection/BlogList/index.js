/* eslint-disable no-underscore-dangle */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { Col } from 'react-bootstrap'

const formatDate = (date) => moment(date).format('DD/MM/YY')

const BlogList = ({ blogPosts }) => (
  <>
    {blogPosts && blogPosts.map((post) => (
      <Col lg={4} key={post._id}>
        <h3>{post.title}</h3>
        <p>
          Written by
          {' '}
          {post.author}
          {' '}
          on
          {' '}
          {formatDate(post.createdAt)}
        </p>
        <p>
          Tags:
          {' '}
          <span className="text-light-grey">
            {post && post.tags && post.tags.map((tag) => (
              <>
                {tag.name}
                {' '}
              </>
            ))}
          </span>
        </p>
        <p>
          {post.subtitle}
          ...
        </p>
        <a className="text-blue" href={`/blog/${post._id}`}>
          See more
        </a>
      </Col>
    ))}
  </>
)

BlogList.propTypes = {
  blogPosts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      author: PropTypes.string,
      title: PropTypes.string,
      subtitle: PropTypes.string,
      content: PropTypes.string,
      imageUrl: PropTypes.string,
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
      tags: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string,
          name: PropTypes.string
        })
      )
    })
  ).isRequired
}

export default BlogList
