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
import './magento-marketplace.css';

export const metadata = {
  title: 'Mage Monkeys – White Label Services',
};

export default async function Page() {
  const filePath = path.join(process.cwd(), 'public/data/json/magento-marketplace.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(raw);
  const acf = data.acf || {};
  
  return (
    <>
      <Header />
      <main>
        <TopBannerSection title={data.title.rendered || 'White Label Services'} topImage={acf.top_image || '/placeholder.png'} />
        <ServicesSection services={acf.services_repeater} sectionTitle={acf.top_title} content={data.content.rendered} sectionClass="custom-service-style new-store-service" />
        <B2BPowerSection title={acf.heading_title} listItems={acf.content_details.map(item => item.title)} backgroundImage={acf.background_image}/>
      </main>
      <FooterForm />
      <Footer />
    </>
  );
}
