"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Inner = dynamic(async () => {
  const L = await import("leaflet");
  const { MapContainer, TileLayer, Circle, Marker, Popup } = await import("react-leaflet");
  // Fix marker icons on Vercel
  // @ts-ignore
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
  });

  const TUFNELL = { lat: 51.5566, lng: -0.1377 }; // approx Tufnell Park

  return function MapClient() {
    const [ready, setReady] = useState(false);
    useEffect(() => setReady(true), []);
    if (!ready) return <div className="h-64 w-full rounded-2xl bg-black/5" />;

    return (
      <MapContainer center={TUFNELL} zoom={13} className="h-64 w-full rounded-2xl" scrollWheelZoom={false}>
        <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={TUFNELL}><Popup>Base: Tufnell Park</Popup></Marker>
        <Circle center={TUFNELL} radius={2414} pathOptions={{ color: "#4A1F3D" }} />
      </MapContainer>
    );
  };
}, { ssr: false });

export default function Map() {
  return <Inner />;
}
