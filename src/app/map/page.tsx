"use client";


import React from "react";
import dynamic from "next/dynamic";

// Harita bileşenini dinamik yükle
const Map = dynamic(() => import("../../components/Map"), { ssr: false });

const MapPage: React.FC = () => {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Map />
    </div>
  );
};

export default MapPage;
