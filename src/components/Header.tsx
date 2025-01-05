"use client";


// src/components/Header.tsx
import React from "react";
import Link from "next/link";

const Header = () => {
    return (
        <header style={{ padding: "10px", backgroundColor: "#f0f0f0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div className="logo">
                    <Link href="/">GIS Map</Link>
                </div>
                <nav>
                    <ul style={{ display: "flex", gap: "20px", listStyle: "none" }}>
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/map">Map</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
