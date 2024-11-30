"use client"

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';

export default function Home() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRefs = useRef([]);

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { duration: 1, ease: 'power2.out' } });


    const chars = titleRef.current.textContent.split('');
    titleRef.current.innerHTML = ''; 

    chars.forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char;
      titleRef.current.appendChild(span);

      gsap.from(span, {
        opacity: 0,
        y: 50,
        duration: 0.7,
        stagger: 0.1,
        filter: "blur(15px)",
        delay: index * 0.1,
      });
    });

    timeline.fromTo(subtitleRef.current, 
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, delay: 0.7 });

    timeline.fromTo(buttonRefs.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, stagger: 0.3, delay: 1 });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 flex flex-col justify-center items-center text-center">
      <h1 ref={titleRef} className="text-5xl font-bold text-white transform-gpu">
        🎉 Happy Birthday! 🎉
      </h1>
      <p ref={subtitleRef} className="text-lg mt-4 text-white opacity-80">
        Welcome to this special website, crafted just for your birthday!
      </p>
      <div ref={buttonRefs} className="mt-6 space-x-4">
        <Link href="/wish"  className="bg-pink-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition duration-300 hover:bg-pink-600 hover:scale-105">
            See Your Wish
        </Link>
        <Link href="/gallery" className="bg-purple-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition duration-300 hover:bg-purple-600 hover:scale-105">
            View Gallery
        </Link>
      </div>
    </div>
  );
}