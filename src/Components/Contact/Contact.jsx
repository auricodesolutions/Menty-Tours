import React, { useState } from "react";
import "./Contact.css";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    setErr("");

    // very light check
    if (!form.name || !form.email || !form.phone || !form.message) {
      setErr("Please fill all required fields.");
      return;
    }

    // Example: open mail client. Replace with your API/Email service later.
    const subj = encodeURIComponent("New inquiry from website");
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:mentytours.sl@gmail.com?subject=${subj}&body=${body}`;
    setSent(true);
  };

  // Contact constants (from the card you shared)
  const PHONE_DISPLAY = "+94 777 174 175";
  const PHONE_WA = "94777174175";
  const EMAIL = "mentytours.sl@gmail.com";
  const ADDRESS = "47/9, Thissa Road, Wadduwa, Sri Lanka.";
  const FB_NAME = "Menty Tours Sri Lanka";

  return (
    <main className="te-contact">
      <section className="te-wrap" id="contact" aria-label="Contact Menty Tours">
        <header className="te-head">
          <h1>Keep in touch</h1>
          <p>
            Our helpline is always open for inquiries or feedback. Send us a message
            and we’ll get back to you as soon as we can.
          </p>
        </header>

        <div className="te-grid">
          {/* Left: contact details */}
          <aside className="te-card te-info">
            <div className="te-brand">
              <div className="te-avatar">MH</div>
              <div>
                <h3>Minindu Hannadige</h3>
                <span className="te-role">Proprietor · Menty Tours</span>
              </div>
            </div>

            <ul className="te-list">
              <li>
                <span className="te-ic" aria-hidden="true">
                  {/* phone icon */}
                  <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.11 5.18 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.72c.12.89.3 1.76.57 2.6a2 2 0 0 1-.45 2.11L9.1 10.9a16 16 0 0 0 4 4l1.47-1.12a2 2 0 0 1 2.11-.45c.84.27 1.71.45 2.6.57A2 2 0 0 1 22 16.92z"/></svg>
                </span>
                <a href={`tel:${PHONE_WA}`}>{PHONE_DISPLAY}</a>
              </li>

              <li>
                <span className="te-ic" aria-hidden="true">
                  {/* whatsapp */}
                  <svg viewBox="0 0 24 24"><path d="M20.52 3.48A11.9 11.9 0 0 0 12.04 0C5.5 0 .2 5.3.2 11.84a11.8 11.8 0 0 0 1.6 6.03L0 24l6.33-1.65a11.86 11.86 0 0 0 5.7 1.47h.01c6.54 0 11.84-5.3 11.84-11.84 0-3.17-1.23-6.14-3.36-8.5zM12.04 21.4h-.01a9.57 9.57 0 0 1-4.88-1.34l-.35-.2-3.76.98 1-3.66-.23-.38a9.6 9.6 0 1 1 8.23 4.6zm5.56-7.15c-.3-.15-1.78-.88-2.05-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.23-.65.08-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.48-1.73-1.66-2.02-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.68-1.62-.93-2.21-.24-.58-.48-.5-.68-.5h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.13 3.26 5.17 4.57.72.31 1.28.49 1.72.63.72.23 1.37.2 1.89.12.58-.08 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.58-.35z"/></svg>
                </span>
                <a
                  href={`https://wa.me/${PHONE_WA}?text=${encodeURIComponent(
                    "Hi Menty Tours! I’d like to know more about your packages."
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp us
                </a>
              </li>

              <li>
                <span className="te-ic" aria-hidden="true">
                  {/* email */}
                  <svg viewBox="0 0 24 24"><path d="M22 6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2l10 7L22 6z"/><path d="M22 6l-10 7L2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z"/></svg>
                </span>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>

              <li>
                <span className="te-ic" aria-hidden="true">
                  {/* location */}
                  <svg viewBox="0 0 24 24"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>
                </span>
                <span>{ADDRESS}</span>
              </li>

              <li>
                <span className="te-ic" aria-hidden="true">
                  {/* facebook */}
                  <svg viewBox="0 0 24 24"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2.6V12h2.6V9.8c0-2.6 1.5-4 3.8-4 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.45 2.9h-2.35v7A10 10 0 0 0 22 12z"/></svg>
                </span>
                <span>{FB_NAME}</span>
                {/* Replace with your real page URL if you want it clickable */}
              </li>
            </ul>

            <div className="te-note">
              Where professionalism meets paradise — travel Sri Lanka with us.
            </div>
          </aside>

          {/* Right: form */}
          <section className="te-card te-form">
            <form onSubmit={onSubmit} noValidate>
              <div className="te-row">
                <label>
                  Your Name*
                  <input
                    name="name"
                    type="text"
                    placeholder="Full name"
                    value={form.name}
                    onChange={onChange}
                    required
                  />
                </label>
                <label>
                  Your Email*
                  <input
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={onChange}
                    required
                  />
                </label>
              </div>

              <div className="te-row">
                <label>
                  Contact number*
                  <input
                    name="phone"
                    type="tel"
                    placeholder="+94 7xx xxx xxx"
                    value={form.phone}
                    onChange={onChange}
                    required
                  />
                </label>
              </div>

              <label className="te-full">
                Your Message*
                <textarea
                  name="message"
                  rows="6"
                  placeholder="Tell us your dates, group size, and what you’d like to see…"
                  value={form.message}
                  onChange={onChange}
                  required
                />
              </label>

              {err && <div className="te-error">{err}</div>}
              {sent && <div className="te-success">Opening your email app…</div>}

              <div className="te-actions">
                <button className="te-btn te-btn-primary te-btn-lg" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </section>
        </div>
      </section>

      {/* Optional floating WhatsApp CTA */}
      <a
        className="te-wa"
        href={`https://wa.me/${PHONE_WA}?text=${encodeURIComponent(
          "Hi Menty Tours! I’d like to know more about your packages."
        )}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24"><path d="M20.52 3.48A11.9 11.9 0 0 0 12.04 0C5.5 0 .2 5.3.2 11.84a11.8 11.8 0 0 0 1.6 6.03L0 24l6.33-1.65a11.86 11.86 0 0 0 5.7 1.47h.01c6.54 0 11.84-5.3 11.84-11.84 0-3.17-1.23-6.14-3.36-8.5zM12.04 21.4h-.01a9.57 9.57 0 0 1-4.88-1.34l-.35-.2-3.76.98 1-3.66-.23-.38a9.6 9.6 0 1 1 8.23 4.6z"/></svg>
      </a>
    </main>
  );
}
