import React from 'react';
import Header from '@/components/Header';
import FooterForm from '@/components/FooterForm';
import Footer from '@/components/Footer';
import Testimonial from '@/components/white-label-services/Testimonial';
import FAQ from '@/components/white-label-services/FAQ';
import WorkTabs from '@/components/adobe-commerce-development-service/WorkTabs';
import ServicesSection from '@/components/white-label-services/ServicesSection';
import TopBannerSection from '@/components/white-label-services/TopBannerSection';
import './adobe-commerce.css';

import SEOHead from '@/components/SEOHead';
import { getPageData } from '@/utils/pageData';
import { getSeoMetadata } from '@/utils/seoHelper';

export async function generateMetadata() {
  const data = getPageData('adobe-commerce-development-service');
  return getSeoMetadata(data);
}

export default async function Page() {
  const data = getPageData('adobe-commerce-development-service');
  const acf = data.acf || {};
  return (
    <>
      <SEOHead jsonLd={data?.aioseo_head_json?.schema} />
      <Header />
      <main>
        <TopBannerSection title={data.title.rendered || 'Adobe Commerce Development Service'} topImage={acf.top_image || '/placeholder.png'} />
        
        <div className="description-section">
          <div className="container">
            <div className="description-wrp">
              <div className="description">
                <p>{acf.small_title}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="adobe-commerce-solutions">
            <WorkTabs workSections={acf.work_repater} middleCenterTitle={acf.middle_center_title} />
        </div>
        <ServicesSection services={acf.services}  sectionClass="custom-service-style" sectionTitle='Our Adobe Commerce Development Services' />

        <Testimonial testimonials={acf.testimonials} title={acf.happy_clients_title} />
        <FAQ title={acf.faq_title} faqs={acf.faqs} />
      </main>
      <FooterForm />
      <Footer />
    </>
  );
}
