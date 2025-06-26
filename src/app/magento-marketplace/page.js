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

import SEOHead from '@/components/SEOHead';
import { getPageData } from '@/utils/pageData';
import { getSeoMetadata } from '@/utils/seoHelper';

export async function generateMetadata() {
  const data = getPageData('magento-marketplace');
  return getSeoMetadata(data);
}

export default async function Page() {
  const data = getPageData('magento-marketplace');
  const acf = data.acf || {};
  return (
    <>
      <SEOHead jsonLd={data?.aioseo_head_json?.schema} />
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
