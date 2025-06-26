import fs from 'fs';
import path from 'path';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Form from '@/components/Form';
import TopBannerSection from '@/components/white-label-services/TopBannerSection';
import SupportRequired from '@/components/SupportRequired/SupportRequired';
import FooterForm from '@/components/FooterForm';
import './critical-general-support.css';

import SEOHead from '@/components/SEOHead';
import { getPageData } from '@/utils/pageData';
import { getSeoMetadata } from '@/utils/seoHelper';

export async function generateMetadata() {
  const data = getPageData('home');
  return getSeoMetadata(data);
}

export default async function Page() {
  const data = getPageData('24-7-magento-critical-general-support');
  const acf = data.acf || {};
 
  return (
    <>
      <SEOHead jsonLd={data?.aioseo_head_json?.schema} />
      <Header />
      <TopBannerSection title={data.title?.rendered} topImage="/data/images/24-7-magento-critical-general-support/certificate_new.png" sub_title={acf.gs_description} />

      <main>
        <section className="general-support-get-start">
          <div className="container">
              <div className="get-start-title">
                  <h4 className="white_text">{acf.gs_f1_title}</h4>
                  <p>Email : <a href="mailto:contact@magemonkeys.com"> contact@magemonkeys.com</a></p>
              </div>
              <Form buttonLabel='Open Ticket' />
          </div>
        </section>
        <SupportRequired support_required={acf.support_required} support_required_heading={acf.support_required_heading} />
        {acf.gs_tagline && (
          <section className="tag-line-box">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className='tag-line'>
                    <div className="tag-content">
                      <p dangerouslySetInnerHTML={{ __html: acf.gs_tagline }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        
      </main>

      <FooterForm />
      <Footer />
    </>
  );
}
