import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] =
    useState("");
  const [showPassword, setShowPassword] =
    useState(false);

  const handleRegister = async () => {
    if (
      !name ||
      !email ||
      !phone ||
      !password
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(
        "https://saferoute-backend-zxrv.onrender.com/api/users/register",
        {
          name,
          email,
          phone,
          password,
        }
      );

      alert("Registration Successful");

      navigate("/login");
    } catch (error) {
      alert("Registration Failed");
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
          width: "500px",
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
          Create New Account
        </h3>

        <p
          style={{
            color: "#bfdbfe",
            marginBottom: "25px",
          }}
        >
          Join the Smart Women Safety
          Platform
        </p>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "10px",
            border: "none",
            marginBottom: "15px",
          }}
        />

        <input
          type="email"
          placeholder="Email Address"
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

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
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
            placeholder="Create Password"
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
          onClick={handleRegister}
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
          Create Account
        </button>

        <p
          style={{
            marginTop: "20px",
          }}
        >
          Already have an account?
        </p>

        <Link
          to="/login"
          style={{
            color: "#93c5fd",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Login Here
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
            ✅ AI Route Prediction
          </p>
          <p>
            ✅ Emergency SOS Alerts
          </p>
          <p>
            ✅ Crime Analytics
          </p>
          <p>
            ✅ Emergency Contact Management
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;