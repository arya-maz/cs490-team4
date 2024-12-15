import React from 'react';
import LoginRegister from '../components/LoginRegister/LoginRegister.jsx';
import bgImage from '../components/assets/bg-mid.png';  // Import background image

export default function LoginSignupScreen() {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundImage: `url(${bgImage})`, 
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
  };

  return (
    <div style={containerStyle}>
      <LoginRegister />
    </div>
  );
}
