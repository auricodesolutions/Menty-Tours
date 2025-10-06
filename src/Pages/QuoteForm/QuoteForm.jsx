import React, { useEffect, useState } from "react";
import "./QuoteForm.css";
import sriLankaImg from "../../assets/image2.jpg"; // scenic image

export default function QuotePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    checkin: "",
    checkout: "",
    adults: 1,
    children: 0,
    package: "",
    requests: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your request! 🌺 Our team will contact you soon.");
  };

  useEffect(() => {
    document.querySelector(".quote-right").classList.add("show");
    document.querySelector(".resort-text").classList.add("show");
  }, []);

  return (
    <section className="quote-section">
      {/* ---------- LEFT: Tour Highlights ---------- */}
      <div className="quote-left">
        <img src={sriLankaImg} alt="Sri Lanka" className="resort-image" />
        <div className="resort-text">
          <h2>Discover the Beauty of Sri Lanka</h2>
          <p>
            From the golden beaches of Bentota to the misty hills of Ella —
            every journey in Sri Lanka tells a story. Let us craft your perfect
            holiday with comfort, culture, and care.
          </p>

          <ul className="highlight-list">
            <li>🏝️ Beach Escapes & Island Adventures</li>
            <li>🌿 Cultural & Wildlife Excursions</li>
            <li>🍛 Authentic Sri Lankan Cuisine</li>
          </ul>
        </div>
      </div>

      {/* ---------- RIGHT: Quote Form ---------- */}
      <div className="quote-right">
        <h1 className="form-title">Request Your Custom Quote</h1>
        <p className="form-subtext">
          Tell us your dream vacation — our experts will tailor a personalized
          Sri Lankan travel experience for you.
        </p>

        <form onSubmit={handleSubmit} className="quote-form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Country of Residence</label>
            <input
              type="text"
              name="country"
              placeholder="Your country"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Preferred Package</label>
            <select name="package" defaultValue="" onChange={handleChange} required>
              <option value="" disabled>
                Select your package
              </option>
              <option value="cultural">Cultural Heritage Tour</option>
              <option value="adventure">Adventure & Nature Tour</option>
              <option value="beach">Beach Relaxation Package</option>
              <option value="luxury">Luxury Experience</option>
              <option value="honeymoon">Honeymoon Special</option>
              <option value="custom">Custom Package</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label>Check-in</label>
              <input type="date" name="checkin" onChange={handleChange} />
            </div>
            <div className="form-group half">
              <label>Check-out</label>
              <input type="date" name="checkout" onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label>Adults</label>
              <input
                type="number"
                name="adults"
                min="1"
                defaultValue="2"
                onChange={handleChange}
              />
            </div>
            <div className="form-group half">
              <label>Children</label>
              <input
                type="number"
                name="children"
                min="0"
                defaultValue="0"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Special Requests</label>
            <textarea
              name="requests"
              rows="3"
              placeholder="Tell us if you have any special preferences"
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            Get My Quote
          </button>
        </form>
      </div>
    </section>
  );
}
