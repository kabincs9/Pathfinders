// src/components/RouteMap/RouteLine.jsx

import { Polyline } from "react-leaflet";

const RouteLine = ({ routeCoordinates = [] }) => {
  // Don't render anything if no route exists
  if (!routeCoordinates || routeCoordinates.length === 0) {
    return null;
  }

  return (
    <Polyline
      positions={routeCoordinates}
      pathOptions={{
        color: "#2563eb",
        weight: 5,
        opacity: 0.8,
      }}
    />
  );
};

export default RouteLine;