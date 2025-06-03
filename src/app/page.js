import fs from 'fs';
import path from 'path';
import React from 'react';

import Header from '../components/Header';
import OwlSlider from '../components/home/OwlSlider';
import WorkTabs from '../components/home/WorkTabs';
import TestimonialsCarousel from '../components/home/TestimonialsCarousel';
import FooterForm from '../components/FooterForm';
import Footer from '../components/Footer';
import HeroBanner from '../styles/hero-banner.css';
import Image from 'next/image';
export const metadata = {
  title: 'Mage Monkeys – Home',
};

export default async function Page() {
  // 1. read the static JSON produced by the fetch script
  const filePath = path.join(process.cwd(), 'public/data/json/home.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(raw);        // <- all fields live here
  const acf = data.acf || {};
  return (
    <>
      <Header />

      <main>
        {/* Hero --———————————————————— */}
        <section>
          <div className="home-banner">
            <div className='mobile-banner-bg'>
              <Image
                src="/wp-images/banner-mage-monkeys.jpg"
                alt="Mobile Banner"
                width={390}
                height={260}
                className="mobile-banner-img"
                priority
              />
            </div>
            <div className="container home-banner-wrap">
              <div className="row">
                <div className="col-md-6">
                  <div className="banner-left-content">
                    <div className="heading-title" dangerouslySetInnerHTML={{ __html: acf.heading_title }} />
                    <p>{acf.sub_title}</p>
                    <div className="banner-btn-box">
                      <Image
                        width={300}
                        height={118}
                        src='/wp-images/certificate.png'
                        alt='Magento Certificate'
                      />
                      <button className='custom_btn banner-btn schedule'>{acf.cta_button}</button>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="new-home-slider">
                    <OwlSlider images={acf.slider_repeater} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Work tabs */}
        <WorkTabs
          workSections={acf.work_repater}
          middleCenterTitle={acf.middle_center_title}
        />

        {/* Why-us section */}
        <section className="text-center why_mage_monkey">
          <div className="container">
            <h5 style={{ color: '#999999' }}>{acf.title}</h5>
            <p className="white_text1">{acf.inner_sub_title}</p>

            <div className="row">
              {acf.job_process.map((job, idx) => (
                <div key={idx} className="col-sm-4 col-xs-12">
                  <div className="text-left why_mage_cell">
                    <Image src={job.icon} alt={job.title} width={51} height={51} />
                    <div className="why_mage_cell_desc">
                      <h6>{job.title}</h6>
                      <div dangerouslySetInnerHTML={{ __html: job.sub_title }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <TestimonialsCarousel
          testimonials={acf.testimonials}
          acf={data}               /* if your component still expects it */
        />
      </main>

      <FooterForm />
      <Footer />
    </>
  );
}
