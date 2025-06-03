'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './Testimonial.css';
export default function Testimonial({ testimonials, title }) {
  if (!testimonials?.length) return null;

  return (
    <section id="testimonial" className="client_testimonial">
      <div className="container">
        <div className="title">
          {title && (
            <h4
              className="b2c"
              dangerouslySetInnerHTML={{ __html: title }}
            />
          )}
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={1}         // = “items: 1”
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop                      // feel-free to remove if you don’t want looping
          className="testimonial-slider"
        >
          {testimonials.map((item, i) => (
            <SwiperSlide key={i}>
              <div className="item">
                <p dangerouslySetInnerHTML={{ __html: item.client_experience_description }} />
                <div className="testimonial_profile">
                  <span dangerouslySetInnerHTML={{ __html: item.client_name }} />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
