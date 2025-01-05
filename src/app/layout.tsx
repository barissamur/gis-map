import React from "react";
import "./globals.css";
import Header from "@/components/Header";

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
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
