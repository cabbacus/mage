import fs from 'fs';
import path from 'path';
import React from 'react';
import Image from 'next/image';

import Header from '@/components/Header';
import FooterForm from '@/components/FooterForm';
import Footer from '@/components/Footer';
import Testimonial from '@/components/white-label-services/Testimonial';
import FAQ from '@/components/white-label-services/FAQ';
import TopBannerSection from '@/components/white-label-services/TopBannerSection';
import './optimization-services.css';

export const metadata = {
  title:
    'Magento 2 Performance & Speed Optimization Service | Magento Speed Optimization Service',
};

export default async function Page() {
  const filePath = path.join(
    process.cwd(),
    'public/data/json/magento-performance-speed-optimization-services.json'
  );
  const raw = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(raw);
  const acf = data.acf ?? {};

  const {
    page_title,
    top_image,
    top_description,
    white_label_partner_title,
    services,
    optimization_services,
    black_box_content,
    faq_title,
    faqs,
    happy_clients_title,
    testimonials,
  } = acf;

  return (
    <>
      <Header />

      <main>
        <TopBannerSection
          title={acf.page_title || 'Magento Performance &amp; Speed  <br> <span> Optimization Services </span>'}
          topImage={acf.top_image || '/placeholder.png'}
        />

        <section className="optimization-services">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div
                  className="optimization-services-desc"
                  dangerouslySetInnerHTML={{ __html: top_description }}
                />
                <h4
                  className="b2c"
                  dangerouslySetInnerHTML={{ __html: white_label_partner_title }}
                />
                <div className="list-style grid_2">
                  <ul>
                    {services?.map((item, i) => (
                      <li key={i}>{item.title}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {optimization_services?.length > 0 && (
          <section className="services-sec">
            <div className="container">
              <div className="row">
                <div className="partition-column">
                  <div className="marge-col-2">
                    {optimization_services.slice(0, 2).map((item, i) => (
                      <div key={i} className="managed_upgrade_content">
                        <h4>{item.title}</h4>
                        <div
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                      </div>
                    ))}
                  </div>

                  {optimization_services.slice(2).map((item, i) => (
                    <div
                      key={`opt-${i + 2}`}
                      className="managed_upgrade_content"
                    >
                      <h4>{item.title}</h4>
                      <div
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {black_box_content && (
          <section className="tag-line">
            <div className="tag-content">
              <p dangerouslySetInnerHTML={{ __html: black_box_content }} />
            </div>
          </section>
        )}

        {faqs?.length > 0 && <FAQ title={faq_title} faqs={faqs} />}

        {testimonials?.length > 0 && (
          <Testimonial
            testimonials={testimonials}
            title={happy_clients_title}
          />
        )}
      </main>

      <FooterForm />
      <Footer />
    </>
  );
}
