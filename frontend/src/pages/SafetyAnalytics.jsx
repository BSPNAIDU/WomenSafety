import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function SafetyAnalytics() {
  const [data, setData] =
    useState([]);

  useEffect(() => {
    fetchSafetyData();
  }, []);

  const fetchSafetyData = async () => {
    try {
      const response =
        await axios.get(
          "http://localhost:5000/api/safety"
        );

      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const totalRecords =
    data.length;

  const safeAreas =
    data.filter(
      (item) =>
        item.riskLevel === "Safe"
    ).length;

  const mediumAreas =
    data.filter(
      (item) =>
        item.riskLevel ===
        "Medium"
    ).length;

  const highAreas =
    data.filter(
      (item) =>
        item.riskLevel === "High"
    ).length;

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)",
        padding: "30px",
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
          textAlign: "center",
          fontSize: "40px",
        }}
      >
        📊 Safety Analytics
      </h1>

      <div
        style={{
          backgroundColor:
            "white",
          padding: "20px",
          borderRadius: "20px",
          marginTop: "20px",
          textAlign: "center",
          boxShadow:
            "0 8px 20px rgba(0,0,0,0.3)",
        }}
      >
        <h2>
          Crime Dataset Insights
        </h2>

        <p>
          AI-Based Safety
          Analysis Dashboard
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
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
          <h2>
            Total Records
          </h2>

          <h1>
            {totalRecords}
          </h1>
        </div>

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
          <h2>
            Safe Areas
          </h2>

          <h1>
            {safeAreas}
          </h1>
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
          <h2>
            Medium Risk
          </h2>

          <h1>
            {mediumAreas}
          </h1>
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
          <h2>
            High Risk
          </h2>

          <h1>
            {highAreas}
          </h1>
        </div>
      </div>

      <h2
        style={{
          color: "white",
          marginTop: "40px",
          textAlign: "center",
        }}
      >
        🏙 State Safety Data
      </h2>
            <div
        style={{
          maxWidth: "1000px",
          margin: "20px auto",
        }}
      >
        {data.length === 0 ? (
          <div
            style={{
              backgroundColor:
                "white",
              padding: "25px",
              borderRadius: "20px",
              textAlign: "center",
            }}
          >
            <h3>
              Loading Dataset...
            </h3>
          </div>
        ) : (
          data.map((item) => (
            <div
              key={item._id}
              style={{
                backgroundColor:
                  "white",
                padding: "20px",
                marginBottom:
                  "15px",
                borderRadius:
                  "20px",
                boxShadow:
                  "0 8px 20px rgba(0,0,0,0.2)",
              }}
            >
              <h2
                style={{
                  color:
                    "#1e3a8a",
                }}
              >
                📍 {item.state}
              </h2>

              <p>
                <strong>
                  Crime Count:
                </strong>{" "}
                {
                  item.crimeCount
                }
              </p>

              <p>
                <strong>
                  Safety Score:
                </strong>{" "}
                {
                  item.safetyScore
                }
              </p>

              <p>
                <strong>
                  Risk Level:
                </strong>{" "}
                <span
                  style={{
                    color:
                      item.riskLevel ===
                      "Safe"
                        ? "green"
                        : item.riskLevel ===
                          "Medium"
                        ? "orange"
                        : "red",
                    fontWeight:
                      "bold",
                  }}
                >
                  {
                    item.riskLevel
                  }
                </span>
              </p>
            </div>
          ))
        )}
      </div>

      <div
        style={{
          backgroundColor:
            "white",
          padding: "25px",
          borderRadius: "20px",
          marginTop: "20px",
          textAlign: "center",
          boxShadow:
            "0 8px 20px rgba(0,0,0,0.3)",
        }}
      >
        <h2>
          🤖 AI Recommendation
        </h2>

        <p>
          Prefer routes through
          Safe Areas and avoid
          High Risk Areas for
          better safety.
        </p>
      </div>
    </div>
  );
}

export default SafetyAnalytics;