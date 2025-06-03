'use client';

import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@/styles/testimonial.css';
import '../../styles/owl.carousel.css'; // remove if you don't use OwlCarousel styles
import '../../styles/owl.theme.default.css'; // remove too

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    maxWidth: '90%',
    width: '600px',
    padding: '0',
    border: 'none',
    borderRadius: '10px',
    background: '#000',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 1000,
  },
};

export default function TestimonialsCarousel({ acf, testimonials }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState('');

  useEffect(() => {
    Modal.setAppElement('body');
  }, []);

  const openModal = (videoUrl) => {
    setActiveVideoUrl(videoUrl);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setActiveVideoUrl('');
  };

  return (
    <section className="testimonial-wrp">
      <div className="container">
        <h3>Video Testimonials</h3>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            1: { slidesPerView: 2},
            768: { slidesPerView: 2},
            1000: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((testimonial, idx) => (
            <SwiperSlide key={idx}>
              <div className="item">
                <div className="item-box">
                  <button
                    type="button"
                    onClick={() => openModal(testimonial.videoUrl)}
                    className="item-video-wrp"
                    style={{ border: 'none', background: 'none', padding: 0 }}
                  >
                    <video
                      width={380}
                      height={230}
                      poster={testimonial.image}
                    >
                      <source src={testimonial.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <span className="ply_btn">
                      <Image src="/images/icons/play.png" alt="play" width={50} height={50} />
                    </span>
                  </button>
                  <h4>{testimonial.name}</h4>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
          <video width="100%" controls autoPlay>
            <source src={activeVideoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Modal>
      </div>
    </section>
  );
}
