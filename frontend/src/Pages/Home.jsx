// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';  // ← Correct import
import '../styles/pages/Home.css';

const Home = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    axios.get('/api/destinations')
      .then((res) => setDestinations(res.data))
      .catch((err) => console.error('Backend fetch failed:', err));
  }, []);

  return (
    <div className="home">
      <Hero />  {/* ← Using the Hero component */}
      <section className="features-section">
        <h2>Explore Nepal Like Never Before</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🎧</span>
            <h3>Heritage Audio</h3>
            <p>Listen to stories of Kathmandu's historic sites</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🗺️</span>
            <h3>Smart Trip Planner</h3>
            <p>AI-powered routes and budget planning</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">👨‍👩‍👦</span>
            <h3>Local Guides</h3>
            <p>Connect with certified local guides</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🆘</span>
            <h3>Emergency SOS</h3>
            <p>Instant help when you need it most</p>
          </div>
        </div>
      </section>

      {/* TEMPORARY — remove once backend connection is confirmed */}
      <section>
        <h2>Backend Test: Destinations</h2>
        <pre>{JSON.stringify(destinations, null, 2)}</pre>
      </section>
    </div>
  );
};

export default Home;  // ← Also need this!