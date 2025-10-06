import React, { useState, useEffect, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

/* ===== Layout Components ===== */
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Loader from "./Components/Loader/Loader";

/* ===== Home Page Sections ===== */
import Hero from "./Components/Hero/Hero";
import About from "./Components/About/About";
import Services from "./Components/Services/Services";
import TourPackages from "./Components/TourPackages/TourPackages";
import WhyChooseUs from "./Components/WhyChooseUs/WhyChooseUs";
import OurPartners from "./Components/OurPartners/OurPartners";
import FutureInspire from "./Components/FutureInspire/FutureInspire";
import Contact from "./Components/Contact/Contact";
import Testominals from "./Components/Testominals/Testominals";
import MemoriesTeaser from "./Components/Memories/MemoriesTeaser";
import OurIsland from "./Components/OurIsland/OurIsland";
import DestinationsSection from "./Components/DestinationsSection/DestinationsSection";

/* ===== Pages ===== */
import MemoriesExplore from "./Pages/MemoriesExplore/MemoriesExplore";
import AboutSriLanka from "./Pages/AboutSriLanka/AboutSriLanka.";
import QuotePage from "./Pages/QuoteForm/QuoteForm";
import TripDetails from "./Pages/TripDetails/TripDetails";

/* ===== Styles ===== */
import "./App.css";

/* ----------------------------------------------------
   🏝️ HomePage – Landing Page Content
---------------------------------------------------- */
function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <OurIsland />
      <TourPackages />
      <WhyChooseUs />
      <DestinationsSection />
      <MemoriesTeaser />
      <Testominals />
      <FutureInspire />
      <OurPartners />
      <Contact />
    </>
  );
}

/* ----------------------------------------------------
   🌍 App – Root Component
---------------------------------------------------- */
export default function App() {
  const [loading, setLoading] = useState(true);

  // Hide loader after 7 seconds (fallback)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 7000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Loader />}
      <Navbar />

      <Suspense fallback={<div style={{ padding: 24 }}>Loading…</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/memories" element={<MemoriesExplore />} />
          <Route path="/about-sri-lanka" element={<AboutSriLanka />} />
          <Route path="/quote" element={<QuotePage />} />
          <Route path="/trip/:id" element={<TripDetails />} />
          <Route path="*" element={<div style={{ padding: 24 }}>404 — Not found</div>} />
        </Routes>
      </Suspense>

      <Footer />
    </>
  );
}
