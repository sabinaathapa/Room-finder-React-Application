import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getAccessToken } from '../authUtils';
import Cookies from 'js-cookie';

const HeaderCommon=()=> {
  const navigate = useNavigate();
  const accessToken = getAccessToken();

  // const { authenticated } = useAuth();
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

  const exploreRooms = () =>{
    navigate('/explore-rooms');
}

  const handleSearchRoom = () =>{
    navigate('/#roomSearchBar');
  }

  const handleLogoutClick = async () => {
    try {
        const response = await axios.get(
            "http://localhost:8000/api/v1/accounts/logout/",
            {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  "Content-Type": "multipart/form-data",
                },
            });
            Cookies.remove('access_token');
            console.log("API Response:", response.data); // Log the response data

            navigate('/login')

    } catch (error) {
        console.log('Error fetching rooms', error);
    }
  };


  return (
    
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Hamro Room</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={exploreRooms}>Explore Rooms</Nav.Link>
            <Nav.Link onClick={handleSearchRoom}>Search Rooms</Nav.Link>
            <Nav.Link href="/location-request">Near You</Nav.Link>

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

            {accessToken ? (
            <>
              <NavDropdown title="Profile" id="collapsible-nav-dropdown">
                <NavDropdown.Item onClick={handleClickViewProfile}>View Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={handleClickMyRooms}>Booked Rooms</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogoutClick}>Logout</NavDropdown.Item>
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
