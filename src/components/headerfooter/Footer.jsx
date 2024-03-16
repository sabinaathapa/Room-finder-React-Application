import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGem, faHome, faEnvelope, faPhone, faPrint } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faGoogle, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  background-color: rgb(44, 51, 51);
  color: white;

  hr {
    color: white;
    border-color: rgb(46, 79, 79);
  }

  a {
    color: white;

    &:hover {
      color: rgb(14, 131, 136);
    }
  }

  .social-icons a {
    color: white;

    &:hover {
      color: rgb(14, 131, 136);
    }
  }

  .contact-info .icon {
    color: white;
    
  }
  
  #services, #text, #links, #contactUs{
    color:white;
  }

  .footer-bottom {
    color: white;
    background-color: rgb(46, 79, 79);
  }
`;

const Footer = () => {
  return (
    <StyledFooter className='text-center text-lg-start text-muted my-5'>
      <hr />
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block' id="text">
          <span>Get connected with us on social networks:</span>
        </div>

        <div className='social-icons'>
          <a href='/' className='me-4'>
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href='/' className='me-4'>
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href='/' className='me-4'>
            <FontAwesomeIcon icon={faGoogle} />
          </a>
          <a href='/' className='me-4'>
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href='/' className='me-4'>
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href='/' className='me-4'>
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>
      </section>

      <section className=''>
        <Container className='text-center text-md-start mt-5'>
          <Row className='mt-3'>
            <Col md='3' lg='4' xl='3' className='mx-auto mb-1'>
              <img src='src\assets\images\Hamro_Room_Logo.png' width={"50%"} alt="Hamro Room Logo" />
              <p>Helping You Find Better.</p>
            </Col>

            <Col md='2' lg='2' xl='2' className='mx-auto mb-4' id="services">
              <h6 className='text-uppercase fw-bold mb-4'>Services</h6>
              <p>
                <a href='#!'>Find Room</a>
              </p>
              <p>
                <a href='#!'>Rent Room</a>
              </p>
            </Col>

            <Col md='3' lg='2' xl='2' className='mx-auto mb-4' id="links">
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='#!'>Terms and Conditions</a>
              </p>
              <p>
                <a href='#!'>Services</a>
              </p>
              <p>
                <a href='#!'>Our Location</a>
              </p>
              <p>
                <a href='#!'>Help</a>
              </p>
            </Col>

            <Col md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4' id="contactUs">
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <FontAwesomeIcon icon={faHome} className='icon me-2' />
                Kathmandu, Nepal
              </p>
              <p>
                <FontAwesomeIcon icon={faEnvelope} className='icon me-3' />
                info@hamroroom.com
              </p>
              <p>
                <FontAwesomeIcon icon={faPhone} className='icon me-3' /> + 01 234 567 88
              </p>
              <p>
                <FontAwesomeIcon icon={faPrint} className='icon me-3' /> + 01 234 567 89
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <div className='footer-bottom text-center p-4'>
        <a className='text-reset fw-bold text-decoration-none' href='https://mdbootstrap.com/'>
          Hamro Room
        </a>
        © 2024 Copyright:
      </div>
    </StyledFooter>
  );
};

export default Footer;
