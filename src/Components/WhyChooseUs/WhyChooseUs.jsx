import React, { useEffect } from "react";
import "./WhyChooseUs.css";

/* -------- tiny scroll reveal with reduced-motion fallback -------- */
const useReveal = () => {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".wcu-reveal"));
    if (!els.length) return;

    const rm = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (rm?.matches) {
      els.forEach((el) => el.classList.add("show"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("show");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
};

/* -------- tiny tilt (no libs, off for touch/reduced-motion) -------- */
const useTiltHandlers = () => {
  const onMouseMove = (e) => {
    const rm = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (rm?.matches || "ontouchstart" in window) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;  // 0..1
    const y = (e.clientY - r.top) / r.height;  // 0..1
    el.style.setProperty("--rx", `${(0.5 - y) * 8}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * 10}deg`);
    el.style.setProperty("--lift", `-6px`);
  };
  const onMouseLeave = (e) => {
    const el = e.currentTarget;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
    el.style.setProperty("--lift", `0px`);
  };
  return { onMouseMove, onMouseLeave, onMouseEnter: onMouseMove };
};

/* -------- inline SVG icons (guaranteed to render) -------- */
const Icon = ({ name }) => {
  const common = {
    width: 26, height: 26, viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor", strokeWidth: 1.8,
    strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true
  };

  switch (name) {
    case "compass":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <polygon points="14.5 9.5 12 12 9.5 14.5 10.8 10.8 14.5 9.5"/>
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6l7-3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "hotel":
      return (
        <svg {...common}>
          <path d="M3 21v-8a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8" />
          <path d="M3 14h18" />
          <rect x="5" y="9" width="6" height="3" rx="1" />
        </svg>
      );
    case "chat":
      return (
        <svg {...common}>
          <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/>
          <path d="M8 10h8M8 14h5"/>
        </svg>
      );
    case "badge":
      return (
        <svg {...common}>
          <path d="M12 2l2.3 2.3L17 5l-.7 2.7L18 10l-2.3 1.3L15 14l-3 1-3-1-.7-2.7L6 10l1.7-2.3L7 5l2.7-.7L12 2z"/>
          <path d="M9 11l1.5 1.5L15 8" />
        </svg>
      );
    case "leaf":
      return (
        <svg {...common}>
          <path d="M3 21s2-7 9-10 9-6 9-6-1 7-8 10-10 6-10 6z" />
          <path d="M3 21C6 13 12 9 21 5" />
        </svg>
      );
    default:
      return null;
  }
};

const FEATURES = [
  { icon: "compass", title: "Tailor-Made Itineraries", text: "No templates — we design around your dates, budget and style." },
  { icon: "shield",  title: "Safety & Licensed Drivers", text: "Vetted drivers, reliable vehicles, and clear daily coordination." },
  { icon: "hotel",   title: "Handpicked Boutique Stays", text: "Character hotels and villas in great locations we personally love." },
  { icon: "chat",    title: "24/7 WhatsApp Support",     text: "Fast responses before and during your trip — always on hand." },
  { icon: "badge",   title: "Transparent Pricing",       text: "Clear breakdowns, fair rates, and no surprise add-ons." },
  { icon: "leaf",    title: "Local & Responsible",       text: "Respect for culture & nature, with community-friendly partners." },
];

export default function WhyChooseUs({ onQuoteClick }) {
  useReveal();
  const tilt = useTiltHandlers();

  return (
    <section className="wcu-section" id="why" aria-label="Why choose Menty Tours">
      {/* background ornaments */}
      <div className="wcu-ornament wcu-ornament--a" aria-hidden />
      <div className="wcu-ornament wcu-ornament--b" aria-hidden />

      <div className="wcu-container">
        {/* Header */}
        <header className="wcu-head wcu-reveal">
          <p className="wcu-eyebrow">Why Choose Us</p>
          <h2 className="wcu-title">Travel that feels personal, safe, and effortless</h2>
          <p className="wcu-sub">
            We mix iconic sights with authentic local moments — at your pace. Here’s what
            travellers say sets us apart.
          </p>
        </header>

        {/* Trust badges */}
        <div className="wcu-trust wcu-reveal" role="list" aria-label="Trust indicators">
          <div className="wcu-trust__item" role="listitem">
            <span className="wcu-dot" aria-hidden />
            12+ years of expertise
          </div>
          <div className="wcu-trust__item" role="listitem">
            <span className="wcu-dot" aria-hidden />
            2300+ happy travellers
          </div>
          <div className="wcu-trust__item" role="listitem">
            <span className="wcu-dot" aria-hidden />
            4.9/5 average rating
          </div>
        </div>

        {/* Features grid */}
        <div className="wcu-grid">
          {FEATURES.map(({ icon, title, text }, i) => (
            <article
              className="wcu-card wcu-reveal"
              key={title}
              style={{ transitionDelay: `${i * 70}ms` }}
              {...tilt}
            >
              <div className="wcu-icon">
                <span className="wcu-icon__ring" aria-hidden />
                <span className="wcu-icon__glow" aria-hidden />
                <Icon name={icon} />
              </div>
              <h3 className="wcu-card__title">{title}</h3>
              <p className="wcu-card__text">{text}</p>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="wcu-cta wcu-reveal">
          <a
            className="wcu-btn wcu-btn--gold"
            href="/quote"
            onClick={(e)=>{ if(onQuoteClick){ e.preventDefault(); onQuoteClick(); }}}
          >
            Get a Free Custom Plan
          </a>
          <a
            className="wcu-btn wcu-btn--ghost"
            href="https://wa.me/9477XXXXXXX"
            target="_blank" rel="noreferrer"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
