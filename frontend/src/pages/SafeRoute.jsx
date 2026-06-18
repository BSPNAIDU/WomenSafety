import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

function SafeRoute() {
  const [source, setSource] = useState(
    "Detecting Current Location..."
  );

  const [destination, setDestination] =
    useState("");

  const [startPoint, setStartPoint] =
    useState(null);

  const [endPoint, setEndPoint] =
    useState(null);

  const [route, setRoute] = useState([]);

  const [distance, setDistance] =
    useState("");

  const [duration, setDuration] =
    useState("");

  const [safetyScore, setSafetyScore] =
    useState(100);

  const [riskLevel, setRiskLevel] =
    useState("🟢 Safe Area");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat =
          position.coords.latitude;

        const lon =
          position.coords.longitude;

        setSource(`${lat}, ${lon}`);

        setStartPoint([lat, lon]);
      },

      () => {
        alert(
          "Please Allow Location Permission"
        );
      }
    );
  }, []);

  const getCoordinates = async (place) => {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: place + ", India",
          format: "json",
          limit: 1,
        },
      }
    );

    if (response.data.length === 0) {
      throw new Error("Location not found");
    }

    return [
      parseFloat(response.data[0].lat),
      parseFloat(response.data[0].lon),
    ];
  };

  const findRoute = async () => {
    try {
      if (!destination) {
        alert("Please Enter Destination");
        return;
      }

      const end =
        await getCoordinates(destination);

      setEndPoint(end);

      const routeResponse =
        await axios.get(
          `https://router.project-osrm.org/route/v1/driving/${startPoint[1]},${startPoint[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`
        );

      const coordinates =
        routeResponse.data.routes[0].geometry.coordinates.map(
          (coord) => [coord[1], coord[0]]
        );

      setRoute(coordinates);

      setDistance(
        (
          routeResponse.data.routes[0]
            .distance / 1000
        ).toFixed(2)
      );

      setDuration(
        (
          routeResponse.data.routes[0]
            .duration / 60
        ).toFixed(0)
      );

      const reportsResponse =
        await axios.get(
          "https://saferoute-backend-zxrv.onrender.com/api/reports"
        );

      const reports =
        reportsResponse.data;

      const matchedReports =
        reports.filter(
          (report) =>
            report.location &&
            report.location
              .toLowerCase()
              .includes(
                destination.toLowerCase()
              )
        );

      let score =
        100 -
        matchedReports.length * 20;

      if (score < 0) {
        score = 0;
      }

      setSafetyScore(score);

      if (score > 70) {
        setRiskLevel("🟢 Safe Area");
      } else if (score > 40) {
        setRiskLevel(
          "🟡 Moderate Risk"
        );
      } else {
        setRiskLevel(
          "🔴 High Risk Area"
        );
      }
    } catch (error) {
      console.log(error);

      alert(
        "Unable to Generate Route"
      );
    }
  };
    return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <Link to="/dashboard">
        <button
          style={{
            padding: "12px 25px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          ⬅ Back to Dashboard
        </button>
      </Link>

      <h1
        style={{
          color: "white",
          fontSize: "40px",
        }}
      >
        🛡 SafeRoute AI Navigation
      </h1>

      <div
        style={{
          backgroundColor: "white",
          maxWidth: "600px",
          margin: "20px auto",
          padding: "25px",
          borderRadius: "20px",
          boxShadow:
            "0 8px 20px rgba(0,0,0,0.3)",
        }}
      >
        <input
          type="text"
          value={source}
          readOnly
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "15px",
            borderRadius: "10px",
            border: "1px solid gray",
          }}
        />

        <input
          type="text"
          placeholder="Enter Destination"
          value={destination}
          onChange={(e) =>
            setDestination(
              e.target.value
            )
          }
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "15px",
            borderRadius: "10px",
            border: "1px solid gray",
          }}
        />

        <button
          onClick={findRoute}
          style={{
            padding: "14px 30px",
            background:
              "linear-gradient(90deg,#22c55e,#16a34a)",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          Find Safe Route
        </button>
      </div>

      <div
        style={{
          backgroundColor: "white",
          maxWidth: "600px",
          margin: "20px auto",
          padding: "20px",
          borderRadius: "20px",
          boxShadow:
            "0 8px 20px rgba(0,0,0,0.3)",
        }}
      >
        <h2>📡 Live Navigation Status</h2>

        <h3>
          GPS:{" "}
          {startPoint
            ? "🟢 Active"
            : "🔴 Offline"}
        </h3>

        <h3>
          Destination:
          {destination
            ? ` ${destination}`
            : " Not Selected"}
        </h3>
      </div>

      <div
        style={{
          width: "95%",
          height: "500px",
          margin: "30px auto",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow:
            "0 8px 20px rgba(0,0,0,0.4)",
        }}
      >
        <MapContainer
          center={
            startPoint || [13.0827, 80.2707]
          }
          zoom={10}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {startPoint && (
            <Marker position={startPoint}>
              <Popup>
                Current Location
              </Popup>
            </Marker>
          )}

          {endPoint && (
            <Marker position={endPoint}>
              <Popup>
                Destination
              </Popup>
            </Marker>
          )}

          {route.length > 0 && (
            <Polyline
              positions={route}
              pathOptions={{
                color: "blue",
                weight: 6,
              }}
            />
          )}
        </MapContainer>
      </div>

      {distance && (
        <div
          style={{
            backgroundColor: "white",
            maxWidth: "600px",
            margin: "20px auto",
            padding: "25px",
            borderRadius: "20px",
            boxShadow:
              "0 8px 20px rgba(0,0,0,0.3)",
          }}
        >
          <h2>
            📍 Distance:
            {distance} KM
          </h2>

          <h2>
            ⏱ Time:
            {duration} Minutes
          </h2>

          <h2>
            🛡 Safety Score:
            {safetyScore}%
          </h2>

          <h2
            style={{
              color:
                safetyScore > 70
                  ? "green"
                  : safetyScore > 40
                  ? "orange"
                  : "red",
            }}
          >
            {riskLevel}
          </h2>
        </div>
      )}
    </div>
  );
}

export default SafeRoute;