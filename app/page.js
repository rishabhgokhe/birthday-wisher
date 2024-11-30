"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";

export default function MysteriousPage() {
  const [factIndex, setFactIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [isClient, setIsClient] = useState(false);  // Added state to check if it's client-side

  const factRefs = useRef([]);

  const facts = [
    "Did you know? Birthdays were once believed to protect people from evil spirits.",
    "The tradition of birthday cakes dates back to the Greeks, who offered honey cakes to the gods.",
    "In some cultures, it's believed that the way you celebrate your birthday will influence your year ahead.",
    "The song 'Happy Birthday' was first sung in the 19th century and is now the most sung song in the world.",
    "In Russia, a person celebrates their name day, which is more important than their birthday in some cases!"
  ];

  // Set the client-side flag after the component is mounted
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (factIndex > 0) {
      gsap.fromTo(
        factRefs.current[factIndex - 1],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );
    }
  }, [factIndex]);

  const handleFactReveal = () => {
    if (factIndex < facts.length) {
      setFactIndex(factIndex + 1);
      if (factIndex === facts.length - 1) {
        setShowButton(true); // Show button after last fact
      }
    }
  };

  // Only render the component once it's mounted on the client
  if (!isClient) {
    return null; // Prevent the server-side render until client-side
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black flex flex-col justify-center items-center text-center relative">
      <h1
        className="text-6xl font-bold text-white tracking-wider mb-6"
      >
        A Birthday Mystery Awaits...
      </h1>
      <div className="text-xl text-white opacity-80 mt-4 max-w-3xl mx-auto">
        <p>Click below to discover fun and surprising facts about birthdays!</p>
      </div>

      <div className="mt-6 space-y-4">
        {facts.slice(0, factIndex).map((fact, idx) => (
          <p
            key={idx}
            ref={(el) => (factRefs.current[idx] = el)}
            className="text-xl text-white opacity-0"
          >
            {fact}
          </p>
        ))}
      </div>

      <div className="mt-6">
        {factIndex < facts.length && (
          <button
            onClick={handleFactReveal}
            className="bg-pink-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition duration-300 hover:bg-pink-600 hover:scale-105"
          >
            Reveal Next Fact
          </button>
        )}

        {showButton && (
          <Link
            href="/greeting"
            className="bg-pink-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition duration-300 hover:bg-pink-600 hover:scale-105 mt-6"
          >
            Reveal the Surprise
          </Link>
        )}
      </div>

      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 animate-pulse" />
    </div>
  );
}