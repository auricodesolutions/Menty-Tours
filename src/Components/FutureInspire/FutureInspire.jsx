import React, { useEffect } from "react";
import "./FutureInspire.css";
import bg from "../../assets/srilanka.jpg"; // scenic Sri Lanka photo

export default function FutureInspire() {
  useEffect(() => {
    const el = document.querySelector(".divider");
    const handleScroll = () => {
      const offset = window.scrollY * 0.4;
      el.style.backgroundPositionY = `${offset}px`;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className="divider"
      style={{ backgroundImage: `url(${bg})` }}
      id="travel-divider"
    >
      <div className="divider-overlay" />


      {/* Content */}
      <div className="divider-content">
        <h2>Protect Nature. Inspire Future Generations.</h2>
        <p>
          We invest in Sri Lanka’s youth and the environment — from school workshops to reforestation, 
          beach cleanups, and wildlife stewardship —so every journey today protects nature and creates 
          brighter paths for tomorrow.
        </p>
        <a href="/about-sri-lanka" className="divider-btn">
          Read More ▸
        </a>
      </div>
    </section>
  );
}
