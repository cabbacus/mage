import fs from 'fs';
import path from 'path';
import React from 'react';
import Header from '@/components/Header';
import FooterForm from '@/components/FooterForm';
import Footer from '@/components/Footer';
import TopBannerSection from '@/components/white-label-services/TopBannerSection';
import B2BPowerSection from '@/components/B2BPowerSection/B2BPowerSection';
import Steps from '@/components/Steps/Steps';
import './magento-upgrade-service.css';
import MobileAppSection from '@/components/MobileAppSection/MobileAppSection';
import SEOHead from '@/components/SEOHead';
import { getPageData } from '@/utils/pageData';
import { getSeoMetadata } from '@/utils/seoHelper';

export async function generateMetadata() {
  const data = getPageData('/magento-upgrade-service');
  return getSeoMetadata(data);
}

export default async function Page() {
  const data = getPageData('/magento-upgrade-service');
  const acf = data.acf || {};
  
  return (
    <>
      <SEOHead jsonLd={data?.aioseo_head_json?.schema} />
      <Header />
      <main>
        {/* <pre>{JSON.stringify(data.acf, null, 2)}</pre> */}
        <TopBannerSection title={acf.page_title || 'White Label Services'} topImage={acf.top_image || '/placeholder.png'} />
        <MobileAppSection title={acf.title} description={acf.description} image={acf.image} pop_button="Schedule a Call" />
        <B2BPowerSection title={acf.heading_title} listItems={acf.repeater.map(item => item.title)} backgroundImage={acf.bg_image}/>
        <Steps heading={acf.step_title} sub_heading={acf.sub_title} highlights_title={acf.highlights_title} highlights_description={acf.highlights_description} steps={acf.step_process} perform_sub_heading_title={acf.sub_heading_title} perform_image='/data/images/magento-upgrade-service/setting-img.png' how_we_perform_title={acf.how_we_perform_title} how_we_perform_description={acf.how_we_perform_description} perform_repeater={acf.perform_repeater} />
      </main>
      <FooterForm />
      <Footer />
    </>
  );
}
