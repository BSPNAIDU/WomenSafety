import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SafeRoute from "./pages/SafeRoute";
import SOS from "./pages/SOS";
import ReportIncident from "./pages/ReportIncident";
import EmergencyContacts from "./pages/EmergencyContacts";
import Profile from "./pages/Profile";
import SafetyAnalytics from "./pages/SafetyAnalytics";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/saferoute"
          element={<SafeRoute />}
        />

        <Route
          path="/sos"
          element={<SOS />}
        />

        <Route
          path="/report"
          element={<ReportIncident />}
        />

        <Route
          path="/contacts"
          element={<EmergencyContacts />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/analytics"
          element={<SafetyAnalytics />}
        />

        <Route
          path="*"
          element={
            <h1
              style={{
                textAlign: "center",
                marginTop: "100px",
              }}
            >
              404 Page Not Found
            </h1>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;