import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { Icon, LatLngExpression } from "leaflet";
import L from "leaflet";

interface MapProps {
  latitude: number;
  longitude: number;
  name: string;
}

const icon: Icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export function Map({ latitude, longitude, name }: MapProps) {
  const center: LatLngExpression = [latitude, longitude];

  return (
    <div>
      <MapContainer
        center={center}
        zoom={18}
        className="rounded-md min-w-[500px] border border-green-900 main-shadow w-full h-full min-h-[300px] "
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={center} icon={icon}>
          <Popup>{name}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
