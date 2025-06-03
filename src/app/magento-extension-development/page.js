import fs from 'fs';
import path from 'path';
import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import FooterForm from '@/components/FooterForm';
import Footer from '@/components/Footer';
import ServicesSection from '@/components/white-label-services/ServicesSection';
import TopBannerSection from '@/components/white-label-services/TopBannerSection';
import B2BPowerSection from '@/components/B2BPowerSection/B2BPowerSection';
import B2BWaySection from '@/components/B2BWaySection/B2BWaySection';
import './magento-extension-development.css'; // add this page css below last line

export const metadata = {
  title: 'Mage Monkeys – White Label Services',
};

export default async function Page() {
  const filePath = path.join(process.cwd(), 'public/data/json/magento-extension-development.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(raw);
  const acf = data.acf || {};
  return (
    <>

      <Header />
      <main>
        <TopBannerSection title={data.title.rendered || 'White Label Services'} topImage={acf.top_image || '/placeholder.png'} />
        <ServicesSection services={acf.services_repeater} sectionClass="custom-service-style new-store-service" />
        <B2BPowerSection title={acf.b2b_business_title} content={acf.b2b_business_description} backgroundImage={acf.background_image}/>
      </main>
      <FooterForm />
      <Footer />
    </>
  );
}
