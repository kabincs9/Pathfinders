// src/pages/TripPlanner.jsx
import { useState } from 'react';
import '../styles/pages/TripPlanner.css';

const TripPlanner = () => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    budget: '',
    days: '',
    preference: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Trip plan submitted! (Backend will process this)');
  };

  return (
    <div className="planner-page">
      <h1>🗺️ Trip Planner</h1>
      <p className="subtitle">Plan your perfect Nepal adventure with AI</p>
      
      <form className="planner-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Starting Point</label>
          <select name="from" onChange={handleChange} required>
            <option value="">Select...</option>
            <option value="kathmandu">Kathmandu</option>
            <option value="pokhara">Pokhara</option>
            <option value="chitwan">Chitwan</option>
            <option value="lumbini">Lumbini</option>
          </select>
        </div>

        <div className="form-group">
          <label>Destination</label>
          <select name="to" onChange={handleChange} required>
            <option value="">Select...</option>
            <option value="kathmandu">Kathmandu</option>
            <option value="pokhara">Pokhara</option>
            <option value="chitwan">Chitwan</option>
            <option value="lumbini">Lumbini</option>
            <option value="everest">Everest Base Camp</option>
            <option value="annapurna">Annapurna Circuit</option>
          </select>
        </div>

        <div className="form-group">
          <label>Budget (USD)</label>
          <input 
            type="number" 
            name="budget" 
            placeholder="Enter your budget" 
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Duration (Days)</label>
          <input 
            type="number" 
            name="days" 
            placeholder="How many days?" 
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Preference</label>
          <select name="preference" onChange={handleChange}>
            <option value="">Select...</option>
            <option value="adventure">Adventure</option>
            <option value="cultural">Cultural</option>
            <option value="religious">Religious</option>
            <option value="nature">Nature</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">Plan My Trip 🚀</button>
      </form>
    </div>
  );
};

export default TripPlanner;  // ← THIS MUST BE HERE!