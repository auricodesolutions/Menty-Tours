import React, { useEffect, useRef, useState } from "react";
import "./Services.css";

/* ---- Robust scroll reveal (with guaranteed fallback) ---- */
const useReveal = () => {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".sv-reveal"));
    if (!els.length) return;

    // Show immediately on mount (prevents "empty section" if IO fails)
    requestAnimationFrame(() => els.forEach(el => el.classList.add("show")));

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("show");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
      );
      els.forEach((el) => io.observe(el));
      return () => io.disconnect();
    }
  }, []);
};

/* ---- Inline SVG icon set ---- */
const Icon = ({ name }) => {
  const common = {
    width: 26, height: 26, viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor", strokeWidth: 1.8,
    strokeLinecap: "round", strokeLinejoin: "round",
    "aria-hidden": true,
  };
  switch (name) {
    case "route":
      return (
        <svg {...common}>
          <circle cx="5" cy="17" r="2" />
          <circle cx="19" cy="7" r="2" />
          <path d="M7 17h6a4 4 0 0 0 4-4V7" />
          <path d="M9 17v-1.5" />
        </svg>
      );
    case "car":
      return (
        <svg {...common}>
          <path d="M3 12l2-5a2 2 0 0 1 2-1h8a2 2 0 0 1 2 1l2 5" />
          <path d="M5 12h14" />
          <rect x="2.5" y="12" width="19" height="5" rx="1.5" />
          <circle cx="7" cy="18" r="1.8" />
          <circle cx="17" cy="18" r="1.8" />
        </svg>
      );
    case "bed":
      return (
        <svg {...common}>
          <path d="M3 18v-8" />
          <path d="M3 12h18v6" />
          <rect x="5" y="10" width="5.5" height="2.5" rx="1" />
          <path d="M14 11h6" />
        </svg>
      );
    case "plane":
      return (
        <svg {...common}>
          <path d="M10 13L2 9l1-2 9 3 7-7 2 2-7 7 3 9-2 1-4-8-3 3v3l-2 1v-5l3-3z" />
        </svg>
      );
    case "castle":
      return (
        <svg {...common}>
          <path d="M3 21V8l3-2 3 2 3-2 3 2 3-2v13" />
          <path d="M6 21v-6h4v6" />
          <path d="M14 21v-8h4v8" />
          <rect x="10" y="11" width="2" height="2" />
        </svg>
      );
    case "binocs":
      return (
        <svg {...common}>
          <circle cx="7" cy="15.5" r="3.5" />
          <circle cx="17" cy="15.5" r="3.5" />
          <path d="M10.5 6l-2 6" />
          <path d="M13.5 6l2 6" />
          <path d="M9 6h6l1 2H8z" />
        </svg>
      );
    case "train":
      return (
        <svg {...common}>
          <rect x="5" y="4" width="14" height="12" rx="2" />
          <path d="M5 12h14" />
          <circle cx="9" cy="16.5" r="1.4" />
          <circle cx="15" cy="16.5" r="1.4" />
          <path d="M8 20l2-2h4l2 2" />
        </svg>
      );
    case "beach":
      return (
        <svg {...common}>
          <path d="M3 20h18" />
          <path d="M5 18s2-2 6-2 6 2 6 2" />
          <path d="M9 12c0-3.5 2.5-6 6-6" />
          <path d="M13 6l3-1 1 3" />
          <path d="M13 6l-1 4" />
        </svg>
      );
    default:
      return null;
  }
};

/* ---- Data ---- */
const SERVICES = [
  { icon: "route",  title: "Tailor-Made Itineraries",   desc: "Trips designed around your dates, budget, and travel style — no templates.", tags: ["Custom plan", "Flexible pace"] },
  { icon: "car",    title: "Private Drivers & Vehicles", desc: "Air-conditioned cars, vans, and SUVs with safe, English-speaking drivers.", tags: ["AC vehicles", "Fuel included"] },
  { icon: "bed",    title: "Hotel & Villa Bookings",    desc: "Handpicked boutique stays with great locations and warm hospitality.", tags: ["Boutique", "Resorts"] },
  { icon: "plane",  title: "Airport Transfers",         desc: "Meet-and-greet pick-ups and drops, any time, any airport in Sri Lanka.", tags: ["On time", "Fixed price"] },
  { icon: "castle", title: "Culture & Heritage Tours",  desc: "Sigiriya, Anuradhapura, Polonnaruwa, Kandy — with licensed guides.", tags: ["UNESCO", "Local guides"] },
  { icon: "binocs", title: "Wildlife & Safari",         desc: "Yala, Udawalawe, Minneriya elephant gatherings, and whale watching.", tags: ["Park permits", "Trusted jeeps"] },
  { icon: "train",  title: "Scenic Train & Tea Country", desc: "Reserved seats, misty tea estates, and picture-perfect viewpoints.", tags: ["Ella route", "Photo stops"] },
  { icon: "beach",  title: "Beaches & Water Sports",    desc: "Bentota, Mirissa, Trinco — surfing, snorkeling, and sunset cruises.", tags: ["Seasonal picks", "Family friendly"] },
];

export default function Services({ onQuoteClick }) {
  useReveal();

  const trackRef = useRef(null);
  const [idx, setIdx] = useState(0);

  const slides = () => Array.from(trackRef.current?.querySelectorAll(".sv-slide") || []);

  const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

  const scrollToIndex = (i) => {
    const s = slides();
    if (!s.length) return;
    const target = s[clamp(i, 0, s.length - 1)];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
      setIdx(Array.from(s).indexOf(target));
    }
  };

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const s = slides();
    if (!s.length) return;

    // Find the slide whose left edge is closest to the current scrollLeft
    let closest = 0;
    let minDist = Infinity;
    for (let i = 0; i < s.length; i++) {
      const dist = Math.abs(s[i].offsetLeft - el.scrollLeft);
      if (dist < minDist) { minDist = dist; closest = i; }
    }
    setIdx(closest);
  };

  const onKey = (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); scrollToIndex(idx + 1); }
    if (e.key === "ArrowLeft")  { e.preventDefault(); scrollToIndex(idx - 1); }
  };

  const prev = () => scrollToIndex(idx - 1);
  const next = () => scrollToIndex(idx + 1);

  return (
    <section className="sv-section" id="services" aria-label="Menty Tours Services">
      <div className="sv-container">
        <header className="sv-head sv-reveal">
          <p className="sv-eyebrow">Our Services</p>
          <h2 className="sv-title">Everything you need for a smooth Sri Lankan journey</h2>
          <p className="sv-sub">
            Pick a curated tour or ask us to craft something from scratch. We handle planning,
            bookings, transport and on-trip support — you enjoy the holiday.
          </p>
        </header>

        {/* Carousel wrapper (acts as grid on desktop) */}
        <div className="sv-carousel sv-reveal" role="region" aria-label="Services carousel">
          <button
            className="sv-nav sv-nav--prev"
            onClick={prev}
            aria-label="Previous service"
            disabled={idx === 0}
          >
            ‹
          </button>

          <div
            className="sv-track"
            ref={trackRef}
            onScroll={onScroll}
            onKeyDown={onKey}
            tabIndex={0}
            aria-roledescription="carousel"
            aria-label="Scrollable list of services"
          >
            {SERVICES.map(({ icon, title, desc, tags }, i) => (
              <article
                className="sv-card sv-slide"
                key={title}
                style={{ "--d": `${i * 0.06}s` }}
                aria-label={title}
              >
                <div className="sv-icon" aria-hidden="true">
                  <span className="sv-icon__ring" />
                  <Icon name={icon} />
                </div>

                <h3 className="sv-card__title">{title}</h3>
                <p className="sv-card__desc">{desc}</p>

                <div className="sv-tags">
                  {tags.map((t) => <span className="sv-tag" key={t}>{t}</span>)}
                </div>
              </article>
            ))}
          </div>

          <button
            className="sv-nav sv-nav--next"
            onClick={next}
            aria-label="Next service"
            disabled={idx >= SERVICES.length - 1}
          >
            ›
          </button>

          <div className="sv-dots" role="tablist" aria-label="Carousel pagination">
            {SERVICES.map((_, i) => (
              <button
                key={i}
                className={`sv-dot ${i === idx ? "is-active" : ""}`}
                aria-label={`Go to slide ${i + 1}`}
                aria-selected={i === idx}
                role="tab"
                onClick={() => scrollToIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="sv-cta sv-reveal">
          <a
            className="sv-btn sv-btn--gold"
            href="/quote"
            onClick={(e) => { if (onQuoteClick) { e.preventDefault(); onQuoteClick(); } }}
          >
            Get a Free Custom Plan
          </a>
        </div>
      </div>
    </section>
  );
}
