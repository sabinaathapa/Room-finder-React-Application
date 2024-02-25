import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import App from '../../App';



function HeaderCommon() {
  function LoginClick(){
    const navigate = useNavigate();

    const handleLoginClick = () => {
      // Use the navigate function to go to the "/login" page
      navigate('/login');
    };
  }
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Hamro Room</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Explore Rooms</Nav.Link>
            <Nav.Link href="#pricing">Search Rooms</Nav.Link>
            <Nav.Link href="#pricing">Near You</Nav.Link>
            <NavDropdown title="Services" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#contactUs">
                Contact Us
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <a href='/login'><Button variant="outline-info" onClick={'LoginClick'}>Login</Button></a>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderCommon;
