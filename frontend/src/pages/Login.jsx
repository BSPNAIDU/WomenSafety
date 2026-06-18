import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
  const [showPassword, setShowPassword] =
    useState(false);

  const handleLogin = async () => {
    try {
      const response =
        await axios.post(
          "https://saferoute-backend-zxrv.onrender.com/api/users/login",
          {
            email,
            password,
          }
        );

      alert(response.data.message);

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(
          response.data.user
        )
      );

      navigate("/dashboard");
    } catch (error) {
      alert(
        "Invalid Email or Password"
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)",
      }}
    >
      <div
        style={{
          width: "450px",
          padding: "40px",
          borderRadius: "25px",
          background:
            "rgba(255,255,255,0.15)",
          backdropFilter: "blur(20px)",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.4)",
          textAlign: "center",
          color: "white",
        }}
      >
        <h1>🛡 SafeRoute AI</h1>

        <h3
          style={{
            color: "#dbeafe",
          }}
        >
          Welcome Back
        </h3>

        <p
          style={{
            color: "#bfdbfe",
            marginBottom: "25px",
          }}
        >
          Smart Women Safety Navigation
          Platform
        </p>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "10px",
            border: "none",
            marginBottom: "15px",
          }}
        />

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "15px",
          }}
        >
          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            style={{
              flex: 1,
              padding: "14px",
              borderRadius: "10px",
              border: "none",
            }}
          />

          <button
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            style={{
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              padding: "0 15px",
            }}
          >
            👁️
          </button>
        </div>

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "14px",
            background:
              "linear-gradient(90deg,#22c55e,#16a34a)",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Login
        </button>

        <p
          style={{
            marginTop: "20px",
          }}
        >
          Don't have an account?
        </p>

        <Link
          to="/register"
          style={{
            color: "#93c5fd",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Create Account
        </Link>

        <hr
          style={{
            margin: "25px 0",
            borderColor:
              "rgba(255,255,255,0.3)",
          }}
        />

        <div
          style={{
            textAlign: "left",
          }}
        >
          <p>
            ✅ Safe Route Prediction
          </p>
          <p>
            ✅ Emergency SOS Alerts
          </p>
          <p>
            ✅ Crime Analytics
          </p>
          <p>
            ✅ Emergency Contacts
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;