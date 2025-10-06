import React, { useEffect, useRef } from "react";
import "./About.css";

/* ONE image only */
import heroImg from "../../assets/about-us.png";

export default function AboutHero() {
  const rootRef = useRef(null);
  const stageRef = useRef(null);

  // Scroll var + reveal (robust even without IO)
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const onScroll = () => {
      const r = root.getBoundingClientRect();
      const v = Math.min(1, Math.max(0, 1 - r.top / Math.max(1, window.innerHeight)));
      root.style.setProperty("--scroll", v.toFixed(3));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Reveal
    const io = "IntersectionObserver" in window
      ? new IntersectionObserver((entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("ah-show");
              io.unobserve(e.target);
            }
          });
        }, { threshold: 0.16 })
      : null;

    const items = root.querySelectorAll(".ah-reveal");
    items.forEach(el => io ? io.observe(el) : el.classList.add("ah-show"));

    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  // Subtle tilt with safe bounds
  const onMove = (e) => {
    const box = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - box.left) / box.width - 0.5) * 8; // -4..4
    const y = ((e.clientY - box.top) / box.height - 0.5) * 8;
    stageRef.current?.style.setProperty("--tiltX", y.toFixed(2));
    stageRef.current?.style.setProperty("--tiltY", x.toFixed(2));
  };
  const onLeave = () => {
    stageRef.current?.style.removeProperty("--tiltX");
    stageRef.current?.style.removeProperty("--tiltY");
  };

  return (
    <section ref={rootRef} className="aboutx" id="about" aria-label="About Menty Tours">
      <div className="aboutx__container">
        {/* LEFT: copy */}
        <div className="aboutx__left ah-reveal">
          <p className="aboutx__eyebrow">About Menty Tours</p>

          <h1 className="aboutx__title">
            Personal, safe, unforgettable.
          </h1>

          <p className="aboutx__sub">
            We design trips that balance iconic sights with real local moments — always at your pace and comfort.
          </p>

          <ul className="aboutx__points">
            <li>Licensed expert guides</li>
            <li>Private A/C transfers</li>
            <li>24/7 WhatsApp support</li>
          </ul>

          <div className="aboutx__cta">
            <a className="aboutx__btn aboutx__btn--gold" href="/quote">Request a Quote</a>
          </div>

          <div className="aboutx__stats">
            <div className="stat">
              <strong>12k+</strong>
              <span>Happy Travelers</span>
            </div>
            <div className="stat">
              <strong>4.9/5</strong>
              <span>Average Rating</span>
            </div>
            <div className="stat">
              <strong>10+</strong>
              <span>Years Experience</span>
            </div>
          </div>
        </div>

        {/* RIGHT: single image with decorative CSS only */}
        <div
          className="aboutx__right ah-reveal"
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          aria-hidden="true"
        >
          <div className="aboutx__stage" ref={stageRef}>
            <figure className="aboutx__figure">
              <img className="aboutx__img" src={heroImg} alt="" />
            </figure>

            {/* floating glass rating (CSS only decoration) */}
            <div className="aboutx__badge">
              <span className="stars" aria-hidden="true">★★★★★</span>
              <b>Traveler-Loved</b>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
