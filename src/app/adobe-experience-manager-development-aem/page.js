import fs from 'fs';
import path from 'path';
import React from 'react';
import Header from '@/components/Header';
import FooterForm from '@/components/FooterForm';
import Footer from '@/components/Footer';
import ServicesSection from '@/components/white-label-services/ServicesSection';
import TopBannerSection from '@/components/white-label-services/TopBannerSection';
import Testimonial from '@/components/white-label-services/Testimonial';
import FAQ from '@/components/white-label-services/FAQ';
import './adobe-experience-manager.css';

export const metadata = {
  title: 'Mage Monkeys – White Label Services',
};

export default async function Page() {
  const filePath = path.join(process.cwd(), 'public/data/json/adobe-experience-manager-development-aem.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(raw);
  const acf = data.acf || {};
  
  return (
    <>
      <Header />
      <main>
        <TopBannerSection title={data.title.rendered || 'White Label Services'} topImage={acf.top_image || '/placeholder.png'} />
        <ServicesSection services={acf.services} sectionTitle={acf.service_label_title} content={acf.small_title} sectionClass="custom-service-style new-store-service" />
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
