import { useState } from 'react';
import '../styles/pages/SOS.css';

const SOS = () => {
  const [location, setLocation] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
        },
        () => alert('Unable to get location')
      );
    }
  };

  return (
    <div className="sos-page">
      <h1>🆘 Emergency SOS</h1>
      
      <div className="sos-container">
        <button className="sos-button" onClick={() => alert('🚨 EMERGENCY ALERT SENT! Help is on the way.')}>
          🚨 PRESS FOR EMERGENCY
        </button>
        
        <div className="emergency-contacts">
          <h3>Emergency Numbers</h3>
          <div className="contact-card">
            <span>🚓 Police</span>
            <strong>100</strong>
          </div>
          <div className="contact-card">
            <span>🚑 Ambulance</span>
            <strong>102</strong>
          </div>
          <div className="contact-card">
            <span>🔥 Fire</span>
            <strong>101</strong>
          </div>
          <div className="contact-card">
            <span>🏥 Tourist Police</span>
            <strong>1144</strong>
          </div>
        </div>

        <button className="location-btn" onClick={getLocation}>
          📍 Share My Location
        </button>
        
        {location && (
          <div className="location-info">
            <p>📍 Your Location:</p>
            <p>Lat: {location.lat}</p>
            <p>Lng: {location.lng}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SOS;