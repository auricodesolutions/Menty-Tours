import React, { useEffect } from "react";
import "./DestinationsSection.css";

// Import your destination images
import anu from "../../assets/Anuradhapura.jpg";
import aru from "../../assets/arugam-bay.jpg";
import col from "../../assets/Colombo.jpg";
import bent from "../../assets/Kandy .jpg";
import ella from "../../assets/Ella.jpg";
import galle from "../../assets/Galle.jpg";
import sigiriya from "../../assets/Sigiriya.jpg";
import nuwara from "../../assets/NuwaraEliya.png";

export default function DestinationsSection() {
  useEffect(() => {
    const els = document.querySelectorAll(".dest-reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("show");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const places = [
    { name: "Anuradhapura", img: anu },
    { name: "Arugam Bay", img: aru },
    { name: "Colombo", img: col },
    { name: "Kandy", img: bent },
    { name: "Ella", img: ella },
    { name: "Galle", img: galle },
    { name: "Sigiriya", img: sigiriya }, // 🆕 added
    { name: "Nuwara Eliya", img: nuwara }, // 🆕 added
  ];

  return (
    <section className="destinations" id="destinations">
      <header className="dest-head dest-reveal">
        <h2>Fortresses, forests, temples, treasures</h2>
        <p className="sub">Magical Destinations</p>
        
      </header>

      <div className="dest-grid dest-reveal">
        {places.map((p, i) => (
          <div className="dest-card" key={i}>
            <img src={p.img} alt={p.name} loading="lazy" />
            <div className="dest-overlay"></div>
            <div className="dest-info">
              <h3>{p.name}</h3>
              <span>📍 Destinations</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
