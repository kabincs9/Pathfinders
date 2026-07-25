// src/components/Hero.jsx
import '../styles/components/Hero.css';

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>Welcome to Nepal</h1>
        <p className="hero-subtitle">Discover the Himalayan Paradise</p>
        <p className="hero-description">
          From ancient temples to majestic mountains, experience Nepal like never before
        </p>
        <div className="hero-buttons">
          <button className="btn-primary">Plan Your Trip</button>
          <button className="btn-secondary">Explore Heritage</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;  // ← THIS MUST BE HERE!