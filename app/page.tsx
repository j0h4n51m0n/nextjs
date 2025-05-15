// version: confirmed working — glass map

'use client';

import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(m => m.Popup), { ssr: false });

export default function Home() {
  const [L, setL] = useState<any>(null);
  const [icon, setIcon] = useState<any>(null);

  useEffect(() => {
    import('leaflet').then((leaflet) => {
      setL(leaflet);
      setIcon(
        leaflet.icon({
          iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
          shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        })
      );
    });
  }, []);

  const submissions = [
    {
      lat: 37.7749,
      lng: -122.4194,
      name: "Ava, 16",
      image: "https://picsum.photos/100",
      blurb: "San Francisco through a rainy bus window."
    },
    {
      lat: 35.6895,
      lng: 139.6917,
      name: "Kenji, 17",
      image: "https://picsum.photos/101",
      blurb: "My grandfather’s tea shop in Tokyo."
    }
  ];

  if (!L || !icon) return <div style={{ backgroundColor: "#000", height: "100vh" }} />;

  return (
    <div style={{
      height: "100vh",
      width: "100%",
      background: "rgba(0, 0, 0, 0.35)",
      backdropFilter: "blur(20px) saturate(160%)",
      WebkitBackdropFilter: "blur(20px) saturate(160%)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      boxShadow: "inset 0 0 30px rgba(0, 0, 0, 0.6)",
      color: "#fff",
      fontFamily: "sans-serif"
    }}>
      <MapContainer center={[20, 0]} zoom={2} style={{ height: "100%", width: "100%" }} scrollWheelZoom={true}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />
        {submissions.map((entry, i) => (
          <Marker key={i} position={[entry.lat, entry.lng]} icon={icon}>
            <Popup>
              <div style={{
                textAlign: "center",
                backgroundColor: "#000",
                color: "#fff",
                padding: "10px",
                borderRadius: "8px",
                boxShadow: "0 0 10px rgba(0,0,0,0.5)"
              }}>
                <strong>{entry.name}</strong><br />
                <img src={entry.image} alt="" style={{
                  width: '100px',
                  borderRadius: '6px',
                  marginTop: '5px'
                }} /><br />
                <em>{entry.blurb}</em>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

