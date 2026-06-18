import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        background:
          "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)",
        color: "white",
      }}
    >
      {/* Navbar */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 50px",
        }}
      >
        <h1>🛡 SafeRoute AI</h1>

        <div>
          <Link to="/login">
            <button
              style={{
                padding: "10px 20px",
                marginRight: "10px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </Link>

          <Link to="/register">
            <button
              style={{
                padding: "10px 20px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                backgroundColor: "#22c55e",
                color: "white",
              }}
            >
              Register
            </button>
          </Link>
        </div>
      </div>

      {/* Hero Section */}

      <div
        style={{
          textAlign: "center",
          padding: "80px 20px",
        }}
      >
        <h1
          style={{
            fontSize: "55px",
            marginBottom: "20px",
          }}
        >
          Smart Women Safety Navigation
        </h1>

        <p
          style={{
            fontSize: "22px",
            maxWidth: "800px",
            margin: "auto",
          }}
        >
          AI Powered Women Safety Platform
          with Safe Route Prediction,
          Emergency SOS, Crime Analytics
          and Real-Time Safety Monitoring.
        </p>

        <Link to="/register">
          <button
            style={{
              marginTop: "30px",
              padding: "15px 35px",
              fontSize: "18px",
              border: "none",
              borderRadius: "15px",
              backgroundColor: "#22c55e",
              color: "white",
              cursor: "pointer",
            }}
          >
            🚀 Get Started
          </button>
        </Link>
      </div>

      {/* Features */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(280px,1fr))",
          gap: "25px",
          padding: "40px",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            color: "black",
            padding: "25px",
            borderRadius: "20px",
            textAlign: "center",
          }}
        >
          <h1>🗺️</h1>
          <h2>Safe Route Navigation</h2>
          <p>
            Find the safest route using
            AI-based risk analysis.
          </p>
        </div>

        <div
          style={{
            backgroundColor: "white",
            color: "black",
            padding: "25px",
            borderRadius: "20px",
            textAlign: "center",
          }}
        >
          <h1>🚨</h1>
          <h2>Emergency SOS</h2>
          <p>
            Send emergency alerts with
            live location sharing.
          </p>
        </div>

        <div
          style={{
            backgroundColor: "white",
            color: "black",
            padding: "25px",
            borderRadius: "20px",
            textAlign: "center",
          }}
        >
          <h1>📊</h1>
          <h2>Crime Analytics</h2>
          <p>
            Analyze crime datasets and
            identify high-risk areas.
          </p>
        </div>

        <div
          style={{
            backgroundColor: "white",
            color: "black",
            padding: "25px",
            borderRadius: "20px",
            textAlign: "center",
          }}
        >
          <h1>👥</h1>
          <h2>Emergency Contacts</h2>
          <p>
            Store trusted contacts for
            instant communication.
          </p>
        </div>
      </div>

      {/* Footer */}

      <div
        style={{
          textAlign: "center",
          padding: "30px",
          marginTop: "30px",
          backgroundColor: "rgba(0,0,0,0.2)",
        }}
      >
        <h3>SafeRoute AI © 2026</h3>
        <p>
          Smart Women Safety Navigation
          System
        </p>
      </div>
    </div>
  );
}

export default Home;