import React from 'react';
import Header from '@/components/Header';
import FooterForm from '@/components/FooterForm';
import Footer from '@/components/Footer';
import ServicesSection from '@/components/white-label-services/ServicesSection';
import TopBannerSection from '@/components/white-label-services/TopBannerSection';
import B2BPowerSection from '@/components/B2BPowerSection/B2BPowerSection';
import B2BWaySection from '@/components/B2BWaySection/B2BWaySection';
import './enterprise-b2b.css';

import SEOHead from '@/components/SEOHead';
import { getPageData } from '@/utils/pageData';
import { getSeoMetadata } from '@/utils/seoHelper';

export async function generateMetadata() {
  const data = getPageData('magento-enterprise-b2b-solution');
  return getSeoMetadata(data);
}

export default async function Page() {
  const data = getPageData('magento-enterprise-b2b-solution');
  const acf = data.acf || {};
  return (
    <>
      <SEOHead jsonLd={data?.aioseo_head_json?.schema} />
      <Header />
      <main>
        <TopBannerSection title={data.title.rendered || 'White Label Services'} topImage={acf.top_image || '/placeholder.png'} />
        <ServicesSection services={acf.services_repeater} sectionClass="custom-service-style new-store-service" />
        <B2BPowerSection title={acf.b2b_business_title} content={acf.b2b_business_description} backgroundImage={acf.background_image}/>
        <B2BWaySection title={acf.mage_monkeys_way_title} content={acf.mage_monkeys_way_description} imageSrc={acf.left_image} />
      </main>
      <FooterForm />
      <Footer />
    </>
  );
}
