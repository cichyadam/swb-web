import React from 'react'
import { Row, Col, Image } from 'react-bootstrap'

import BaseSection from '../../../../components/BaseSection'
import SponsorImage from '../../../../components/SponsorImage'

import SponsorsImg from '../../../../assets/images/sponsors-template-img.jpeg'
import SponsorImg from '../../../../assets/images/sponsor-template-img.png'

const SponsorsSection = () => (
  <BaseSection fullScreen variant="light">
    <Row className="pb-4">
      <Col xs={6}>
        <h2>Sponsors</h2>
        <h4 className="mt-5">Something about sponsors</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </Col>
      <Col xs={6}>
        <Image src={SponsorsImg} alt="SkateGirl" fluid rounded />
      </Col>
    </Row>
    <Col xs={3} className="my-3">
      <SponsorImage link="#" src={SponsorImg} alt="sponsor" />
    </Col>
    <Col xs={3} className="my-3">
      <SponsorImage link="#" src={SponsorImg} alt="sponsor" />
    </Col>
    <Col xs={3} className="my-3">
      <SponsorImage link="#" src={SponsorImg} alt="sponsor" />
    </Col>
    <Col xs={3} className="my-3">
      <SponsorImage link="#" src={SponsorImg} alt="sponsor" />
    </Col>
    <Col xs={3} className="my-3">
      <SponsorImage link="#" src={SponsorImg} alt="sponsor" />
    </Col>
    <Col xs={3} className="my-3">
      <SponsorImage link="#" src={SponsorImg} alt="sponsor" />
    </Col>
    <Col xs={3} className="my-3">
      <SponsorImage link="#" src={SponsorImg} alt="sponsor" />
    </Col>
    <Col xs={3} className="my-3">
      <SponsorImage link="#" src={SponsorImg} alt="sponsor" />
    </Col>
  </BaseSection>
)

export default SponsorsSection
