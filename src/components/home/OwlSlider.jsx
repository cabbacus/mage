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

  useEffect(() => {
    const handleLoad = () => setIsPageLoaded(true);

    // Add event listener for full page load
    if (document.readyState === 'complete') {
      setIsPageLoaded(true);
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  if (!isPageLoaded) {
    // Render only the first image before page is fully loaded
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

  // After page load, show the full slider
  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      loop={true}
      navigation={true}
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
