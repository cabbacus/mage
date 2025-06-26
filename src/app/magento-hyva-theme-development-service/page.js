import fs from 'fs';
import path from 'path';
import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import FooterForm from '@/components/FooterForm';
import Footer from '@/components/Footer';
import Testimonial from '@/components/white-label-services/Testimonial';
import ServicesSection from '@/components/white-label-services/ServicesSection';
import TopBannerSection from '@/components/white-label-services/TopBannerSection';
import FAQ from '@/components/white-label-services/FAQ';
import './white-label-services.css';

import SEOHead from '@/components/SEOHead';
import { getPageData } from '@/utils/pageData';
import { getSeoMetadata } from '@/utils/seoHelper';

export async function generateMetadata() {
  const data = getPageData('magento-hyva-theme-development-service');
  return getSeoMetadata(data);
}

export default async function Page() {
  const data = getPageData('magento-hyva-theme-development-service');
  const acf = data.acf || {};
  return (
    <>
      <SEOHead jsonLd={data?.aioseo_head_json?.schema} />
      <Header />
      <main>
        {/* <pre>{JSON.stringify(acf, null, 2)}</pre> */}
        {/* Hero Section */}
        <TopBannerSection title={data.title.rendered} topImage={acf.top_image} />
        
        {/* White Label Description */}
        <div className="magento-services-include">
          <div className="container">
            <div className="white-label-sr-desc">
              <p
                dangerouslySetInnerHTML={{
                  __html: acf.small_title || '',
                }}
              />
            </div>
          </div>
        </div>

        {/* Partner Section */}
        <div className="white-label-partner">
          <div className="container">
            <div className="row">
              <h4
                className="b2c"
                dangerouslySetInnerHTML={{
                  __html: acf.white_label_partner_title || '',
                }}
              />
              <div className="list-style grid_2">
                <ul>
                  {acf.partner_repeater?.map((item, i) => (
                    <li key={i} dangerouslySetInnerHTML={{__html: item.title || '',}} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <ServicesSection services={acf.services}  sectionClass="custom-service-style" sectionTitle={acf.service_label_title} />
        
        <Testimonial
          testimonials={acf.testimonials}
          title={acf.happy_clients_title}
        />
        <FAQ title={acf.faq_title} faqs={acf.faqs} />
      </main>
      <FooterForm />
      <Footer />
    </>
  );
}
