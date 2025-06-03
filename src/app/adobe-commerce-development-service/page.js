import fs from 'fs';
import path from 'path';
import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import FooterForm from '@/components/FooterForm';
import Footer from '@/components/Footer';
import Testimonial from '@/components/white-label-services/Testimonial';
import FAQ from '@/components/white-label-services/FAQ';
import WorkTabs from '@/components/adobe-commerce-development-service/WorkTabs';
import ServicesSection from '@/components/white-label-services/ServicesSection';
import './adobe-commerce.css';
import TopBannerSection from '@/components/white-label-services/TopBannerSection';

export const metadata = {
  title: 'Adobe Commerce Development Services | Mage Monkeys',
};

export default async function Page() {
  const filePath = path.join(process.cwd(), 'public/data/json/adobe-commerce-development-service.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(raw);
  const acf = data.acf;

  return (
    <>
      <Header />
      <main>
        <TopBannerSection
            title={data.title.rendered || 'Adobe Commerce Development Service'}
            topImage={acf.top_image || '/placeholder.png'}
        />

        <div className="adobe-commerce-solutions">
            <WorkTabs
                workSections={acf.work_repater}
                middleCenterTitle={acf.middle_center_title}
            />
        </div>
        <ServicesSection services={acf.services}  sectionClass="custom-service-style" sectionTitle='Our Adobe Commerce Development Services' />

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
