import React, { useEffect, useRef } from "react";
import "./Footer.css";

export default function Footer() {
  const ref = useRef(null);

  // Reveal on scroll (nice little entrance)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && el.classList.add("mf-show"),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Business constants (edit for your site)
  const BRAND = "Menty Tours Sri Lanka";
  const TAGLINE = "Where professionalism meets paradise — travel Sri Lanka with us.";
  const PHONE_DISPLAY = "+94 777 174 175";
  const PHONE_INTL = "94777174175";
  const EMAIL = "mentytours.sl@gmail.com";
  const ADDRESS = "47/9, Thissa Road, Wadduwa, Sri Lanka.";
  const FB_URL = "https://facebook.com/mentytours";          // 🔗 put your real page
  const TRIP_URL = "https://www.tripadvisor.com/";            // 🔗 your TripAdvisor profile

  return (
    <footer className="mf-footer" ref={ref} aria-labelledby="footer-title">
      {/* Decorative wave top */}
      <div className="mf-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 84" preserveAspectRatio="none">
          <defs>
            <linearGradient id="wf" x1="0" x2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.20" />
              <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.20" />
            </linearGradient>
          </defs>
          <path d="M0,40 C240,120 420,0 720,40 C1020,80 1200,10 1440,40 L1440,84 L0,84 Z" fill="url(#wf)"/>
        </svg>
      </div>

      {/* CTA strip
      <div className="mf-cta">
        <div className="mf-cta__text">
          Ready to plan a personal, safe, unforgettable trip?
        </div>
        <div className="mf-cta__actions">
          <a
            className="mf-btn mf-btn-primary"
            href={`mailto:${EMAIL}?subject=${encodeURIComponent("Request a Quote")}`}
          >
            Request a Quote
          </a>
          <a
            className="mf-btn mf-btn-ghost"
            href={`https://wa.me/${PHONE_INTL}?text=${encodeURIComponent(
              "Hi! I’d like to plan a Sri Lanka trip."
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp 24/7
          </a>
        </div>
      </div> */}

      {/* Main content */}
      <div className="mf-wrap">
        <section className="mf-col">
          <h2 id="footer-title" className="mf-brand">{BRAND}</h2>
          <p className="mf-tag">{TAGLINE}</p>

          <ul className="mf-contact">
            <li>
              <span className="mf-ic" aria-hidden="true">{/* phone */ }
                <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.11 5.18 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.72c.12.89.3 1.76.57 2.6a2 2 0 0 1-.45 2.11L9.1 10.9a16 16 0 0 0 4 4l1.47-1.12a2 2 0 0 1 2.11-.45c.84.27 1.71.45 2.6.57A2 2 0 0 1 22 16.92z"/></svg>
              </span>
              <a href={`tel:${PHONE_INTL}`}>{PHONE_DISPLAY}</a>
            </li>
            <li>
              <span className="mf-ic" aria-hidden="true">{/* email */ }
                <svg viewBox="0 0 24 24"><path d="M22 6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2l10 7L22 6z"/><path d="M22 6l-10 7L2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z"/></svg>
              </span>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </li>
            <li>
              <span className="mf-ic" aria-hidden="true">{/* map pin */ }
                <svg viewBox="0 0 24 24"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>
              </span>
              <span>{ADDRESS}</span>
            </li>
          </ul>

          <div className="mf-social">
            <a className="mf-sc mf-sc--fb" href={FB_URL} target="_blank" rel="noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 24 24"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2.6V12h2.6V9.8c0-2.6 1.5-4 3.8-4 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.45 2.9h-2.35v7A10 10 0 0 0 22 12z"/></svg>
            </a>
            <a className="mf-sc mf-sc--mail" href={`mailto:${EMAIL}`} aria-label="Email">
              <svg viewBox="0 0 24 24"><path d="M22 6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2l10 7L22 6z"/><path d="M22 6l-10 7L2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z"/></svg>
            </a>
            <a className="mf-sc mf-sc--wa" href={`https://wa.me/${PHONE_INTL}`} target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24"><path d="M20.52 3.48A11.9 11.9 0 0 0 12.04 0C5.5 0 .2 5.3.2 11.84a11.8 11.8 0 0 0 1.6 6.03L0 24l6.33-1.65a11.86 11.86 0 0 0 5.7 1.47h.01c6.54 0 11.84-5.3 11.84-11.84 0-3.17-1.23-6.14-3.36-8.5zM12.04 21.4h-.01a9.57 9.57 0 0 1-4.88-1.34l-.35-.2-3.76.98 1-3.66-.23-.38a9.6 9.6 0 1 1 8.23 4.6z"/></svg>
            </a>
            {/* TripAdvisor */}
            <a className="mf-sc mf-sc--trip" href={TRIP_URL} target="_blank" rel="noreferrer" aria-label="TripAdvisor">
              <svg viewBox="0 0 24 24">
                <path d="M12 6c3.8 0 7 .9 9 2.4-1 .9-2 2.1-2.8 3.4-1.4-1.2-3.9-2-6.2-2s-4.8.8-6.2 2C5 10.5 4 9.3 3 8.4 5 6.9 8.2 6 12 6zm-5 5.6a3.4 3.4 0 1 0 0 6.7 3.4 3.4 0 0 0 0-6.7zm10 0a3.4 3.4 0 1 0 0 6.7 3.4 3.4 0 0 0 0-6.7zM7 14.5a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2zm10 0a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2z"/>
              </svg>
              <span className="mf-badge">TripAdvisor</span>
            </a>
          </div>
        </section>

        <nav className="mf-col mf-links" aria-label="Footer">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/tours">See Tours</a></li>
            <li><a href="/packages">Packages</a></li>
            <li><a href="/about">About Sri Lanka</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>

        <section className="mf-col mf-hours">
          <h3>Support</h3>
          <ul>
            <li>Licensed guides & insured vehicles</li>
            <li>24/7 WhatsApp assistance</li>
            <li>Custom itineraries & family-friendly planning</li>
            <li>Secure advance payments</li>
          </ul>

          {/* cute visitor counter placeholder if you want later */}
          <div className="mf-counter" aria-label="Visitor highlights">
            <div className="mf-pill">
              <span className="mf-dot" /> 12+ Years of Expertise
            </div>
            <div className="mf-pill">
              <span className="mf-dot mf-dot--gold" /> 2300+ Happy Travellers
            </div>
          </div>
        </section>
      </div>

      <div className="mf-bottom">
        <span>© {new Date().getFullYear()} {BRAND}. All rights reserved.</span>
        <span className="mf-made">Made with care for unforgettable journeys.</span>
      </div>
    </footer>
  );
}
