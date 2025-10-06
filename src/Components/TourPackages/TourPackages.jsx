import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./TourPackages.css";
import { TOUR_PACKAGES } from "../../data/tourPackagesData";

// small icons
const Clock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.8">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v6l4 2" />
  </svg>
);
const MapPin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.8">
    <path d="M20.8 10.5c0 5.5-8.8 11-8.8 11S3.2 16 3.2 10.5a8.8 8.8 0 1 1 17.6 0z"></path>
    <circle cx="12" cy="10.5" r="3"></circle>
  </svg>
);
const ArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
    <path d="M5 12h14"></path>
    <path d="M12 5l7 7-7 7"></path>
  </svg>
);

export default function TourPackages() {
  const [cat, setCat] = useState("All");
  const filtered = useMemo(
    () => TOUR_PACKAGES.filter((p) => (cat === "All" ? true : p.category === cat)),
    [cat]
  );

  return (
    <section className="tp-section" id="packages">
      <div className="tp-container">
        <header className="tp-head">
          <p className="tp-eyebrow">Most Famous Tour Packages</p>
          <h2 className="tp-title">Top Sri Lanka itineraries travellers love</h2>
          <p className="tp-sub">
            Handpicked routes that blend iconic sights with authentic local experiences.
          </p>
        </header>

        {/* Category Filter */}
        <div className="tp-filters">
          {["All", "Culture", "Nature", "Adventure", "Beach", "Explorer", "Honeymoon"].map((c) => (
            <button
              key={c}
              className={`tp-chip ${cat === c ? "is-active" : ""}`}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Package Cards */}
        <div className="tp-grid">
          {filtered.map((p) => (
            <article className="tp-card" key={p.id}>
              {p.best && <span className="tp-badge">Top pick</span>}
              <div className="tp-media">
                <img src={p.img} alt={p.title} />
                <span className="tp-duration">
                  <Clock /> {p.duration}
                </span>
              </div>

              <div className="tp-body">
                <h3>{p.title}</h3>
                <div className="tp-places">
                  <MapPin /> {p.places.join(" • ")}
                </div>
                <p className="tp-card__desc">{p.tags.join(" · ")}</p>

                <div className="tp-footer">
                  <div className="tp-price">
                    From <strong>USD {p.priceFrom}</strong> / {p.person} person
                  </div>
                  <div className="tp-actions">
                    <Link className="tp-btn tp-btn--ghost" to={`/trip/${p.id}`}>
                      View details
                    </Link>
                    <Link className="tp-btn tp-btn--gold" to="/quote">
                      Get quote <ArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
