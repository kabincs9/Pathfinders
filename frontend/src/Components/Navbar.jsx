import { Link } from 'react-router-dom';
import '../styles/components/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🇳🇵 NepalTour
        </Link>
        <ul className="nav-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/heritage">Heritage Audio</Link></li>
          <li><Link to="/trip-planner">Trip Planner</Link></li>
          <li><Link to="/guides">Local Guides</Link></li>
          <li><Link to="/sos" className="sos-link">🆘 SOS</Link></li>
          <li><Link to="/permits">Permits</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;