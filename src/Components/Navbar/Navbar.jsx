import React, { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        {/* Logo */}
        <a href="/" className="nav-logo">
          <img src={logo} alt="Menty Tours" />
          <span>MENTY TOURS</span>
        </a>

        {/* Desktop Nav */}
        <nav className="nav-links">
          <a href="/">Home</a>
          <a href="#about">About Us</a>
          <a href="#services">Services</a>
          <a href="#packages">Packages</a>
          <a href="#contact">Contact Us</a>
          <a href="/quote" className="nav-btn">Plan My Trip</a>
        </nav>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Overlay */}
        <div
          className={`overlay ${menuOpen ? "show" : ""}`}
          onClick={() => setMenuOpen(false)}
        ></div>

        {/* Mobile Drawer */}
        <div className={`mobile-drawer ${menuOpen ? "open" : ""}`}>
          <div className="drawer-header">
            <a href="/" className="drawer-logo">
              <img src={logo} alt="Menty Tours" />
              <span>MENTY TOURS</span>
            </a>
            <button
              className="close-btn"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              ×
            </button>
          </div>

          <nav className="drawer-links">
            <a href="/" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>About Us</a>
            <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
            <a href="#packages" onClick={() => setMenuOpen(false)}>Packages</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact Us</a>
            <a
              href="/quote"
              className="drawer-btn"
              onClick={() => setMenuOpen(false)}
            >
              Plan My Trip
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
