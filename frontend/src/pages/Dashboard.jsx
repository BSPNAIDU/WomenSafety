import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [totalContacts, setTotalContacts] = useState(0);
  const [totalReports, setTotalReports] = useState(0);

  const user =
    JSON.parse(
      localStorage.getItem(
        "loggedInUser"
      )
    ) || {};

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const contactsResponse =
        await axios.get(
          "https://saferoute-backend-zxrv.onrender.com/api/contacts"
        );

      const reportsResponse =
        await axios.get(
          "https://saferoute-backend-zxrv.onrender.com/api/reports"
        );

      setTotalContacts(
        contactsResponse.data.length
      );

      setTotalReports(
        reportsResponse.data.length
      );
    } catch (error) {
      console.log(error);
    }
  };

  let safetyScore =
    100 - totalReports * 5;

  if (safetyScore < 0) {
    safetyScore = 0;
  }

  const logout = () => {
    localStorage.removeItem(
      "loggedInUser"
    );

    window.location.href = "/";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)",
        padding: "30px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "25px",
          borderRadius: "20px",
          boxShadow:
            "0 8px 20px rgba(0,0,0,0.2)",
          marginBottom: "25px",
        }}
      >
        <h1
          style={{
            color: "#1e3a8a",
          }}
        >
          🛡 SafeRoute AI Dashboard
        </h1>

        <h2
          style={{
            color: "#2563eb",
          }}
        >
          Welcome,
          {user.name || "User"}
        </h2>

        <p>
          Smart Women Safety Navigation
          Platform
        </p>
      </div>

      <div
        style={{
          background:
            "linear-gradient(90deg,#22c55e,#16a34a)",
          color: "white",
          padding: "20px",
          borderRadius: "20px",
          marginBottom: "25px",
          textAlign: "center",
        }}
      >
        <h2>
          🚀 AI Powered Women Safety
          Platform
        </h2>

        <p>
          Real-Time Navigation,
          Emergency SOS,
          Crime Analytics &
          Emergency Contacts
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(135deg,#22c55e,#16a34a)",
            color: "white",
            padding: "25px",
            borderRadius: "20px",
            textAlign: "center",
          }}
        >
          <h2>👥 Contacts</h2>
          <h1>{totalContacts}</h1>
        </div>

        <div
          style={{
            background:
              "linear-gradient(135deg,#f59e0b,#f97316)",
            color: "white",
            padding: "25px",
            borderRadius: "20px",
            textAlign: "center",
          }}
        >
          <h2>📢 Reports</h2>
          <h1>{totalReports}</h1>
        </div>

        <div
          style={{
            background:
              "linear-gradient(135deg,#3b82f6,#2563eb)",
            color: "white",
            padding: "25px",
            borderRadius: "20px",
            textAlign: "center",
          }}
        >
          <h2>🛡 Safety Score</h2>
          <h1>{safetyScore}%</h1>
        </div>

        <div
          style={{
            background:
              "linear-gradient(135deg,#ef4444,#dc2626)",
            color: "white",
            padding: "25px",
            borderRadius: "20px",
            textAlign: "center",
          }}
        >
          <h2>🚨 SOS</h2>
          <h1>Active</h1>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "25px",
        }}
      >
                <Link
          to="/saferoute"
          style={{ textDecoration: "none" }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "30px",
              textAlign: "center",
              boxShadow:
                "0 8px 20px rgba(0,0,0,0.2)",
            }}
          >
            <h1>🗺️</h1>
            <h2>Safe Route</h2>
            <p>
              Find the safest route to
              your destination.
            </p>
          </div>
        </Link>

        <Link
          to="/sos"
          style={{ textDecoration: "none" }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "30px",
              textAlign: "center",
              boxShadow:
                "0 8px 20px rgba(0,0,0,0.2)",
            }}
          >
            <h1>🚨</h1>
            <h2>SOS Emergency</h2>
            <p>
              Send emergency alerts
              instantly.
            </p>
          </div>
        </Link>

        <Link
          to="/contacts"
          style={{ textDecoration: "none" }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "30px",
              textAlign: "center",
              boxShadow:
                "0 8px 20px rgba(0,0,0,0.2)",
            }}
          >
            <h1>👥</h1>
            <h2>Emergency Contacts</h2>
            <p>
              Manage trusted emergency
              contacts.
            </p>
          </div>
        </Link>

        <Link
          to="/analytics"
          style={{ textDecoration: "none" }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "30px",
              textAlign: "center",
              boxShadow:
                "0 8px 20px rgba(0,0,0,0.2)",
            }}
          >
            <h1>📊</h1>
            <h2>Safety Analytics</h2>
            <p>
              Crime dataset insights,
              safety score and risk
              analysis.
            </p>
          </div>
        </Link>

        <Link
          to="/profile"
          style={{ textDecoration: "none" }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "30px",
              textAlign: "center",
              boxShadow:
                "0 8px 20px rgba(0,0,0,0.2)",
            }}
          >
            <h1>👤</h1>
            <h2>Profile</h2>
            <p>
              View and manage your
              account information.
            </p>
          </div>
        </Link>
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        <button
          onClick={logout}
          style={{
            background:
              "linear-gradient(135deg,#ef4444,#dc2626)",
            color: "white",
            padding: "15px 40px",
            border: "none",
            borderRadius: "15px",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow:
              "0 6px 15px rgba(0,0,0,0.3)",
          }}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;