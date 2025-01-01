import React from "react";
import OpenLayersMap from "../../components/OpenLayersMap";

const MapPage: React.FC = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>OpenLayers Map</h1>
      <OpenLayersMap />
    </div>
  );
};

export default MapPage;
