import React from 'react'

import { Form } from 'react-bootstrap'

const GalleryFilter = () => (
  <>
    <Form inline>
      <p>Sort by:</p>
      <Form.Group controlId="dateCreated" className="ml-2">
        <Form.Control as="select">
          <option selected disabled>Date created</option>
          <option>Newest to oldest</option>
          <option>Oldest to newest</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="Author" className="ml-2">
        <Form.Control as="select">
          <option selected disabled>Author</option>
          <option>Adam</option>
          <option>Ted</option>
          <option>Martin</option>
        </Form.Control>
      </Form.Group>
      <p className="ml-2">No.:</p>
      <Form.Group controlId="Count" className="ml-2">
        <Form.Control as="select">
          <option selected>12</option>
          <option>18</option>
          <option>24</option>
        </Form.Control>
      </Form.Group>
    </Form>
  </>
)

export default GalleryFilter
