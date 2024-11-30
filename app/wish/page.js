"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ConfettiGenerator from "confetti-js";
import { wishes } from "./wishes";
import { funElements } from "./funElements";
import { celebratoryTexts } from "./celebratoryTexts";
import BirthdayCakeIcon from "@/public/BirthdayCakeIcon";

const BirthdayWishes = () => {
  const titleRef = useRef(null);
  const messageRef = useRef(null);
  const canvasRef = useRef(null);
  const [showConfetti, setShowConfetti] = useState(false);

  // Initialize with default values to prevent SSR mismatches
  const [randomWish, setRandomWish] = useState("Wishing you a fantastic day!");
  const [funElement, setFunElement] = useState("Celebrate like there's no tomorrow!");
  const [celebratoryText, setCelebratoryText] = useState("Cheers to you!");
  const [name, setName] = useState("Naam toh Likho");

  useEffect(() => {
    // Accessing client-side APIs
    const urlParams = new URLSearchParams(window.location.search);
    const nameFromUrl = urlParams.get("name");
    if (nameFromUrl) {
      setName(nameFromUrl);
    }

    // Generate random content on the client side
    setRandomWish(wishes[Math.floor(Math.random() * wishes.length)]);
    setFunElement(funElements[Math.floor(Math.random() * funElements.length)]);
    setCelebratoryText(
      celebratoryTexts[Math.floor(Math.random() * celebratoryTexts.length)]
    );

    // Initialize Confetti
    if (canvasRef.current) {
      const confetti = new ConfettiGenerator({
        target: canvasRef.current,
        start_from_edge: true,
      });
      confetti.render();
    }

    // GSAP Animations
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
    );
    gsap.fromTo(
      messageRef.current,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 1.5, delay: 0.5, ease: "power3.out" }
    );

    // Cleanup confetti on unmount
    return () => {
      if (canvasRef.current) {
        canvasRef.current.getContext("2d").clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    };
  }, []);

  const handleConfettiClick = () => {
    setShowConfetti(true);
    gsap.to(canvasRef.current, { opacity: 1, duration: 2, ease: "power4.out" });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center text-center px-6 py-12 relative overflow-hidden">
      {/* Confetti Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-10 opacity-0"
      ></canvas>

      <div className="relative z-20 text-gray-800 font-sans">
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl font-bold mb-6 tracking-wide"
        >
          Happy Birthday, {name}! 🎉
        </h1>

        <p
          ref={messageRef}
          className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-6 opacity-90"
        >
          {randomWish}
        </p>

        <button
          onClick={handleConfettiClick}
          className="inline-flex text-black cursor-pointer items-center justify-center px-3 py-2 text-md font-medium bg-yellow-500 rounded-lg hover:bg-zinc-100 transform hover:-translate-y-1 transition ease-in-out duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 dark:hover:bg-white dark:hover:text-black dark:border-white shadow-lg shadow-orange-900 hover:shadow-lg hover:shadow-gray-500"
        >
          <span className="mr-1">Lets Celebrate!</span> <BirthdayCakeIcon />
        </button>

        {showConfetti && (
          <div className="mt-6 text-xl sm:text-2xl text-indigo-600 font-bold opacity-90 animate__animated animate__fadeIn animate__delay-2s">
            {celebratoryText}
          </div>
        )}
      </div>
    </div>
  );
};

export default BirthdayWishes;