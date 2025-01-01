"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { fetchElectricPoles } from "../services/api";
import { ElectricPole } from "../types/electricPole";

// Leaflet marker ikonu
const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const Map: React.FC = () => {
  const [poles, setPoles] = useState<ElectricPole[]>([]);

  useEffect(() => {
    fetchElectricPoles()
      .then((data) => setPoles(data))
      .catch((error) => console.error("Error fetching electric poles:", error));
  }, []);

  return (
    <MapContainer center={[39.92, 32.85]} zoom={12} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {poles.map((pole) => (
        <Marker
          key={pole.id}
          position={[pole.location.latitude, pole.location.longitude]}
          icon={icon}
        >
          <Popup>
            <strong>{pole.name}</strong>
            <br />
            {pole.description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
