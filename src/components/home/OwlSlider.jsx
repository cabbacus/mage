'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function OwlSlider({ images }) {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleLoad = () => setIsPageLoaded(true);

    // Check screen size
    const checkIsDesktop = () => {
      if (typeof window !== 'undefined') {
        setIsDesktop(window.innerWidth >= 1024); // adjust breakpoint as needed
      }
    };

    checkIsDesktop();

    if (document.readyState === 'complete') {
      setIsPageLoaded(true);
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  if (!isDesktop) {
    // Don’t show anything on mobile
    return null;
  }

  if (!isPageLoaded) {
    // Show only first image before full load
    return (
      <Image
        src={images[0].image}
        alt="Initial Slide"
        width={598}
        height={363}
        priority
        style={{ width: '100%', height: 'auto' }}
      />
    );
  }

  // Desktop + page loaded → show Swiper slider
  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      loop
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      speed={450}
      spaceBetween={10}
      slidesPerView={1}
      style={{ width: '100%', height: 'auto' }}
    >
      {images.map((item, idx) => (
        <SwiperSlide key={idx}>
          <Image
            src={item.image}
            alt={`Slide ${idx}`}
            width={598}
            height={363}
            priority={idx === 0}
            style={{ width: '100%', height: 'auto' }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
