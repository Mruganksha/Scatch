import React, { useState, useCallback, useRef } from 'react';
import { GoogleMap, Marker, useJsApiLoader, Autocomplete } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter = {
  lat: 28.6139,
  lng: 77.2090,
};

function LocationPicker({ onLocationSelect }) {
  const [markerPosition, setMarkerPosition] = useState(defaultCenter);
  const [map, setMap] = useState(null);
  const autocompleteRef = useRef(null);

  // Load Google Maps with Places library
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, 
    libraries: ['places'], 
  });
  console.log('Google Maps API Key:', import.meta.env.VITE_GOOGLE_MAPS_API_KEY);
  // Called when user clicks on map
  const onMapClick = useCallback(
    (e) => {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      const newPosition = { lat, lng };
      setMarkerPosition(newPosition);
      onLocationSelect(newPosition);
    },
    [onLocationSelect]
  );

  // Called when user selects a place from search
  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place && place.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      const newPosition = { lat, lng };
      setMarkerPosition(newPosition);
      map.panTo(newPosition);
      onLocationSelect(newPosition);
    }
  };

  if (loadError) return <p className="text-red-500">Error loading map.</p>;
  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div className="space-y-4">
      {/* Search input with autocomplete */}
      <Autocomplete
        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
        onPlaceChanged={handlePlaceChanged}
      >
        <input
          type="text"
          placeholder="Search for a location"
          className="w-full p-3 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-500"
        />
      </Autocomplete>

      {/* Google Map */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={markerPosition}
        zoom={14}
        onClick={onMapClick}
        onLoad={(mapInstance) => setMap(mapInstance)}
      >
        <Marker position={markerPosition} />
      </GoogleMap>
    </div>
  );
}

export default React.memo(LocationPicker);
