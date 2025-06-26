import React from 'react';
import Header from '@/components/Header';
import FooterForm from '@/components/FooterForm';
import Footer from '@/components/Footer';
import ServicesSection from '@/components/white-label-services/ServicesSection';
import TopBannerSection from '@/components/white-label-services/TopBannerSection';
import Testimonial from '@/components/white-label-services/Testimonial';
import FAQ from '@/components/white-label-services/FAQ';
import './adobe-experience-manager.css';

import SEOHead from '@/components/SEOHead';
import { getPageData } from '@/utils/pageData';
import { getSeoMetadata } from '@/utils/seoHelper';

export async function generateMetadata() {
  const data = getPageData('adobe-experience-manager-development-aem');
  return getSeoMetadata(data);
}

export default async function Page() {
  const data = getPageData('adobe-experience-manager-development-aem');
  const acf = data.acf || {};
  return (
    <>
      <SEOHead jsonLd={data?.aioseo_head_json?.schema} />
      <Header />
      <main>
        <TopBannerSection title={data.title.rendered || 'White Label Services'} topImage={acf.top_image || '/placeholder.png'} />
        <ServicesSection services={acf.services} sectionTitle={acf.service_label_title} content={acf.small_title} sectionClass="custom-service-style new-store-service" />
        <Testimonial testimonials={acf.testimonials} title={acf.happy_clients_title} />
        <FAQ title={acf.faq_title} faqs={acf.faqs} />
      </main>
      <FooterForm />
      <Footer />
    </>
  );
}
