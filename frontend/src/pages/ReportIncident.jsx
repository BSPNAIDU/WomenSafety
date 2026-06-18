import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ReportIncident() {
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/reports"
      );

      setReports(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const submitReport = async () => {
    if (!type || !location || !description) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/reports",
        {
          type,
          location,
          description,
        }
      );

      setType("");
      setLocation("");
      setDescription("");

      fetchReports();

      alert(
        "Incident Report Submitted Successfully"
      );
    } catch (error) {
      console.log(error);
      alert("Failed to save report");
    }
  };

  const deleteReport = async (id) => {
    try {
      await axios.delete(
        `https://saferoute-backend-zxrv.onrender.com/api/reports${id}`
      );

      alert("Report Deleted Successfully");

      fetchReports();
    } catch (error) {
      console.log(error);
      alert("Failed to delete report");
    }
  };

  const calculateSafetyScore = () => {
    let score = 100 - reports.length * 5;

    if (score < 0) {
      score = 0;
    }

    return score;
  };

  const safetyScore = calculateSafetyScore();

  let safetyColor = "green";
  let safetyText = "🟢 Safe Area";

  if (
    safetyScore <= 70 &&
    safetyScore > 40
  ) {
    safetyColor = "orange";
    safetyText = "🟡 Moderate Risk";
  }

  if (safetyScore <= 40) {
    safetyColor = "red";
    safetyText = "🔴 High Risk Area";
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "30px",
        background:
          "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)",
        textAlign: "center",
      }}
    >
      <Link to="/dashboard">
        <button
          style={{
            padding: "10px 20px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          ⬅ Back to Dashboard
        </button>
      </Link>

      <h1 style={{ color: "white" }}>
        📢 Report Incident
      </h1>

      <div
        style={{
          backgroundColor: "white",
          maxWidth: "500px",
          margin: "20px auto",
          padding: "25px",
          borderRadius: "20px",
          boxShadow:
            "0 8px 20px rgba(0,0,0,0.3)",
        }}
      >
        <h2>AI Risk Analysis</h2>

        <h1 style={{ color: safetyColor }}>
          {safetyScore}%
        </h1>

        <h2 style={{ color: safetyColor }}>
          {safetyText}
        </h2>

        <p>
          Total Incidents Reported:
          {reports.length}
        </p>
      </div>

      <div
        style={{
          backgroundColor: "white",
          maxWidth: "500px",
          margin: "20px auto",
          padding: "25px",
          borderRadius: "20px",
          boxShadow:
            "0 8px 20px rgba(0,0,0,0.3)",
        }}
      >
        <select
          value={type}
          onChange={(e) =>
            setType(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "10px",
          }}
        >
          <option value="">
            Select Incident Type
          </option>
          <option>Harassment</option>
          <option>Theft</option>
          <option>Stalking</option>
          <option>Poor Lighting</option>
          <option>Suspicious Activity</option>
        </select>

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) =>
            setLocation(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "10px",
          }}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          style={{
            width: "100%",
            height: "120px",
            padding: "12px",
            marginBottom: "10px",
          }}
        />

        <button
          onClick={submitReport}
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "12px 25px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Submit Report
        </button>
      </div>

      <h1
        style={{
          color: "white",
          marginTop: "40px",
        }}
      >
        Reported Incidents
      </h1>

      {reports.length === 0 ? (
        <p style={{ color: "white" }}>
          No Reports Available
        </p>
      ) : (
        reports.map((report) => (
          <div
            key={report._id}
            style={{
              backgroundColor: "white",
              maxWidth: "700px",
              margin: "20px auto",
              padding: "25px",
              borderRadius: "20px",
              boxShadow:
                "0 8px 20px rgba(0,0,0,0.3)",
            }}
          >
            <h2>{report.type}</h2>

            <p>
              <strong>Location:</strong>{" "}
              {report.location}
            </p>

            <p>
              <strong>Description:</strong>{" "}
              {report.description}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(
                report.date
              ).toLocaleString()}
            </p>

            <button
              onClick={() => {
                if (
                  window.confirm(
                    "Delete this report?"
                  )
                ) {
                  deleteReport(
                    report._id
                  );
                }
              }}
              style={{
                backgroundColor:
                  "#dc2626",
                color: "white",
                border: "none",
                padding:
                  "10px 20px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              🗑 Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default ReportIncident;