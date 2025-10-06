import React, { useEffect, useMemo, useState } from "react";
import "./MemoriesExplore.css";

/* reuse the same 7 images — add more when you have them */
import img1 from "../../assets/Memories/Memories-with torism couple (1).jpeg";
import img2 from "../../assets/Memories/Memories-with torism couple (2).jpeg";
import img3 from "../../assets/Memories/Memories-with torism couple (3).jpeg";
import img4 from "../../assets/Memories/Memories-with torism couple (4).jpeg";
import img5 from "../../assets/Memories/Memories-with torism couple (5).jpeg";
import img6 from "../../assets/Memories/Memories-with torism couple (6).jpeg";
import img7 from "../../assets/Memories/Memories-with torism couple (7).jpeg";

/* tiny reveal */
function useReveal(selector = ".mx-reveal", threshold = 0.12) {
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

/* lightbox */
function Lightbox({ open, items, index, onClose, setIndex }) {
  useEffect(() => {
    if (!open) return;
    const f = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % items.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", f);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", f); document.body.style.overflow = ""; };
  }, [open, items.length, onClose, setIndex]);
  if (!open) return null;
  const cur = items[index];
  return (
    <div className="mx-lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <figure className="mx-lightbox-inner" onClick={(e)=>e.stopPropagation()}>
        <img src={cur.src} alt={cur.alt} />
        <figcaption><strong>{cur.cap}</strong><span>{cur.where}</span></figcaption>
        <button className="mx-x" onClick={onClose} aria-label="Close">×</button>
        <button className="mx-arrow left" aria-label="Previous" onClick={()=>setIndex(i=>(i-1+items.length)%items.length)} />
        <button className="mx-arrow right" aria-label="Next" onClick={()=>setIndex(i=>(i+1)%items.length)} />
      </figure>
    </div>
  );
}

const RAW = [
  { src: img1, alt: "Beach coconuts with guests", tag: "Beach", where: "Bentota", cap: "Beach coconuts & sunshine" },
  { src: img2, alt: "Speedboat smiles", tag: "Boat", where: "Pigeon Island", cap: "Boat day — smiles all round" },
  { src: img3, alt: "Mangrove safari", tag: "Mangroves", where: "Madu River", cap: "Mangrove safari" },
  { src: img4, alt: "River selfie", tag: "Boat", where: "Madu River", cap: "River breeze selfie" },
  { src: img5, alt: "Holding baby croc", tag: "Wildlife", where: "Madu River", cap: "Baby croc encounter" },
  { src: img6, alt: "Croc on shoulder", tag: "Wildlife", where: "Madu River", cap: "Brave moment!" },
  { src: img7, alt: "Fish spa", tag: "Fish Spa", where: "Madu River", cap: "Fish spa giggles" },
  // duplicate some to show a larger masonry; replace with your real photos
  { src: img2, alt: "Boat fun", tag: "Boat", where: "Trinco", cap: "Blue lagoon ride" },
  { src: img3, alt: "Mangrove tunnel", tag: "Mangroves", where: "Madu River", cap: "Into the green" },
  { src: img1, alt: "Beach walk", tag: "Beach", where: "South Coast", cap: "Golden hour walk" },
];

const TAGS = ["All", "Beach", "Boat", "Mangroves", "Wildlife", "Fish Spa"];

export default function MemoriesExplore() {
  useReveal();

  const [q, setQ] = useState("");
  const [tag, setTag] = useState("All");
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const data = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return RAW
      .filter((p) => tag === "All" ? true : p.tag === tag)
      .filter((p) => !needle || `${p.cap} ${p.where} ${p.tag}`.toLowerCase().includes(needle));
  }, [q, tag]);

  return (
    <main className="mx">
      <header className="mx-hero mx-reveal">
        <div className="mx-badge">Explore memories</div>
        <h1>Real moments from the road</h1>
        <p className="mx-sub">Swipe, tap, and zoom through highlights captured by our guests.</p>

        <div className="mx-controls">
          <input className="mx-input" placeholder="Search e.g., beach, boat, mangroves…" value={q} onChange={(e)=>setQ(e.target.value)} />
          <div className="mx-tags" role="tablist" aria-label="Filter memories">
            {TAGS.map((t) => (
              <button key={t} className={`mx-chip ${t===tag?"active":""}`} onClick={()=>setTag(t)} role="tab" aria-selected={t===tag}>{t}</button>
            ))}
          </div>
        </div>
      </header>

      {/* Masonry (CSS columns) */}
      <section className="mx-masonry mx-reveal">
        {data.map((p, i) => (
          <figure
            key={`${p.src}-${i}`}
            className="mx-item"
            onClick={() => { setIdx(RAW.findIndex(x=>x===p)); setOpen(true); }}
          >
            <img src={p.src} alt={p.alt} loading="lazy" />
            <figcaption>
              <strong>{p.cap}</strong><span>{p.where} • {p.tag}</span>
            </figcaption>
          </figure>
        ))}
        {!data.length && <p className="mx-empty">No memories match your search.</p>}
      </section>

      <Lightbox open={open} items={RAW} index={idx} onClose={()=>setOpen(false)} setIndex={setIdx} />

      <a href="#top" className="mx-fab" aria-label="Back to top">↑</a>
    </main>
  );
}
