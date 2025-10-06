import React, { useEffect, useRef, useState } from "react";
import "./OurPartners.css";

import jetwing from "../../assets/Partners/Jetwing.png";
import resplendent from "../../assets/Partners/logo-resplendent.png";
import cinnamon from "../../assets/Partners/logo-cinnamon.png";
import uga from "../../assets/Partners/logo-cinnamon.png";
import aman from "../../assets/Partners/logo-view360.png";
import sltda from "../../assets/Partners/sltda_logo.png";

/* small scroll reveal */
const useReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll(".op2-reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("show");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.18 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
};

const DEFAULT_PARTNERS = [
  { name: "Jetwing Hotels", logo: jetwing, href: "https://www.jetwinghotels.com/" },
  { name: "Resplendent Ceylon", logo: resplendent, href: "https://www.resplendentceylon.com/" },
  { name: "Cinnamon Hotels", logo: cinnamon, href: "https://www.cinnamonhotels.com/" },
  { name: "Uga Escapes", logo: uga, href: "https://www.ugaescapes.com/" },
  { name: "Aman Resorts", logo: aman, href: "https://www.aman.com/" },
  { name: "SLTDA Licensed", logo: sltda, href: "https://www.sltda.gov.lk/" },
];

export default function OurPartners({
  items = DEFAULT_PARTNERS,
  eyebrow = "Our Partners",
  headline = "Trusted by leading hotels & experiences",
  sub = "We collaborate with licensed operators, boutique hotels, and experience providers across Sri Lanka to deliver reliable, memorable journeys.",
  variant = "carousel", // "carousel" | "cloud"
}) {
  useReveal();
  const vpRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;
    const onScroll = () => {
      setCanPrev(vp.scrollLeft > 4);
      setCanNext(vp.scrollLeft < vp.scrollWidth - vp.clientWidth - 4);
    };
    onScroll();
    vp.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      vp.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const snapBy = (dir = 1) => {
    const vp = vpRef.current;
    if (!vp) return;
    const amount = Math.max(240, Math.round(vp.clientWidth * 0.9));
    vp.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  /* 🚀 AUTO SCROLL EFFECT */
  useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;

    let scrollSpeed = 0.5; // pixels per frame
    let animationFrame;

    const autoScroll = () => {
      if (!vp) return;
      vp.scrollLeft += scrollSpeed;

      // reset to start when reaching end
      if (vp.scrollLeft >= vp.scrollWidth / 2) {
        vp.scrollLeft = 0;
      }

      animationFrame = requestAnimationFrame(autoScroll);
    };

    animationFrame = requestAnimationFrame(autoScroll);

    // pause on hover
    const stopScroll = () => cancelAnimationFrame(animationFrame);
    const resumeScroll = () => (animationFrame = requestAnimationFrame(autoScroll));

    vp.addEventListener("mouseenter", stopScroll);
    vp.addEventListener("mouseleave", resumeScroll);

    return () => {
      vp.removeEventListener("mouseenter", stopScroll);
      vp.removeEventListener("mouseleave", resumeScroll);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section className="op2" id="partners" aria-label="Our partners">
      <div className="op2-container">
        <header className="op2-head op2-reveal">
          <p className="op2-eyebrow">{eyebrow}</p>
          <h2 className="op2-title">{headline}</h2>
          <p className="op2-sub">{sub}</p>
        </header>

        {variant === "cloud" ? (
          <ul className="op2-cloud op2-reveal" role="list">
            {items.map((p) => (
              <li className="op2-cloud-item" key={p.name}>
                <a
                  className="op2-card"
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  title={p.name}
                  aria-label={p.name}
                >
                  <img className="op2-logo" src={p.logo} alt={p.name} loading="lazy" />
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="op2-carousel op2-reveal">
            <div
              className="op2-viewport"
              ref={vpRef}
              role="listbox"
              aria-label="Partner logos"
            >
              <div className="op2-rail">
                {items.concat(items).map((p, i) => (
                  <div className="op2-snap" key={`${p.name}-${i}`}>
                    <a
                      className="op2-card"
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                      title={p.name}
                    >
                      <img className="op2-logo" src={p.logo} alt={p.name} loading="lazy" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
