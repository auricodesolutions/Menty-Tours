import React, { useEffect } from "react";
import "./OurIsland.css";
import mapImg from "../../assets/map-srilanka.png";
import beach from "../../assets/img.jpg";
import wildlife from "../../assets/elephant.jpg";
import adventure from "../../assets/adventure.jpg";
import culture from "../../assets/culture image.jpg";
import hills from "../../assets/adventure.jpg";
import food from "../../assets/food.jpg";

export default function OurIsland() {
  useEffect(() => {
    const els = document.querySelectorAll(".island-reveal");
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

  const categories = [
    { img: beach, title: "Popular Beaches" },
    { img: wildlife, title: "Wildlife & Nature" },
    { img: adventure, title: "Adventure" },
    { img: culture, title: "History & Culture" },
    { img: hills, title: "Lesser Travelled" },
    { img: food, title: "Gastronomy" },
  ];

  return (
    <section className="island-section" id="our-island" aria-label="Our Island Sri Lanka">
      <div className="island-container">
        <header className="island-head island-reveal">
          <h2>Our Island</h2>
          <p className="sub">Sri Lanka</p>
        </header>

        <div className="island-grid island-reveal">
          {/* Left side (Desktop view) */}
          <div className="island-side desktop-only">
            {categories.slice(0, 3).map((c, i) => (
              <div className="island-card" key={i}>
                <div className="island-circle">
                  <img src={c.img} alt={c.title} loading="lazy" />
                </div>
                <h4>{c.title}</h4>
              </div>
            ))}
          </div>

          {/* Map in the center */}
          <div className="island-map">
            <div className="island-map-glow"></div>
            <img src={mapImg} alt="Sri Lanka Map" />
          </div>

          {/* Right side (Desktop view) */}
          <div className="island-side desktop-only">
            {categories.slice(3).map((c, i) => (
              <div className="island-card" key={i}>
                <h4>{c.title}</h4>
                <div className="island-circle">
                  <img src={c.img} alt={c.title} loading="lazy" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile carousel under the map */}
        <div className="island-carousel mobile-only">
          {categories.map((c, i) => (
            <div className="island-card" key={i}>
              <div className="island-circle">
                <img src={c.img} alt={c.title} loading="lazy" />
              </div>
              <h4>{c.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
