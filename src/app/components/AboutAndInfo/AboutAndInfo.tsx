'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

import AboutDemo from '@/app/components/About/About';
import Disclaimer from '@/app/components/Disclaimer/Disclaimer';

const AboutAndInfo = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: 'snap',
    slides: { perView: 1 },
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
  });

  useEffect(() => {
    if (!slider) return;
    const interval = setInterval(() => {
      slider.current?.next();
    }, 10000);
    return () => clearInterval(interval);
  }, [slider]);

  return (
    <div className="relative">
      <div ref={sliderRef} className="keen-slider  overflow-hidden">
        <div className="keen-slider__slide">
          <AboutDemo />
        </div>
        <div className="keen-slider__slide">
          <Disclaimer />
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {[0, 1].map((idx) => (
          <button
            key={idx}
            onClick={() => slider.current?.moveToIdx(idx)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === idx ? 'bg-gray-400' : 'bg-white'
            } transition-all`}
          />
        ))}
      </div>
      <div className="absolute top-1/2 left-4 -translate-y-1/2 z-10">
        <button
          onClick={() => slider.current?.prev()}
          className="bg-white/80 text-black px-2 py-1 rounded-full shadow"
        >
          ‹
        </button>
      </div>
      <div className="absolute top-1/2 right-4 -translate-y-1/2 z-10">
        <button
          onClick={() => slider.current?.next()}
          className="bg-white/80 text-black px-2 py-1 rounded-full shadow"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default AboutAndInfo;
