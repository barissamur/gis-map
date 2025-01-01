import React from "react";
import "./globals.css";

export const metadata = {
  title: "GIS Map",
  description: "Mapping Electric Poles with Next.js and Leaflet",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
