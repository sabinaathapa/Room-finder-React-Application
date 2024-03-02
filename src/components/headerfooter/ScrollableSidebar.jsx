import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

const ScrollableSidebar = () => {
  return (
    <Container fluid>
      <Navbar className="flex-column" bg="light" expand="md">
        <Navbar.Toggle aria-controls="sidebar" />
        <Navbar.Collapse id="sidebar">
          <OverlayScrollbarsComponent options={{ scrollbars: { autoHide: 'leave' } }}>
            <Nav className="flex-column">
              <Nav.Link href="#section1">Section 1</Nav.Link>
              <Nav.Link href="#section2">Section 2</Nav.Link>
              <Nav.Link href="#section3">Section 3</Nav.Link>
              {/* Add more Nav.Link items as needed */}
            </Nav>
          </OverlayScrollbarsComponent>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default ScrollableSidebar;
