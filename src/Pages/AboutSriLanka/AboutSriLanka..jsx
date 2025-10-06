import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Landmark,
  Building2,
  Mountain,
  Waves,
  Trees,
  Sun,
  MapPin,
  Globe2,
} from "lucide-react";
import "./AboutSriLanka.css";

/* ==== Import Images Correctly ==== */
import sigiriya from "../../assets/Sigiriya.jpg";
import kandy from "../../assets/Kandy .jpg";
import ella from "../../assets/Ella.jpg";
import tea from "../../assets/NuwaraEliya.png";
import mirissa from "../../assets/pkg-yala-mirissa.jpg";
import galle from "../../assets/Galle.jpg";
import yala from "../../assets/Yala.jpg";
import anuradhapura from "../../assets/Anuradhapura.jpg";
import polonnaruwa from "../../assets/Polonnaruwa.jpg";
import dambulla from "../../assets/Dambulla.jpg";
import trincomalee from "../../assets/Trincomalee.jpg";
import colombo from "../../assets/Colombo.jpg";

export default function AboutSriLanka() {
  useEffect(() => {
    const els = document.querySelectorAll(".asla-reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("asla-show");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="asla-page">
      {/* ===== Hero ===== */}
      <section className="asla-hero">
        <div className="asla-overlay"></div>
        <motion.div
          className="asla-hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <h1>About Sri Lanka Attractions</h1>
          <p>
            Sri Lanka, the “Pearl of the Indian Ocean,” is a land of endless
            beauty, where ancient history meets breathtaking nature. This island
            offers mountains, beaches, wildlife, and heritage sites — all within
            a few hours’ journey. Let’s explore the heart and soul of Sri Lanka.
          </p>
        </motion.div>
      </section>

      {/* ===== SIGIRIYA ===== */}
      <motion.section
        className="asla-section asla-reveal"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="asla-text">
          <h2>
            <Landmark className="asla-icon" /> Sigiriya – The Lion Rock
            Fortress
          </h2>
          <p>
            Sigiriya, also known as the “Eighth Wonder of the World,” is an
            ancient fortress built atop a massive 200-meter rock by King
            Kashyapa in the 5th century. Its name means “Lion Rock,” inspired by
            the giant lion gateway that once guarded its entrance.
          </p>
          <p>
            Visitors can admire the world-famous Sigiriya frescoes — graceful
            maidens painted in vibrant colors — and the Mirror Wall that still
            glimmers after centuries. The top offers panoramic views of forests
            and villages stretching into the horizon.
          </p>
        </div>
        <motion.div
          className="asla-image"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img src={sigiriya} alt="Sigiriya Rock Fortress" />
        </motion.div>
      </motion.section>

      {/* ===== KANDY ===== */}
      <motion.section
        className="asla-section asla-alt asla-reveal"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="asla-text">
          <h2>
            <Building2 className="asla-icon" /> Kandy – The Cultural Capital
          </h2>
          <p>
            Set in the lush hills of central Sri Lanka, Kandy is the last royal
            capital of the Sinhalese kingdom. It is home to the sacred Temple of
            the Tooth Relic, one of Buddhism’s holiest shrines.
          </p>
          <p>
            Every July or August, the Esala Perahera festival transforms the
            city into a dazzling celebration of elephants, dancers, and
            drummers, honoring the sacred relic.
          </p>
        </div>
        <motion.div
          className="asla-image"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img src={kandy} alt="Temple of the Tooth Relic, Kandy" />
        </motion.div>
      </motion.section>

      {/* ===== ELLA ===== */}
      <motion.section
        className="asla-section asla-reveal"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="asla-text">
          <h2>
            <Mountain className="asla-icon" /> Ella – The Misty Hill Escape
          </h2>
          <p>
            Ella is a peaceful hill-station surrounded by tea plantations,
            waterfalls, and mountain peaks. The iconic Nine Arches Bridge and
            Ella Rock make it one of Sri Lanka’s most scenic destinations.
          </p>
        </div>
        <motion.div
          className="asla-image"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img src={ella} alt="Ella Nine Arches Bridge" />
        </motion.div>
      </motion.section>

      {/* ===== NUWARA ELIYA ===== */}
      <motion.section
        className="asla-section asla-alt asla-reveal"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="asla-text">
          <h2>
            <Trees className="asla-icon" /> Nuwara Eliya – Little England
          </h2>
          <p>
            Known as “Little England,” Nuwara Eliya blends colonial charm with
            emerald tea gardens. The cool climate, lakes, and gardens make it
            one of the most romantic getaways in the island.
          </p>
        </div>
        <motion.div
          className="asla-image"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img src={tea} alt="Nuwara Eliya Tea Plantation" />
        </motion.div>
      </motion.section>

      {/* ===== MIRISSA ===== */}
      <motion.section
        className="asla-section asla-reveal"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="asla-text">
          <h2>
            <Waves className="asla-icon" /> Mirissa – Tropical Paradise
          </h2>
          <p>
            Mirissa is a postcard-perfect beach on the southern coast. It’s
            famous for surfing, whale watching, and its iconic palm tree hill
            with breathtaking sunsets.
          </p>
        </div>
        <motion.div
          className="asla-image"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img src={mirissa} alt="Mirissa Beach" />
        </motion.div>
      </motion.section>

      {/* ===== GALLE ===== */}
      <motion.section
        className="asla-section asla-alt asla-reveal"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="asla-text">
          <h2>
            <Globe2 className="asla-icon" /> Galle – The Dutch Fort City
          </h2>
          <p>
            Galle is a UNESCO World Heritage Site filled with colonial history
            and coastal beauty. Its cobblestone streets, lighthouses, and ocean
            walls make it a must-see stop in southern Sri Lanka.
          </p>
        </div>
        <motion.div
          className="asla-image"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img src={galle} alt="Galle Fort" />
        </motion.div>
      </motion.section>

      {/* ===== YALA ===== */}
      <motion.section
        className="asla-section asla-reveal"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="asla-text">
          <h2>
            <Sun className="asla-icon" />  Yala National Park – The Wild Heart
          </h2>
          <p>
            Home to elephants, peacocks, and the world’s highest density of
            leopards, Yala is a wildlife lover’s dream. Jeep safaris offer
            unforgettable adventures across its savannahs and lagoons.
          </p>
        </div>
        <motion.div
          className="asla-image"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img src={yala} alt="Yala National Park" />
        </motion.div>
      </motion.section>

      {/* ===== ANURADHAPURA ===== */}
      <motion.section
        className="asla-section asla-alt asla-reveal"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="asla-text">
          <h2>
            <Landmark className="asla-icon" /> Anuradhapura – The Sacred City
            of Kings
          </h2>
          <p>
            This ancient capital, rich in Buddhist heritage, features massive
            stupas, monasteries, and the sacred Bodhi Tree — the world’s oldest
            recorded tree. A place of peace and history.
          </p>
        </div>
        <motion.div
          className="asla-image"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img src={anuradhapura} alt="Anuradhapura" />
        </motion.div>
      </motion.section>

      {/* ===== POLONNARUWA ===== */}
      <motion.section
        className="asla-section asla-reveal"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="asla-text">
          <h2>
            <Building2 className="asla-icon" /> 🏯 Polonnaruwa – The Medieval
            Marvel
          </h2>
          <p>
            Polonnaruwa’s ruins tell stories of a glorious kingdom. The ancient
            palaces and Gal Vihara statues make it one of the island’s most
            beautiful archaeological sites.
          </p>
        </div>
        <motion.div
          className="asla-image"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img src={polonnaruwa} alt="Polonnaruwa Ruins" />
        </motion.div>
      </motion.section>

      {/* ===== DAMBULLA ===== */}
      <motion.section
        className="asla-section asla-alt asla-reveal"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="asla-text">
          <h2>
            <Landmark className="asla-icon" />  Dambulla – The Golden Cave
            Temple
          </h2>
          <p>
            Dambulla’s cave temples are covered in Buddhist murals and filled
            with golden statues. It’s one of Sri Lanka’s best-preserved cultural
            treasures.
          </p>
        </div>
        <motion.div
          className="asla-image"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img src={dambulla} alt="Dambulla Cave Temple" />
        </motion.div>
      </motion.section>

      {/* ===== TRINCOMALEE ===== */}
      <motion.section
        className="asla-section asla-reveal"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="asla-text">
          <h2>
            <Waves className="asla-icon" /> 🌊 Trincomalee – The Eastern Beauty
          </h2>
          <p>
            Trincomalee’s beaches and coral reefs make it a haven for divers.
            Visit the colorful Koneswaram Temple perched above the ocean for an
            unforgettable view.
          </p>
        </div>
        <motion.div
          className="asla-image"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img src={trincomalee} alt="Trincomalee Beach" />
        </motion.div>
      </motion.section>

      {/* ===== COLOMBO ===== */}
      <motion.section
        className="asla-section asla-alt asla-reveal"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="asla-text">
          <h2>
            <MapPin className="asla-icon" /> Colombo – The Modern Metropolis
          </h2>
          <p>
            The capital city blends history, culture, and modern lifestyle.
            Explore temples, street markets, and the oceanfront promenade of
            Galle Face Green for a true taste of city life.
          </p>
        </div>
        <motion.div
          className="asla-image"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img src={colombo} alt="Colombo City" />
        </motion.div>
      </motion.section>

      {/* ===== CTA ===== */}
      <motion.section
        className="asla-cta asla-reveal"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <h2>🌴 Discover the Wonder of Sri Lanka</h2>
        <p>
          From the mountains to the seas, Sri Lanka is a destination that
          captivates the soul. Every journey reveals stories of faith, beauty,
          and resilience — inviting you to connect with nature and culture in
          harmony.
        </p>
        <motion.a
          href="/contact"
          className="asla-btn"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 20px rgba(255,183,3,0.6)",
          }}
        >
          Plan Your Visit →
        </motion.a>
      </motion.section>
    </div>
  );
}
