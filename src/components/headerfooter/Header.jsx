import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import App from '../../App';
import { useAuth } from '../AuthContext';


const HeaderCommon=()=> {
  const navigate = useNavigate();

  const { authenticated } = useAuth();
  // const authenticated = true;

  const LoginClick = () => {
    navigate('/login');
  }

  const handleClickViewProfile = () =>{
    navigate('/user-profile');
  }

  
  const handleClickMyRooms = () =>{
      navigate('/booked-rooms');
  }

  return (
    
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Hamro Room</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/#exploreRooms">Explore Rooms</Nav.Link>
            <Nav.Link href="/#roomSearchBar">Search Rooms</Nav.Link>
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

            {authenticated ? (
            <>
              <NavDropdown title="Profile" id="collapsible-nav-dropdown">
                <NavDropdown.Item onClick={handleClickViewProfile}>View Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={handleClickMyRooms}>Booked Rooms</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#contactUs">Logout</NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <Button variant="outline-primary" onClick={LoginClick}>Login</Button> 
          )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderCommon;
