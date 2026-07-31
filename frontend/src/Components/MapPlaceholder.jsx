// src/components/MapPlaceholder.jsx
import { useState, useCallback, useRef } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer, Autocomplete } from '@react-google-maps/api';
import '../styles/components/MapPlaceholder.css';

const containerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: '12px',
  overflow: 'hidden'
};

const defaultCenter = {
  lat: 27.7172,
  lng: 85.3240
};

const libraries = ['places', 'routes', 'geometry'];

const MapPlaceholder = () => {
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [routeCost, setRouteCost] = useState(null);
  const [startLocation, setStartLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [isRouteShown, setIsRouteShown] = useState(false);
  
  const startAutocompleteRef = useRef(null);
  const destAutocompleteRef = useRef(null);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // If no API key, show error
  if (!apiKey) {
    return (
      <div style={{
        background: '#ffebee',
        padding: '2rem',
        borderRadius: '12px',
        textAlign: 'center',
        border: '1px solid #ffcdd2'
      }}>
        <h3 style={{ color: '#c62828' }}>⚠️ Google Maps API Key Missing</h3>
        <p>Add VITE_GOOGLE_MAPS_API_KEY to your .env file</p>
      </div>
    );
  }

  // Calculate the route
  const calculateRoute = () => {
    if (!startLocation || !destination) {
      setError('Please enter both start and destination');
      return;
    }

    setLoading(true);
    setError('');
    setIsRouteShown(false);

    // Create a new DirectionsService
    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: startLocation,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
        optimizeWaypoints: true
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          // This is what displays the route on the map
          setDirections(result);
          setIsRouteShown(true);
          
          const route = result.routes[0];
          const leg = route.legs[0];
          
          setDistance(leg.distance.text);
          setDuration(leg.duration.text);
          
          const distanceKm = parseFloat(leg.distance.text.replace(/[^0-9.]/g, ''));
          const estimatedCost = (distanceKm * 0.4).toFixed(2);
          setRouteCost(estimatedCost);
          
          setLoading(false);
        } else {
          setError(`Could not find route: ${status}`);
          setLoading(false);
        }
      }
    );
  };

  const clearRoute = () => {
    setDirections(null);
    setDistance(null);
    setDuration(null);
    setRouteCost(null);
    setError('');
    setIsRouteShown(false);
    setStartLocation('');
    setDestination('');
  };

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
      <div className="route-planner">
        {/* Input Section */}
        <div className="route-inputs">
          <div className="input-group">
            <label>📍 Starting Location</label>
            <Autocomplete
              onLoad={(autocomplete) => {
                startAutocompleteRef.current = autocomplete;
              }}
              onPlaceChanged={() => {
                const place = startAutocompleteRef.current.getPlace();
                if (place.formatted_address) {
                  setStartLocation(place.formatted_address);
                }
              }}
            >
              <input
                type="text"
                placeholder="e.g., Kathmandu, Nepal"
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
                className="route-input"
              />
            </Autocomplete>
          </div>

          <div className="input-group">
            <label>📍 Destination</label>
            <Autocomplete
              onLoad={(autocomplete) => {
                destAutocompleteRef.current = autocomplete;
              }}
              onPlaceChanged={() => {
                const place = destAutocompleteRef.current.getPlace();
                if (place.formatted_address) {
                  setDestination(place.formatted_address);
                }
              }}
            >
              <input
                type="text"
                placeholder="e.g., Pokhara, Nepal"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="route-input"
              />
            </Autocomplete>
          </div>

          <div className="route-buttons">
            <button 
              onClick={calculateRoute} 
              className="btn-route"
              disabled={loading}
            >
              {loading ? '⏳ Calculating...' : '🚀 Find Route'}
            </button>
            <button 
              onClick={clearRoute} 
              className="btn-clear"
            >
              ✕ Clear
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message">{error}</div>
        )}

        {/* Route Info */}
        {distance && duration && (
          <div className="route-info">
            <div className="info-card">
              <span className="info-icon">🛣️</span>
              <div className="info-content">
                <p className="info-label">Distance</p>
                <p className="info-value">{distance}</p>
              </div>
            </div>
            <div className="info-card">
              <span className="info-icon">⏱️</span>
              <div className="info-content">
                <p className="info-label">Duration</p>
                <p className="info-value">{duration}</p>
              </div>
            </div>
            <div className="info-card">
              <span className="info-icon">💰</span>
              <div className="info-content">
                <p className="info-label">Est. Cost</p>
                <p className="info-value">${routeCost}</p>
              </div>
            </div>
          </div>
        )}

        {/* Map with DirectionsRenderer */}
        <div className="map-container">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={defaultCenter}
            zoom={13}
            options={{
              streetViewControl: true,
              fullscreenControl: true,
              mapTypeControl: true,
              zoomControl: true
            }}
          >
            {/* This is what draws the route on the map */}
            {directions && (
              <DirectionsRenderer
                directions={directions}
                options={{
                  polylineOptions: {
                    strokeColor: '#0033A0',
                    strokeWeight: 6,
                    strokeOpacity: 0.8
                  },
                  suppressMarkers: false,
                  markerOptions: {
                    icon: {
                      path: window.google.maps.SymbolPath.CIRCLE,
                      scale: 10,
                      fillColor: '#0033A0',
                      fillOpacity: 1,
                      strokeColor: '#0033A0',
                      strokeWeight: 2
                    }
                  }
                }}
              />
            )}
          </GoogleMap>
        </div>

        {/* Legend */}
        <div className="map-legend">
          <div className="legend-item">
            <span className="legend-dot green"></span>
            Start Point
          </div>
          <div className="legend-item">
            <span className="legend-dot red"></span>
            Destination
          </div>
          <div className="legend-item">
            <span className="legend-line"></span>
            Route
          </div>
          {isRouteShown && (
            <div className="legend-item">
              <span className="legend-check">✅ Route Found!</span>
            </div>
          )}
        </div>
      </div>
    </LoadScript>
  );
};

export default MapPlaceholder;