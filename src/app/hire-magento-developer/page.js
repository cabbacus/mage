import React from 'react';
import Header from '@/components/Header';
import FooterForm from '@/components/FooterForm';
import Footer from '@/components/Footer';
import TopBannerSection from '@/components/white-label-services/TopBannerSection';
import TopHeadingSection from '@/components/HireMagentoDeveloper/TopHeadingSection/TopHeadingSection';
import WhyHireSection from '@/components/HireMagentoDeveloper/WhyHireSection/WhyHireSection';
import ExpertDeveloperSection from '@/components/HireMagentoDeveloper/ExpertDeveloperSection/ExpertDeveloperSection';
import SpecialNoteSection from '@/components/HireMagentoDeveloper/SpecialNoteSection/SpecialNoteSection';
import StillThinkingSection from '@/components/HireMagentoDeveloper/StillThinkingSection/StillThinkingSection';
import './hire-magento-developer.css';

import SEOHead from '@/components/SEOHead';
import { getPageData } from '@/utils/pageData';
import { getSeoMetadata } from '@/utils/seoHelper';

export async function generateMetadata() {
  const data = getPageData('hire-magento-developer');
  return getSeoMetadata(data);
}

export default async function Page() {
  const data = getPageData('hire-magento-developer');
  const acf = data.acf || {};
  return (
    <>
      <SEOHead jsonLd={data?.aioseo_head_json?.schema} />
      <Header />
      <main>
        <TopBannerSection title={data.title.rendered} topImage={acf.banner_image} />
        <TopHeadingSection topTitle={acf.top_heading_title} subTitle={acf.top_sub_title} />
        <WhyHireSection title={acf.why_hire_from_us_title} items={acf.list_repeater} />
        <ExpertDeveloperSection title={acf.developer_title} items={acf.mage_monkeys_developers} />
        <SpecialNoteSection title={acf.special_note_title} description={acf.special_note_description} cta={acf.cta_button} />
        <StillThinkingSection title={acf.still_thinking_about_title} description={acf.still_thinking_description} guaranteeTitle={acf.guarantee_title} guaranteeDescription={acf.guarantee_description} />
      </main>
      <FooterForm formTitle={acf.form_title} />
      <Footer />
    </>
  );
}
