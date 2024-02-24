import React, { useState, useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LocationMap = ({ onLocationSelect }) => {

  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [latitude, setLatitude] = useState(27.7172);
  const [longitude, setLongitude] = useState(85.3240);

  const [locationSearch, setLocationSearch] = useState('');

  const mapRef = useRef(null);

  useEffect(() => {
    const map = L.map(mapRef.current).setView([latitude, longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    map.on('click', (e) => {
      setMarker(L.marker(e.latlng).addTo(map));
      setLatitude(e.latlng.lat);
      setLongitude(e.latlng.lng);
      
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    });

    setMap(map);

    return () => map.remove();
  }, [latitude, longitude, onLocationSelect]);

  const handleSearch = async (e) => {
    e.preventDefault();

    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${locationSearch}&format=json`);
    const data = await response.json();

    if (data.length > 0) {
      setLatitude(data[0].lat);
      setLongitude(data[0].lon);

      map.flyTo([data[0].lat, data[0].lon]);
    }

    setLocationSearch('');
  }

  return (
    <div>
      <div ref={mapRef} style={{height: '180px'}} />

      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>
    </div>
  );

}

export default LocationMap;