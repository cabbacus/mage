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
import MobileAppSection from '@/components/MobileAppSection/MobileAppSection';
import './magento-mobile-app.css'; // import this page css file on last line

import SEOHead from '@/components/SEOHead';
import { getPageData } from '@/utils/pageData';
import { getSeoMetadata } from '@/utils/seoHelper';

export async function generateMetadata() {
  const data = getPageData('/magento-mobile-app-development');
  return getSeoMetadata(data);
}

export default async function Page() {
  const data = getPageData('/magento-mobile-app-development');
  const acf = data.acf || {};
  const magentoList = acf.magento_mobile_application_block.map(item => `<li>${item.title}</li>`).join('');

  const content = `<div class="list-style"><ul>${magentoList}</ul></div>`;
  return (
    <>
      <SEOHead jsonLd={data?.aioseo_head_json?.schema} />
      <Header />
      <main>
        <TopBannerSection title={data.title.rendered || 'White Label Services'} topImage={acf.top_image || '/placeholder.png'} />
        <ServicesSection services={acf.pwa_block} sectionClass="custom-service-style new-store-service" />
        <MobileAppSection title={acf.title} description={acf.description} image={acf.image} cta_button={acf.cta_button} />
        <B2BPowerSection title={acf.heading_title} content={content} backgroundImage={acf.bg_image}/>
      </main>
      <FooterForm />
      <Footer />
    </>
  );
}
