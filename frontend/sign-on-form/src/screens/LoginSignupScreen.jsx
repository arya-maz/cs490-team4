import React, { useEffect } from 'react'
import LoginRegister from '../components/LoginRegister/LoginRegister.jsx';
export default function LoginSignupScreen() {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "url('../components/assets/bg-mid-3.png') no-repeat center center",
    backgroundSize: "cover",
  };
  return (
    <div style={containerStyle}>
      <LoginRegister/>
    </div>
  )
}