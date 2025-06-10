import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";
import { Order } from "../../../api/type/OrderType";

mapboxgl.accessToken =
  "pk.eyJ1IjoidDIxNTIxNTA5IiwiYSI6ImNtM3A5YzlwcDBhN24yanM4bTRuNjE1YzAifQ.LmakLzqnz-1Zg7jb31XHEA";

interface RouteMapProps {
  order: Order | null;
  routeData?: {
    stops: Array<{
      name: string;
      address: string;
      longitude: number;
      latitude: number;
      type?: "pickup" | "delivery" | "transit";
      arrivalTime?: string;
    }>;
    polyline?: [number, number][];
  };
}

export function RouteMap({ order, routeData }: RouteMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [105.85, 21.0],
      zoom: 5,
    });

    map.current.addControl(new mapboxgl.NavigationControl());

    return () => {
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!map.current || !routeData?.stops) return;

    if (map.current.getLayer("route")) {
      map.current.removeLayer("route");
      map.current.removeSource("route");
    }

    routeData.stops.forEach((stop, index) => {
      let color = "";
      switch (stop.type) {
        case "pickup":
          color = "#3FB1CE";
          break;
        case "delivery":
          color = "#4CAF50";
          break;
        default:
          color = "#FF9800";
      }

      const marker = new mapboxgl.Marker({ color })
        .setLngLat([stop.longitude, stop.latitude])
        .setPopup(
          new mapboxgl.Popup().setHTML(`
            <h3>${stop.name}</h3>
            <p>${stop.address}</p>
            <p>Thời gian dự kiến: ${stop.arrivalTime}</p>
          `)
        )
        .addTo(map.current!);
    });

    if (routeData.polyline && routeData.polyline.length > 1) {
      map.current.addSource("route", {
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

      map.current.addLayer({
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

      const bounds = new mapboxgl.LngLatBounds();
      routeData.polyline.forEach((coord) => {
        bounds.extend(coord);
      });
      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 12,
      });
    }
  }, [routeData]);

  return (
    <div
      ref={mapContainer}
      style={{ width: "100%", height: "500px", borderRadius: "8px" }}
    />
  );
}
