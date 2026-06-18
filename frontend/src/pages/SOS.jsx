import { Link } from "react-router-dom";
import { useRef, useState } from "react";

function SOS() {
  const audioRef = useRef(
    new Audio("/siren.mp3")
  );

  const [contact, setContact] =
    useState(null);

  const [mapLink, setMapLink] =
    useState("");

  const [gpsStatus, setGpsStatus] =
    useState("Waiting...");

  const playSiren = async () => {
    audioRef.current.play();

    try {
      const response = await fetch(
        "http://localhost:5000/api/contacts"
      );

      const contacts =
        await response.json();

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat =
            position.coords.latitude;

          const lon =
            position.coords.longitude;

          setGpsStatus("🟢 Active");

          const priorityContact =
            contacts.find(
              (c) => c.priority
            ) || contacts[0];

          const locationLink =
            `https://maps.google.com/?q=${lat},${lon}`;

          setContact(
            priorityContact
          );

          setMapLink(locationLink);

          if (priorityContact) {
            alert(
              `🚨 EMERGENCY ALERT 🚨

Contact:
${priorityContact.name}

Phone:
${priorityContact.phone}

Location:
${locationLink}`
            );
          }
        },

        () => {
          setGpsStatus(
            "🔴 GPS Offline"
          );

          alert(
            "Unable to Get Location"
          );
        }
      );
    } catch (error) {
      console.log(error);

      alert(
        "Unable to Load Contacts"
      );
    }
  };

  const stopSiren = () => {
    audioRef.current.pause();

    audioRef.current.currentTime = 0;
  };

  const shareWhatsApp = () => {
    if (!mapLink) {
      alert(
        "Location Not Available"
      );
      return;
    }

    const message =
      `🚨 EMERGENCY ALERT 🚨

I Need Help.

My Current Location:

${mapLink}`;

    window.open(
      `https://wa.me/?text=${encodeURIComponent(
        message
      )}`,
      "_blank"
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#7f1d1d,#dc2626)",
        padding: "30px",
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
        🚨 Emergency SOS
      </h1>

      <div
        style={{
          backgroundColor: "white",
          maxWidth: "500px",
          margin: "20px auto",
          padding: "20px",
          borderRadius: "20px",
          boxShadow:
            "0 8px 20px rgba(0,0,0,0.3)",
        }}
      >
        <h2>
          📡 GPS Status:
          {gpsStatus}
        </h2>

        <p>
          Emergency Location
          Tracking Enabled
        </p>
      </div>

      <button
        onClick={playSiren}
        style={{
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          backgroundColor: "#dc2626",
          color: "white",
          fontSize: "60px",
          border: "none",
          cursor: "pointer",
          boxShadow:
            "0px 0px 50px red",
          fontWeight: "bold",
        }}
      >
        SOS
      </button>

      <br />
      <br />

      <button
        onClick={stopSiren}
        style={{
          padding: "12px 25px",
          backgroundColor: "black",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        Stop Siren
      </button>
            {contact && (
        <div
          style={{
            backgroundColor: "white",
            maxWidth: "500px",
            margin: "30px auto",
            padding: "25px",
            borderRadius: "20px",
            boxShadow:
              "0 8px 20px rgba(0,0,0,0.3)",
          }}
        >
          <h2>
            🚨 Emergency Contact
          </h2>

          <p>
            <strong>Name:</strong>{" "}
            {contact.name}
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {contact.phone}
          </p>

          <p>
            <strong>Relation:</strong>{" "}
            {contact.relation}
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              flexWrap: "wrap",
              marginTop: "20px",
            }}
          >
            <a
              href={`tel:${contact.phone}`}
            >
              <button
                style={{
                  backgroundColor:
                    "#16a34a",
                  color: "white",
                  border: "none",
                  padding:
                    "12px 20px",
                  borderRadius:
                    "10px",
                  cursor:
                    "pointer",
                }}
              >
                📞 Call
              </button>
            </a>

            <a
              href={mapLink}
              target="_blank"
              rel="noreferrer"
            >
              <button
                style={{
                  backgroundColor:
                    "#2563eb",
                  color: "white",
                  border: "none",
                  padding:
                    "12px 20px",
                  borderRadius:
                    "10px",
                  cursor:
                    "pointer",
                }}
              >
                📍 Location
              </button>
            </a>

            <button
              onClick={
                shareWhatsApp
              }
              style={{
                backgroundColor:
                  "#25D366",
                color: "white",
                border: "none",
                padding:
                  "12px 20px",
                borderRadius:
                  "10px",
                cursor:
                  "pointer",
              }}
            >
              📱 WhatsApp
            </button>
          </div>
        </div>
      )}

      <div
        style={{
          backgroundColor: "white",
          maxWidth: "500px",
          margin: "25px auto",
          padding: "20px",
          borderRadius: "20px",
          boxShadow:
            "0 8px 20px rgba(0,0,0,0.3)",
        }}
      >
        <h2>
          ⚠ Emergency Instructions
        </h2>

        <p>
          1. Press SOS Button
        </p>

        <p>
          2. Share Location
        </p>

        <p>
          3. Call Trusted Contact
        </p>

        <p>
          4. Move to Safe Area
        </p>
      </div>

      <h3
        style={{
          color: "white",
          marginTop: "20px",
        }}
      >
        Press SOS During Emergency
      </h3>
    </div>
  );
}

export default SOS;