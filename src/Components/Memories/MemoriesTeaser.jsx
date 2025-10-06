import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./MemoriesTeaser.css";

/* Pick any 4 photos */
import img1 from "../../assets/Memories/Memories-with torism couple (2).jpeg";
import img2 from "../../assets/Memories/Memories-with torism couple (5).jpeg";
import img3 from "../../assets/Memories/Memories-with torism couple (7).jpeg";
import img4 from "../../assets/Memories/Memories-with torism couple (1).jpeg"; // <-- new image

/* tiny reveal */
function useReveal(selector = ".mem9-reveal", threshold = 0.14) {
  useEffect(() => {
    const els = document.querySelectorAll(selector);
    if (!els.length) return;
    const show = () => els.forEach((el) => el.classList.add("show"));
    if (!("IntersectionObserver" in window)) return show();
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("show");
            io.unobserve(e.target);
          }
        }),
      { threshold }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [selector, threshold]);
}

export default function MemoriesTeaserTrio() {
  useReveal();

  const cards = [
    { src: img1, title: "Boat day — smiles all round", place: "Pigeon Island" },
    { src: img2, title: "Baby croc encounter", place: "Madu River" },
    { src: img3, title: "Fish spa giggles", place: "Madu River" },
    { src: img4, title: "Sunset walk on the beach", place: "Mirissa" }, // <-- new memory card
  ];

  return (
    <section className="mem9" aria-label="Tour memories">
      <header className="mem9-head mem9-reveal">
        <div className="mem9-badge">Tour Memories</div>
        <h2>Little moments. Big smiles.</h2>
        <p className="mem9-sub">
          From beach coconuts to mangrove safaris — a few highlights our guests keep talking about.
        </p>
      </header>

      <div className="mem9-grid mem9-reveal">
        {cards.map((c, i) => (
          <figure className="mem9-card" key={i}>
            <div className="art">
              <img src={c.src} alt={c.title} loading="lazy" decoding="async" />
            </div>
            <figcaption>
              <strong>{c.title}</strong>
              <span>{c.place}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mem9-cta mem9-reveal">
        <Link to="/memories" className="tm-btn mem9-btn">
          Explore more
        </Link>
      </div>
    </section>
  );
}
