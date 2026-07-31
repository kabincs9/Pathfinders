import { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import MapControls from "./MapControls";
import RouteInfo from "./RouteInfo";
import RouteLine from "./RouteLine";
import UserLocationMarker from "./UserLocationMarker";
import LocationMarker from "./LocationMarker";
import Legend from "./Legend";

const nepalCenter = [28.3949, 84.1240];

const nepalBounds = [
  [26.2, 80.0],
  [30.5, 88.2],
];

const RouteMap = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/destinations")
      .then((res) => res.json())
      .then((data) => {
        setLocations(data);
      })
      .catch((err) =>
        console.error("Error fetching destinations:", err)
      );
  }, []);

  return (
    <section className="route-map-section">
      <MapControls />

      <RouteInfo />

      <div
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        <MapContainer
          center={nepalCenter}
          zoom={7}
          minZoom={7}
          maxZoom={18}
          maxBounds={nepalBounds}
          maxBoundsViscosity={1.0}
          scrollWheelZoom={true}
          style={{
            height: "550px",
            width: "100%",
          }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <UserLocationMarker />

          {/* Pass locations here */}
          <LocationMarker locations={locations} />

          <RouteLine />
        </MapContainer>
      </div>

      <Legend />
    </section>
  );
};

export default RouteMap;