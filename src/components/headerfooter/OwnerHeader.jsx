import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import App from '../../App';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import { getAccessToken } from '../authUtils';


const OwnerHeader=()=> {
  const navigate = useNavigate();
  const accessToken = getAccessToken();

  // const { authenticated } = useAuth();
  const authenticated = true;

  const LoginClick = () => {
    navigate('/login');
  }

  const handleClickViewProfile = () =>{
    navigate('/user-profile');
  }

  
  const handleClickMyRooms = () =>{
      navigate('/booked-rooms');
  }

  const handleClickCreateRoom = () =>{
    navigate('/create-room');
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

            console.log("API Response:", response.data); // Log the response data

            navigate('/login')

    } catch (error) {
        console.log('Error fetching rooms', error);
    }
  };

  return (
    
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/owner-page">Hamro Room</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/created-rooms">Created Rooms</Nav.Link>
            <Nav.Link href="/create-room">Create Room</Nav.Link>
            <Nav.Link href="/booking-request">Booking Request</Nav.Link>
          </Nav>
          <Nav>


            <NavDropdown title="Profile" id="collapsible-nav-dropdown">
            <NavDropdown.Item onClick={handleClickViewProfile}>View Profile</NavDropdown.Item>
            {/* <NavDropdown.Item onClick={handleClickMyRooms}>Booked Rooms</NavDropdown.Item> */}
            <NavDropdown.Item >Settings</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogoutClick}>Logout</NavDropdown.Item>
            </NavDropdown>
    

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default OwnerHeader;
