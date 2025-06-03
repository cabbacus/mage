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

export const metadata = {
  title: 'What is Hyvä Theme? - magemonkeys',
};

export default async function Page() {
  const filePath = path.join(process.cwd(), 'public/data/json/shopify-to-magento-migration-service.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(raw);
  const acf = data.acf || {};

  return (
    <>
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
