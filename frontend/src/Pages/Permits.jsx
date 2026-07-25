// src/pages/Permits.jsx
import { useState } from 'react';
import '../styles/pages/Permits.css';

const Permits = () => {
  const [showForm, setShowForm] = useState(false);

  const permits = [
    { id: 1, name: "TIMS Card", price: "NPR 2000", where: "Kathmandu", validity: "1 year" },
    { id: 2, name: "Annapurna Conservation", price: "NPR 3000", where: "Pokhara", validity: "1 trip" },
    { id: 3, name: "Everest Region Permit", price: "NPR 2000", where: "Kathmandu", validity: "1 trip" },
    { id: 4, name: "Langtang National Park", price: "NPR 3000", where: "Kathmandu", validity: "1 trip" },
  ];

  return (
    <div className="permits-page">
      <h1>📄 Permits</h1>
      <p className="subtitle">Get the right permits for your Nepal adventure</p>
      
      <div className="permits-grid">
        {permits.map((permit) => (
          <div key={permit.id} className="permit-card">
            <h3>{permit.name}</h3>
            <p className="permit-price">{permit.price}</p>
            <p>📍 Where: {permit.where}</p>
            <p>📅 Validity: {permit.validity}</p>
            <button className="apply-btn" onClick={() => setShowForm(true)}>
              Apply Now
            </button>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="permit-form-modal">
          <div className="permit-form">
            <h2>Apply for Permit</h2>
            <form>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Your full name" />
              </div>
              <div className="form-group">
                <label>Permit Type</label>
                <select>
                  <option>TIMS Card</option>
                  <option>Annapurna Conservation</option>
                  <option>Everest Region Permit</option>
                </select>
              </div>
              <div className="form-group">
                <label>Passport Number</label>
                <input type="text" placeholder="Passport number" />
              </div>
              <button type="submit" className="submit-btn">Submit Application</button>
              <button 
                type="button" 
                className="close-btn" 
                onClick={() => setShowForm(false)}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Permits;  // ← THIS MUST BE HERE!