import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Testominals.css";

/* ===== tiny reveal ===== */
function useReveal(selector = ".tm-reveal", threshold = 0.16) {
  useEffect(() => {
    const els = document.querySelectorAll(selector);
    if (!els.length) return;
    const showAll = () => els.forEach((el) => el.classList.add("show"));
    if (!("IntersectionObserver" in window)) return showAll();
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("show"); io.unobserve(e.target); }
      }),
      { threshold }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [selector, threshold]);
}

/* ===== stars (display) ===== */
function Stars({ value = 5, outOf = 5 }) {
  const v = Math.max(0, Math.min(outOf, value));
  const full = Math.floor(v);
  const half = v - full >= 0.5;
  const empty = outOf - full - (half ? 1 : 0);
  return (
    <div className="tm-stars" aria-label={`${v} out of ${outOf} stars`}>
      {"★".repeat(full)}
      {half ? "☆" : ""}
      {"☆".repeat(Math.max(0, empty))}
    </div>
  );
}

/* ===== Featured slider ===== */
function FeaturedSlider({ items = [], interval = 5200 }) {
  const [i, setI] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    if (items.length <= 1) return;
    const rm = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (rm?.matches) return;
    const t = setInterval(() => !paused.current && setI((v) => (v + 1) % items.length), interval);
    return () => clearInterval(t);
  }, [items.length, interval]);

  if (!items.length) return null;
  const cur = items[i];

  return (
    <section
      className="tm-featured tm-reveal"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <div className="tm-featured-card">
        <div className="tm-featured-top">
          <img className="tm-avatar" src={cur.avatar} alt={`${cur.name} avatar`} />
          <div className="tm-nameRow">
            <strong>{cur.name}</strong>
            <span className="tm-meta">{cur.country} • {cur.trip}</span>
          </div>
          <Stars value={cur.rating} />
        </div>
        <blockquote className="tm-quote">
          <span className="tm-quote-mark">“</span>
          {cur.text}
          <span className="tm-quote-mark end">”</span>
        </blockquote>
        <div className="tm-foot">
          <span className="tm-date">{cur.date}</span>
          <button className="tm-next" onClick={() => setI((v) => (v + 1) % items.length)}>Next</button>
        </div>
      </div>

      <div className="tm-dots" role="tablist" aria-label="Featured testimonials">
        {items.map((_, idx) => (
          <button
            key={idx}
            className={`tm-dot ${idx === i ? "active" : ""}`}
            onClick={() => setI(idx)}
            role="tab"
            aria-selected={idx === i}
          />
        ))}
      </div>
    </section>
  );
}

/* ===== helpers ===== */
function clampText(s = "", max = 220) {
  if (s.length <= max) return [s, false];
  const cut = s.slice(0, max).lastIndexOf(" ");
  return [s.slice(0, cut > 0 ? cut : max) + "…", true];
}

/* ===== Card ===== */
function ReviewCard({ t }) {
  const [expanded, setExpanded] = useState(false);
  const [short, clipped] = clampText(t.text, 220);

  return (
    <article className="tm-card" itemScope itemType="https://schema.org/Review">
      <div className="tm-card-top">
        <img className="tm-avatar" src={t.avatar} alt={`${t.name} avatar`} />
        <div className="tm-nameRow">
          <strong itemProp="author">{t.name}</strong>
          <span className="tm-meta">{t.country} • {t.trip}</span>
        </div>
        <Stars value={t.rating} />
      </div>

      <blockquote className={`tm-card-quote ${expanded ? "expanded" : ""}`} itemProp="reviewBody">
        {expanded ? t.text : short}
      </blockquote>

      <div className="tm-card-foot">
        <time className="tm-date" itemProp="datePublished" dateTime={t.date}>{t.date}</time>
        {clipped && (
          <button className="tm-link" onClick={() => setExpanded((v) => !v)}>
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>
    </article>
  );
}

/* ===== slides per view ===== */
function useSlidesPerView() {
  const [slides, setSlides] = useState(1);
  useEffect(() => {
    const m1 = window.matchMedia("(min-width: 980px)");
    const m2 = window.matchMedia("(min-width: 660px)");
    const update = () => setSlides(m1.matches ? 3 : m2.matches ? 2 : 1);
    update();
    m1.addEventListener("change", update);
    m2.addEventListener("change", update);
    return () => {
      m1.removeEventListener("change", update);
      m2.removeEventListener("change", update);
    };
  }, []);
  return slides;
}

/* ===== Carousel ===== */
function CarouselTestimonials({ items = [], autoplay = true, interval = 5500 }) {
  const slides = useSlidesPerView();
  const trackRef = useRef(null);
  const paused = useRef(false);
  const [page, setPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(items.length / slides));

  const measure = () => {
    const el = trackRef.current;
    if (!el) return { w: 0, g: 0 };
    const slide = el.querySelector(".tm-slide");
    if (!slide) return { w: 0, g: 0 };
    const w = slide.getBoundingClientRect().width;
    const cs = getComputedStyle(el);
    const g = parseFloat(cs.columnGap || cs.gap || "0");
    return { w, g };
  };
  const scrollToPage = (p) => {
    const el = trackRef.current; if (!el) return;
    const { w, g } = measure();
    const x = p * (w + g) * slides;
    el.scrollTo({ left: x, behavior: "smooth" });
  };
  const go = (dir) => {
    const np = (page + dir + pageCount) % pageCount;
    setPage(np); scrollToPage(np);
  };

  useEffect(() => {
    if (!autoplay || pageCount <= 1) return;
    const rm = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (rm?.matches) return;
    const t = setInterval(() => { if (!paused.current) go(1); }, interval);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay, pageCount, interval, slides, page]);

  useEffect(() => {
    const el = trackRef.current; if (!el) return;
    const onScroll = () => {
      const { w, g } = measure();
      if (!w) return;
      const p = Math.round(el.scrollLeft / ((w + g) * slides));
      setPage(Math.max(0, Math.min(pageCount - 1, p)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [slides, pageCount]);

  if (!items.length) return null;

  return (
    <section
      className="tm-carousel tm-reveal"
      role="region"
      aria-label="Traveler reviews"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onPointerDown={() => (paused.current = true)}
    >
      <div className="tm-cnav">
        <button className="tm-cbtn prev" aria-label="Previous" onClick={() => go(-1)} disabled={pageCount <= 1} />
        <button className="tm-cbtn next" aria-label="Next" onClick={() => go(1)} disabled={pageCount <= 1} />
      </div>

      <div className="tm-track" ref={trackRef}>
        {items.map((t, idx) => (
          <div className="tm-slide" key={idx}>
            <ReviewCard t={t} />
          </div>
        ))}
      </div>

      {pageCount > 1 && (
        <div className="tm-cdots" role="tablist" aria-label="Review pages">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              className={`tm-cdot ${i === page ? "active" : ""}`}
              onClick={() => { setPage(i); scrollToPage(i); }}
              role="tab"
              aria-selected={i === page}
            />
          ))}
        </div>
      )}
    </section>
  );
}

/* ===== Brand badges (reviews band) ===== */
function BrandIcon({ type }) {
  const common = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  switch (type) {
    case "google":
      return (<svg {...common}><circle cx="12" cy="12" r="9"/><path d="M12 7v5h5"/></svg>);
    case "tripadvisor":
      return (<svg {...common}><path d="M3 12c2-3 6-3 9-3s7 0 9 3"/><circle cx="9" cy="13" r="2.2"/><circle cx="15" cy="13" r="2.2"/><path d="M12 12l-2-2m2 2l2-2"/></svg>);
    default:
      return (<svg {...common}><path d="M14 8h2.5V5H14a4 4 0 0 0-4 4v3H7v3h3v5h3v-5h2.2l.6-3H13V9a1 1 0 0 1 1-1Z"/></svg>);
  }
}
function ReviewsBand({
  avg = 4.9,
  count = 120,
  sources = [
    { key: "google", name: "Google", rating: 4.9, count: 112, href: "#" },
    { key: "tripadvisor", name: "Tripadvisor", rating: 5.0, badge: "Travellers’ Choice", href: "#" },
    { key: "facebook", name: "Facebook", rating: 4.8, count: 67, href: "#" },
  ],
}) {
  
}

/* ===== Write Review (form) ===== */
function StarInput({ value, onChange }) {
  return (
    <div className="tm-rate" role="radiogroup" aria-label="Rating">
      {[5,4,3,2,1].map((n) => (
        <label key={n} aria-label={`${n} star${n>1?"s":""}`}>
          <input
            type="radio"
            name="rating"
            value={n}
            checked={value === n}
            onChange={() => onChange(n)}
          />
          <span>★</span>
        </label>
      ))}
    </div>
  );
}

function WriteReviewForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [trip, setTrip] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [agree, setAgree] = useState(true);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  // honeypot
  const [website, setWebsite] = useState("");

  const max = 1000;
  const left = Math.max(0, max - text.length);
  const valid = rating > 0 && name.trim() && country.trim() && text.trim().length >= 20 && agree && !website;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!valid) { setError("Please fill all required fields (min 20 characters review)."); return; }
    setLoading(true);
    try {
      const review = {
        name: name.trim(),
        country: country.trim(),
        trip: trip.trim() || "Custom Trip",
        rating,
        text: text.trim(),
        date: new Date().toISOString().slice(0,10),
        avatar: `https://i.pravatar.cc/80?u=${encodeURIComponent(name)}-${Date.now()}`
      };
      // If you have an API, post here:
      // await fetch("/api/reviews", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(review) });
      onSubmit?.(review); // update UI instantly
      setDone(true);
      setName(""); setCountry(""); setTrip(""); setText(""); setRating(0);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="tm-form" onSubmit={handleSubmit} noValidate>
      <div className="tm-row">
        <label className="tm-field">
          <span>Name *</span>
          <input className="tm-inp" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Your name" required />
        </label>
        <label className="tm-field">
          <span>Country *</span>
          <input className="tm-inp" value={country} onChange={(e)=>setCountry(e.target.value)} placeholder="e.g., United Kingdom" required />
        </label>
      </div>

      <label className="tm-field">
        <span>Trip (optional)</span>
        <input className="tm-inp" value={trip} onChange={(e)=>setTrip(e.target.value)} placeholder="e.g., 7D Beaches & Wildlife" />
      </label>

      <label className="tm-field">
        <span>Your review *</span>
        <textarea
          className="tm-textarea"
          value={text}
          onChange={(e)=>setText(e.target.value.slice(0, max))}
          placeholder="Tell future travelers about your experience…"
          rows={5}
          required
        />
        <span className="tm-count" aria-live="polite">{left} characters left</span>
      </label>

      <div className="tm-field">
        <span>Rating *</span>
        <StarInput value={rating} onChange={setRating} />
      </div>

      {/* Honeypot (spam bots) */}
      <label className="tm-hidden">
        Website
        <input value={website} onChange={(e)=>setWebsite(e.target.value)} />
      </label>

      <label className="tm-check">
        <input type="checkbox" checked={agree} onChange={(e)=>setAgree(e.target.checked)} />
        <span>I agree to have my review published on this site.</span>
      </label>

      {error && <p className="tm-error" role="alert">{error}</p>}
      {done && <p className="tm-success" role="status">Thanks! Your review has been submitted.</p>}

      <div className="tm-actions">
        <button className="tm-btn" disabled={!valid || loading}>
          {loading ? "Submitting…" : "Submit review"}
        </button>
      </div>
    </form>
  );
}

function WriteReview({ onSubmit }) {
  const [open, setOpen] = useState(false);
  return (
    <section id="write-review" className="tm-write tm-reveal">
      <h2 className="tm-write-title">Write a review</h2>
      <p className="tm-write-sub">Share your trip highlights—help other travelers choose confidently.</p>
      <button className="tm-btn tm-btn--ghost" onClick={()=>setOpen(v=>!v)} aria-expanded={open}>
        {open ? "Hide form" : "Start writing"}
      </button>
      {open && <WriteReviewForm onSubmit={onSubmit} />}
    </section>
  );
}

/* ===== PAGE ===== */
export default function TestimonialsPage({ testimonials = DEFAULT_TESTIMONIALS }) {
  useReveal();

  const [data, setData] = useState(testimonials);

  const { avg, count } = useMemo(() => {
    if (!data.length) return { avg: 0, count: 0 };
    const sum = data.reduce((a, b) => a + (b.rating || 0), 0);
    return { avg: Math.round((sum / data.length) * 10) / 10, count: data.length };
  }, [data]);

  const [q, setQ] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("recent");

  const filtered = useMemo(() => {
    let rows = data
      .filter((t) => t.rating >= minRating)
      .filter((t) => {
        const needle = q.trim().toLowerCase();
        if (!needle) return true;
        const hay = `${t.name} ${t.country} ${t.trip} ${t.text}`.toLowerCase();
        return hay.includes(needle);
      });
    if (sortBy === "top") rows = [...rows].sort((a, b) => b.rating - a.rating);
    else rows = [...rows].sort((a, b) => new Date(b.date) - new Date(a.date));
    return rows;
  }, [data, q, minRating, sortBy]);

  const jsonLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Menty Tours Sri Lanka",
    aggregateRating: { "@type": "AggregateRating", ratingValue: avg || 0, reviewCount: count || 0 },
    review: data.slice(0, 10).map((t) => ({
      "@type": "Review", author: t.name, reviewBody: t.text,
      reviewRating: { "@type": "Rating", ratingValue: t.rating }, datePublished: t.date
    })),
  }), [avg, count, data]);

  const handleAdd = (review) => {
    // Put newest first
    setData((prev) => [review, ...prev]);
    // Optional: smooth scroll to carousel
    setTimeout(() => document.querySelector(".tm-carousel")?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  return (
    <main className="tm">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="tm-hero tm-reveal">
        <div className="tm-hero-badge">Trusted by travelers worldwide</div>
        <h1>What our guests say</h1>
        <p className="tm-sub">
          Rated <strong>{avg}/5</strong> from <strong>{count}</strong> verified reviews.
        </p>
        <div className="tm-hero-stats">
          <div className="tm-chip">Friendly guides</div>
          <div className="tm-chip">Clean vehicles</div>
          <div className="tm-chip">On-time pickups</div>
          <div className="tm-chip">Safe & comfy</div>
        </div>
      </header>

      <FeaturedSlider items={data.slice(0, 5)} />

      <section className="tm-controls tm-reveal">
        <input
          className="tm-input"
          type="search"
          placeholder="Search by name, country, or trip…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <div className="tm-selects">
          <label className="tm-field">
            <span>Min rating</span>
            <select value={minRating} onChange={(e) => setMinRating(Number(e.target.value))}>
              <option value={0}>All</option>
              <option value={5}>5 ★</option>
              <option value={4.5}>4.5 ★</option>
              <option value={4}>4 ★</option>
              <option value={3.5}>3.5 ★</option>
            </select>
          </label>
          <label className="tm-field">
            <span>Sort</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="recent">Most recent</option>
              <option value="top">Top rated</option>
            </select>
          </label>
        </div>
      </section>

      <CarouselTestimonials items={filtered} autoplay />

      <ReviewsBand avg={avg} count={count} />
      <WriteReview onSubmit={handleAdd} />
    </main>
  );
}

/* ===== Demo data ===== */
const DEFAULT_TESTIMONIALS = [
  { name: "Emma W.", country: "United Kingdom", trip: "10D / 9N Classic Sri Lanka", rating: 5,
    text: "From the first WhatsApp message to our airport drop-off, everything was seamless. Our guide Kasun felt like family—patient, funny, and so knowledgeable. We loved Sigiriya sunrise, Ella train, and a surprise coconut! Highly recommend.",
    date: "2025-08-14", avatar: "https://i.pravatar.cc/80?img=11" },
  { name: "Luca B.", country: "Italy", trip: "7D Beaches & Wildlife", rating: 4.8,
    text: "Clean car, smooth driving, and flexible planning. We added Yala at the last minute and they handled it perfectly. The hotel picks were spot on for our budget.",
    date: "2025-07-02", avatar: "https://i.pravatar.cc/80?img=12" },
  { name: "Sofia M.", country: "Spain", trip: "Custom Honeymoon", rating: 5,
    text: "The candle-lit dinner in Galle Fort was magical. I’m picky about details and they nailed every request—flowers, room views, even halal options for my husband’s friend!",
    date: "2025-06-20", avatar: "https://i.pravatar.cc/80?img=13" },
  { name: "Noah T.", country: "Germany", trip: "Family Adventure", rating: 4.9,
    text: "Traveling with two kids can be stressy—but the team made it easy. Child seats ready, snack stops, and shorter daily drives. Pinnawala + turtle hatchery were our kids’ favorites.",
    date: "2025-05-03", avatar: "https://i.pravatar.cc/80?img=14" },
  { name: "Ava K.", country: "USA", trip: "Tea Hills & Trains", rating: 4.7,
    text: "We loved the scenic train and tea tasting. Communication was fast and clear. Would book again.",
    date: "2025-04-18", avatar: "https://i.pravatar.cc/80?img=15" },
  { name: "Hiro S.", country: "Japan", trip: "Culture & History", rating: 5,
    text: "Professional and punctual. The sites at Anuradhapura were incredible. Our guide’s stories brought history to life.",
    date: "2025-04-01", avatar: "https://i.pravatar.cc/80?img=16" },
  { name: "Zara D.", country: "UAE", trip: "Short Getaway", rating: 4.6,
    text: "Perfect 4-day break. Loved the seafood in Bentota and sunset cruise. Great value.",
    date: "2025-03-11", avatar: "https://i.pravatar.cc/80?img=17" },
  { name: "Pierre L.", country: "France", trip: "Eco & Nature", rating: 4.9,
    text: "Responsible travel with real care for wildlife. The cinnamon farm visit was a unique touch.",
    date: "2025-02-22", avatar: "https://i.pravatar.cc/80?img=18" },
];
