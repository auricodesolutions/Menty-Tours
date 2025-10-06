import React from "react";
import "./Loader.css";
import logo from "../../assets/logo.png"; // ✅ replace with your logo path

export default function Loader() {
  return (
    <div className="loader light">
      <div className="loader-content">
        <div className="wave-spinner">
          <img src={logo} alt="Menty Tours" className="loader-logo" />
        </div>
        <p className="loader-text">Loading your journey......</p>
      </div>
    </div>
  );
}
