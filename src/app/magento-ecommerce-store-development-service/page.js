import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import FooterForm from '@/components/FooterForm';
import Footer from '@/components/Footer';
import ManagedServiceContent from '@/components/ManagedServiceContent';
import TopBannerSection from '@/components/white-label-services/TopBannerSection';
import './development-service.css';
import SEOHead from '@/components/SEOHead';
import { getPageData } from '@/utils/pageData';
import { getSeoMetadata } from '@/utils/seoHelper';

export async function generateMetadata() {
  const data = getPageData('magento-ecommerce-store-development-service');
  return getSeoMetadata(data);
}

export default async function Page() {
  const data = getPageData('magento-ecommerce-store-development-service');
  const acf = data.acf || {};
  const {
    top_image,
    content,
    service_repeater,
    case_studies_title,
    case_studies,
  } = acf;

  return (
    <>
      <SEOHead jsonLd={data?.aioseo_head_json?.schema} />
      <Header />
      <main>
        {/* Banner Section */}
        <TopBannerSection title={data.title.rendered} topImage={top_image} />

        {/* Services Section */}
        {service_repeater?.length > 0 && (
          <section className="new-store-service">
            <div className="container">
              <div className="row">
                <div className="grid-services">
                  {service_repeater.map((service, idx) => (
                    <div key={idx} className="service-list">
                      <h4>{service.title}</h4>
                      <div dangerouslySetInnerHTML={{ __html: service.description }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Tagline Section */}
        {content && (
          <section className="tag-line-box">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="tag-content">
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                  </div>
                </div>
              </div>
          </div>
          </section>
        )}

        {/* Case Studies Section */}
        {case_studies?.length > 0 && (
          <section className='case-studies-sec'>
            <div className="container">
              <h4>{case_studies_title}</h4>
              <div className="managed_services_outer">
                  {case_studies.map((study, idx) => (
                    <div key={idx} className="row">
                      <div className="col-xs-12 col-sm-6 mb-custom">
                        <div className="managed_services_img">
                          <a href={study.link || '#'} target="_blank" rel="noopener noreferrer">
                            <Image
                              src={study.image}
                              alt={study.title}
                              width={500}
                              height={300}
                            />
                          </a>
                        </div>
                      </div>
                      <div className="col-xs-12 col-sm-6 mb-custom">
                        <div className="managed_services_content">
                            <h4>{study.title}</h4>
                              <ManagedServiceContent description={study.description} />
                        </div>
                      </div>
                    </div>
                  ))}
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
