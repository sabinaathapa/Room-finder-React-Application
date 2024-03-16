import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LocationAccess from "./LocationAccessPage";

const LocationRequestModal = () => {
  const [show, setShow] = useState(true);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const navigate = useNavigate();

  const handleAllowLocation = () => {
    setShow(false);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLatitude(latitude);
          setLongitude(longitude);
          console.log("Latitude", latitude);
          console.log("Longitude", longitude);
          navigate('/location-access', { state: { latitude, longitude } });

        },
        (error) => {
          console.error("Error getting location:", error);
          navigate('/location-denied');
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
      navigate('/location-denied');
    }
  };

  const handleDenyLocation = () => {
    setShow(false);
    navigate('/location-denied');
  };

  return (
    <Modal show={show} onHide={handleDenyLocation} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Location Access</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Do you want to allow access to your location?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleDenyLocation}>
          Deny
        </Button>
        <Button variant="primary" onClick={handleAllowLocation}>
          Allow
        </Button>
      </Modal.Footer>
      {/* {latitude !== null && longitude !== null && (
        <LocationAccess latitude={latitude} longitude={longitude} defaultRadius={2} />
      )} */}
    </Modal>
  );
};

export default LocationRequestModal;