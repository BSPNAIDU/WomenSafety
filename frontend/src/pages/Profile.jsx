import { Link } from "react-router-dom";

function Profile() {
  const user =
    JSON.parse(
      localStorage.getItem(
        "loggedInUser"
      )
    ) || {};

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)",
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

      <div
        style={{
          maxWidth: "650px",
          margin: "auto",
          backgroundColor: "white",
          borderRadius: "25px",
          padding: "35px",
          boxShadow:
            "0 8px 20px rgba(0,0,0,0.3)",
        }}
      >
        <div
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background:
              "linear-gradient(135deg,#3b82f6,#1e40af)",
            color: "white",
            fontSize: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "auto",
            marginBottom: "20px",
          }}
        >
          👤
        </div>

        <h1
          style={{
            color: "#1e3a8a",
          }}
        >
          My Profile
        </h1>

        <p
          style={{
            color: "#64748b",
          }}
        >
          SafeRoute AI User Account
        </p>

        <div
          style={{
            backgroundColor: "#f8fafc",
            padding: "20px",
            borderRadius: "15px",
            marginTop: "25px",
            textAlign: "left",
          }}
        >
          <h2>
            👨 Name
          </h2>

          <p>
            {user.name ||
              "Not Available"}
          </p>
        </div>

        <div
          style={{
            backgroundColor: "#f8fafc",
            padding: "20px",
            borderRadius: "15px",
            marginTop: "15px",
            textAlign: "left",
          }}
        >
          <h2>
            📧 Email
          </h2>

          <p>
            {user.email ||
              "Not Available"}
          </p>
        </div>
                <div
          style={{
            backgroundColor: "#f8fafc",
            padding: "20px",
            borderRadius: "15px",
            marginTop: "15px",
            textAlign: "left",
          }}
        >
          <h2>
            📱 Phone Number
          </h2>

          <p>
            {user.phone ||
              "Not Available"}
          </p>
        </div>

        <div
          style={{
            backgroundColor: "#dcfce7",
            padding: "20px",
            borderRadius: "15px",
            marginTop: "20px",
          }}
        >
          <h2
            style={{
              color: "#15803d",
            }}
          >
            ✅ Account Status
          </h2>

          <p>
            Active User
          </p>
        </div>

        <div
          style={{
            backgroundColor: "#dbeafe",
            padding: "20px",
            borderRadius: "15px",
            marginTop: "20px",
          }}
        >
          <h2
            style={{
              color: "#1d4ed8",
            }}
          >
            🛡 Safety Member
          </h2>

          <p>
            Registered in
            SafeRoute AI
            Women Safety
            Platform
          </p>
        </div>

        <div
          style={{
            marginTop: "25px",
          }}
        >
          <button
            style={{
              background:
                "linear-gradient(90deg,#2563eb,#1e40af)",
              color: "white",
              border: "none",
              padding:
                "12px 25px",
              borderRadius:
                "10px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            👤 Profile Active
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;