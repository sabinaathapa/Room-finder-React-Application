import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGem, faHome, faEnvelope, faPhone, faPrint } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faGoogle, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href='/' className='me-4 text-reset'>
            <FontAwesomeIcon icon={faFacebookF} color='secondary' />
          </a>
          <a href='/' className='me-4 text-reset'>
            <FontAwesomeIcon icon={faTwitter} color='secondary' />
          </a>
          <a href='/' className='me-4 text-reset'>
            <FontAwesomeIcon icon={faGoogle} color='secondary' />
          </a>
          <a href='/' className='me-4 text-reset'>
            <FontAwesomeIcon icon={faInstagram} color='secondary' />
          </a>
          <a href='/' className='me-4 text-reset'>
            <FontAwesomeIcon icon={faLinkedin} color='secondary' />
          </a>
          <a href='/' className='me-4 text-reset'>
            <FontAwesomeIcon icon={faGithub} color='secondary' />
          </a>
        </div>
      </section>

      <section className=''>
        <Container className='text-center text-md-start mt-5'>
          <Row className='mt-3'>
            <Col md='3' lg='4' xl='3' className='mx-auto mb-1'>
                <img src='src\assets\images\Hamro_Room_Logo.png' width={"50%"} ></img>
              <p>
                Helping You Find Better. 
              </p>
            </Col>

            <Col md='2' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Services</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Find Room
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Rent Room
                </a>
              </p>
    
            </Col>

            <Col md='3' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Terms and Conditions
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Services
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Our Location
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Help
                </a>
              </p>
            </Col>

            <Col md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4' id="contactUs">
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <FontAwesomeIcon icon={faHome} color='secondary' className='me-2' />
                Kathmandu, Nepal
              </p>
              <p>
                <FontAwesomeIcon icon={faEnvelope} color='secondary' className='me-3' />
                info@hamroroom.com
              </p>
              <p>
                <FontAwesomeIcon icon={faPhone} color='secondary' className='me-3' /> + 01 234 567 88
              </p>
              <p>
                <FontAwesomeIcon icon={faPrint} color='secondary' className='me-3' /> + 01 234 567 89
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
      <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
          Hamro Room
        </a>
        © 2024 Copyright:
      </div>
    </footer>
  );
};

export default Footer;
