// src/Pages/TripDetails/TripDetails.jsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./TripDetails.css";
import { Landmark, Plane, Car, Sun } from "lucide-react";
import { TOUR_PACKAGES } from "../../data/tourPackagesData";

export default function TripDetails() {
  const { id } = useParams();
  const trip = TOUR_PACKAGES.find((t) => t.id === id);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("show")),
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  if (!trip) return <div style={{ padding: 32 }}>❌ Tour not found</div>;

  return (
    <section className="trip-modern">
      {/* Hero */}
      <div className="trip-hero">
        <img src={trip.hero} alt={trip.title} />
        <div className="trip-hero-overlay">
          <h1>{trip.title}</h1>
          <p>{trip.duration} | {trip.places.join(" · ")}</p>
        </div>
      </div>

      {/* Overview */}
      <div className="trip-intro reveal">
        <h2>Discover Sri Lanka’s Beauty</h2>
        <p>
          Explore the best of Sri Lanka through this {trip.duration} journey, featuring
          {` ${trip.places.join(", ")}`}. Experience nature, history, and culture in one unforgettable trip.
        </p>
        <ul className="trip-tags">
          <li><Landmark size={18} /> Heritage</li>
          <li><Plane size={18} /> Local Experiences</li>
          <li><Car size={18} /> Private Transport</li>
          <li><Sun size={18} /> Scenic Views</li>
        </ul>
      </div>

      {/* Itinerary */}
      <div className="trip-itinerary reveal">
        <h2>Itinerary Highlights</h2>
        <div className="itinerary-list">
          {trip.itinerary.map((d, i) => (
            <div className="day-card" key={i}>
              <img src={d.img} alt={d.title} />
              <div className="day-content">
                <h3>{d.title}</h3>
                <p>{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="trip-cta reveal">
        <h2>Start Your Journey Today</h2>
        <p>Let’s plan your dream trip to Sri Lanka — tailored just for you.</p>
        <button
          className="btn-primary"
          onClick={() => (window.location.href = "/quote")}
        >
          Request a Quote
        </button>
      </div>
    </section>
  );
}
