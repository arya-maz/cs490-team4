import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import { LoginSignupScreen, ResumeScreen, DashboardScreen } from "./screens";
import { LoginSignupScreen, ResumeScreen, DashboardScreen, DashScreen4 } from "./screens";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default login/signup screen */}
        <Route path="/" element={<LoginSignupScreen />} />
        {/* Resume upload screen */}
        <Route path="/resumeUpload" element={<ResumeScreen />} />
        {/*Dashboard screen*/}
        <Route path="/dashboard" element={<DashboardScreen />} />
        <Route path="/dashboard2" element={<DashScreen4 />} />
        {/* Fallback for unmatched routes */}
        <Route
          path="*"
          element={
            <div style={{ textAlign: "center", marginTop: "20vh" }}>
              <h1>404 - Page Not Found</h1>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
