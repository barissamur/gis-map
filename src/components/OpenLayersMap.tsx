"use client";

import React, { useEffect } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Feature } from "ol";
import Point from "ol/geom/Point";
import { Style, Icon } from "ol/style";
import Overlay from "ol/Overlay";
import { fromLonLat } from "ol/proj";

const OpenLayersMap: React.FC = () => {
  useEffect(() => {
    // Popup HTML öğesi
    const popupElement = document.createElement("div");
    popupElement.id = "popup";
    popupElement.style.position = "absolute";
    popupElement.style.background = "white";
    popupElement.style.border = "1px solid black";
    popupElement.style.padding = "5px";
    popupElement.style.borderRadius = "5px";
    popupElement.style.display = "none";
    document.body.appendChild(popupElement);

    const popupOverlay = new Overlay({
      element: popupElement,
      autoPan: true,
    });

    // API'den elektrik direği verilerini çek
    const fetchElectricPoles = async () => {
      try {
        const response = await fetch("https://localhost:5000/api/ElectricPoles");
        if (!response.ok) throw new Error("API çağrısı başarısız oldu");
        const data = await response.json();

        // Verileri harita marker'larına dönüştür
        const features = data.map((pole: any) => {
          const coords = fromLonLat([pole.location.longitude, pole.location.latitude]);
          const feature = new Feature({
            geometry: new Point(coords),
            properties: {
              name: pole.name,
              description: pole.description,
            },
          });
          feature.setStyle(
            new Style({
              image: new Icon({
                src: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // Marker ikonu
                scale: 0.05,
              }),
            })
          );
          return feature;
        });

        const vectorSource = new VectorSource({
          features: features,
        });

        const vectorLayer = new VectorLayer({
          source: vectorSource,
        });

        // Harita oluştur
        const map = new Map({
          target: "map",
          layers: [
            new TileLayer({
              source: new OSM(),
            }),
            vectorLayer, // Marker'ları gösteren layer
          ],
          overlays: [popupOverlay],
          view: new View({
            center: fromLonLat([32.85, 39.92]), // Ankara'nın koordinatları
            zoom: 12,
          }),
        });

        // Tıklama olayını dinleyin
        map.on("click", (event) => {
          const featuresAtPixel = map.getFeaturesAtPixel(event.pixel);
          if (featuresAtPixel.length > 0) {
            const clickedFeature = featuresAtPixel[0];
            const properties = clickedFeature.get("properties");

            // Popup'ı göster ve içeriği doldur
            popupElement.style.display = "block";
            popupElement.innerHTML = `
              <strong>${properties.name}</strong><br/>
              ${properties.description}
            `;
            popupOverlay.setPosition(event.coordinate);
          } else {
            // Popup'ı gizle
            popupElement.style.display = "none";
          }
        });
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    };

    fetchElectricPoles();
  }, []);

  return <div id="map" style={{ width: "100%", height: "100vh" }} />;
};

export default OpenLayersMap;
