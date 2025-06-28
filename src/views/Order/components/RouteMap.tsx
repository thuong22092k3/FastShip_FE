import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";
import { Order } from "../../../api/type/OrderType";

mapboxgl.accessToken = "YOUR_MAPBOX_ACCESS_TOKEN";

interface RouteMapProps {
  order: Order | null;
  routeData?: {
    stops: Array<{
      id: string;
      name: string;
      address: string;
      coordinates: [number, number];
      type?: "pickup" | "delivery" | "transit";
      arrivalTime?: string;
    }>;
    polyline?: [number, number][];
    totalDistance?: number;
    estimatedTime?: string;
  };
}
function getColorByType(type?: string) {
  if (type === "pickup") return "#3FB1CE";
  if (type === "delivery") return "#4CAF50";
  return "#FF9800";
}

export function RouteMap({ order, routeData }: RouteMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [106.7, 10.78],
      zoom: 12,
    });

    map.current.addControl(new mapboxgl.NavigationControl());

    return () => {
      map.current?.remove();
      markers.current = [];
    };
  }, []);

  useEffect(() => {
    if (!map.current || !routeData?.stops) return;

    const run = () => {
      if (map.current!.getLayer("route")) {
        map.current!.removeLayer("route");
      }
      if (map.current!.getSource("route")) {
        map.current!.removeSource("route");
      }

      markers.current.forEach((m) => m.remove());
      markers.current = [];

      routeData.stops.forEach((stop) => {
        const marker = new mapboxgl.Marker({ color: getColorByType(stop.type) })
          .setLngLat(stop.coordinates)
          .setPopup(
            new mapboxgl.Popup().setHTML(`
          <h3>${stop.name}</h3>
          <p>${stop.address}</p>
        `)
          )
          .addTo(map.current!);
        markers.current.push(marker);
      });

      if (routeData?.polyline && routeData.polyline.length > 1) {
        map.current!.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: routeData.polyline,
            },
          },
        });

        map.current!.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#3FB1CE",
            "line-width": 4,
          },
        });
      }

      // Fit bounds
      const bounds = new mapboxgl.LngLatBounds();
      (routeData.polyline ?? routeData.stops.map((s) => s.coordinates)).forEach(
        (coord) => bounds.extend(coord)
      );
      map.current!.fitBounds(bounds, { padding: 50, maxZoom: 14 });
    };

    if (map.current!.isStyleLoaded()) {
      run();
    } else {
      map.current!.once("styledata", run);
    }
  }, [routeData]);

  return (
    <div
      ref={mapContainer}
      style={{ width: "100%", height: "500px", borderRadius: "8px" }}
    />
  );
}
