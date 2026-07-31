// src/components/RouteMap/RouteInfo.jsx

import "../../styles/components/RouteMap/RouteInfo.css";

const RouteInfo = ({
  distance = "--",
  duration = "--",
  cost = "--",
}) => {
  return (
    <div className="route-info">
      <div className="info-card">
        <span className="icon">🛣️</span>
        <div>
          <h4>Distance</h4>
          <p>{distance}</p>
        </div>
      </div>

      <div className="info-card">
        <span className="icon">⏱️</span>
        <div>
          <h4>Estimated Time</h4>
          <p>{duration}</p>
        </div>
      </div>

      <div className="info-card">
        <span className="icon">💰</span>
        <div>
          <h4>Estimated Cost</h4>
          <p>{cost}</p>
        </div>
      </div>
    </div>
  );
};

export default RouteInfo;
