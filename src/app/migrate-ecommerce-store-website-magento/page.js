import fs from 'fs';
import path from 'path';
import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import FooterForm from '@/components/FooterForm';
import Footer from '@/components/Footer';
import ServicesSection from '@/components/white-label-services/ServicesSection';
import TopBannerSection from '@/components/white-label-services/TopBannerSection';
import FAQ from '@/components/white-label-services/FAQ';
import './ecommerce-store.css';
import B2BPowerSection from '@/components/B2BPowerSection/B2BPowerSection';
import B2BWaySection from '@/components/B2BWaySection/B2BWaySection';
import Steps from '@/components/Steps/Steps';

export const metadata = {
  title: 'Mage Monkeys – White Label Services',
};

export default async function Page() {
  const filePath = path.join(process.cwd(), 'public/data/json/migrate-ecommerce-store-website-magento.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(raw);
  const acf = data.acf || {};
  return (
    <>
      <Header />
      <main>
        <TopBannerSection title={data.title.rendered || 'White Label Services'} topImage={acf.top_image || '/placeholder.png'} />
        <section className="migratetech">
          <div className="container">
            <div className="head-title"> <h4 dangerouslySetInnerHTML={{ __html: acf.heading_title }} /></div>
            <div className="migratetech-box">
              {acf.technologies_logoes.map((logoes, idx) => (
                <div className="box" key={idx}>
                  <div className="tech-box-img">
                    <Image
                      src={logoes.logo_image}
                      alt={logoes.title}
                      width={90}
                      height={95}
                    />
                  </div>
                  <p>{logoes.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Steps heading={acf.ecommerce_store_title} steps={acf.process_repeater} />
        <ServicesSection services={acf.services_repeater} sectionClass="custom-service-style new-store-service" />
        <B2BPowerSection title={acf.customer_experience_title} content={acf.customer_experience_description} backgroundImage='/data/images/migrate-ecommerce-store-website-magento/b2b-power.jpg'/>
        <B2BWaySection title={acf.way_title} content={acf.way_description} imageSrc={acf.left_image} />
      </main>
      <FooterForm />
      <Footer />
    </>
  );
}
