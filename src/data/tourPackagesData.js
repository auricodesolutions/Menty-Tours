// src/data/tourPackagesData.js
import imgCultural from "../assets/pkg-cultural.jpg";
import imgTrain from "../assets/pkg-train-ella.jpg";
import imgWildSea from "../assets/pkg-yala-mirissa.jpg";
import imgSouth from "../assets/pkg-galle-bentota.jpg";
import imgNorth from "../assets/pkg-jaffna-trinco.jpg";
import imgHoneymoon from "../assets/pkg-honeymoon.jpg";

// dummy gallery / itinerary images
import sigiriya from "../assets/Sigiriya.jpg";
import dambulla from "../assets/Dambulla.jpg";
import kandy from "../assets/Kandy .jpg";
import temple from "../assets/garden.jpg";
import culturalShow from "../assets/cultural-show.jpg";

export const TOUR_PACKAGES = [
  {
    id: "cultural",
    title: "Cultural Triangle Classic",
    duration: "6D / 5N",
    rating: 4.9,
    img: imgCultural,
    places: ["Sigiriya", "Dambulla", "Kandy"],
    tags: ["UNESCO", "Heritage", "Local guide"],
    priceFrom: 449,
    person: 2,
    category: "Culture",
    best: true,
    hero: imgCultural,
    itinerary: [
      { title: "Day 1 – Arrival & Sigiriya", img: sigiriya, desc: "Explore the iconic Lion Rock Fortress and ancient frescoes." },
      { title: "Day 2 – Dambulla Cave Temples", img: dambulla, desc: "Visit the UNESCO-listed cave temples filled with Buddha statues." },
      { title: "Day 3–4 – Kandy Cultural Capital", img: kandy, desc: "Visit the Temple of the Tooth and enjoy a traditional cultural show." },
      { title: "Day 5 – Spice Gardens & Tea Trail", img: temple, desc: "Tour a spice garden and visit lush tea estates in the hills." },
      { title: "Day 6 – Departure", img: culturalShow, desc: "Relax and prepare for departure or an optional beach extension." },
    ],
  },
  {
    id: "train-ella",
    title: "Hill Country & Scenic Train",
    duration: "7D / 6N",
    rating: 4.9,
    img: imgTrain,
    places: ["Nuwara Eliya", "Ella", "Nine Arches"],
    tags: ["Scenic train", "Tea estates", "Photo stops"],
    priceFrom: 529,
    person: 2,
    category: "Nature",
    best: false,
    hero: imgTrain,
    itinerary: [
      { title: "Day 1 – Arrival & Colombo", img: imgTrain, desc: "Begin your journey with a scenic ride through lush hills." },
      { title: "Day 2–3 – Nuwara Eliya", img: temple, desc: "Explore tea plantations and cool hill-country scenery." },
      { title: "Day 4–5 – Ella Adventure", img: sigiriya, desc: "Visit the Nine Arches Bridge and hike Little Adam’s Peak." },
      { title: "Day 6 – Leisure & Departure", img: culturalShow, desc: "Relax and enjoy the views before heading home." },
    ],
  },
  {
    id: "wild-sea",
    title: "Wildlife & Beach Escape",
    duration: "8D / 7N",
    rating: 4.8,
    img: imgWildSea,
    places: ["Yala", "Mirissa"],
    tags: ["Safari", "Whales", "Sunsets"],
    priceFrom: 899,
    person: 8,
    category: "Adventure",
    best: false,
    hero: imgWildSea,
    itinerary: [
      { title: "Day 1–2 – Arrival & Yala", img: imgWildSea, desc: "Go on safari in Yala National Park and spot elephants and leopards." },
      { title: "Day 3–5 – Mirissa", img: culturalShow, desc: "Relax at the beach and enjoy whale watching tours." },
      { title: "Day 6–7 – Galle Fort", img: imgSouth, desc: "Walk through the colonial streets of Galle Fort and sunset views." },
      { title: "Day 8 – Departure", img: temple, desc: "Transfer to the airport after breakfast." },
    ],
  },
  {
    id: "honeymoon",
    title: "Luxe Honeymoon Sri Lanka",
    duration: "10D / 9N",
    rating: 5.0,
    img: imgHoneymoon,
    places: ["Tea Trails", "Yala", "Galle"],
    tags: ["Private driver", "Boutique stays"],
    priceFrom: 1249,
    person: 2,
    category: "Honeymoon",
    best: true,
    hero: imgHoneymoon,
    itinerary: [
      { title: "Day 1 – Arrival & Welcome Dinner", img: imgHoneymoon, desc: "Enjoy a romantic dinner under the stars." },
      { title: "Day 2–3 – Tea Trails", img: temple, desc: "Relax in luxury among misty tea plantations." },
      { title: "Day 4–6 – Yala Safari", img: culturalShow, desc: "Go on a private safari and enjoy nature together." },
      { title: "Day 7–10 – Galle", img: imgSouth, desc: "Unwind at a beachfront villa in Galle." },
    ],
  },
];
