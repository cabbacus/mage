import OnContactHeader from '@/components/OnContactHeader';
import Footer from '@/components/Footer';
import Form from '@/components/Form';
import TopBannerSection from '@/components/white-label-services/TopBannerSection';
import Image from 'next/image';
import './contact.css';

import SEOHead from '@/components/SEOHead';
import { getPageData } from '@/utils/pageData';
import { getSeoMetadata } from '@/utils/seoHelper';

export async function generateMetadata() {
  const data = getPageData('contact');
  return getSeoMetadata(data);
}

export default async function Page() {
  const data = getPageData('contact');
  const acf = data.acf || {};
  return (
    <>
      <SEOHead jsonLd={data?.aioseo_head_json?.schema} />
      <OnContactHeader />
      <TopBannerSection title={data.title?.rendered} topImage={acf.top_image} />

      <main>
        <section className="get_started">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-6 get_started_desktopshow">
                <h4 className="white_text">{acf.stats_title}</h4>
                <ul className="worl-calc-main">
                  {acf.stats_repeater.map((stats_repeater, idx) => (
                    <li key={idx} className="service-list">
                      <Image
                        src={stats_repeater.image_src}
                        alt="Store"
                        width={50}
                        height={50}
                      />
                      <p dangerouslySetInnerHTML={{ __html: stats_repeater.title }} />
                      <h4
                        className="numbers"
                        dangerouslySetInnerHTML={{ __html: stats_repeater.number }}
                      />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-12 col-md-6 get-started-right">
                <div className="get-start-title">
                  <h4 dangerouslySetInnerHTML={{ __html: acf.lets_connect_title }} />
                  <p className="form-tagline">
                    <span>With</span> Only Agency that provides a 24/7 emergency support.
                  </p>
                  <h6 dangerouslySetInnerHTML={{ __html: acf.heading_title }} />
                  <div className='mail-link'>
                    <p>Email : <a href={`mailto:${acf.email}`} >{acf.email}</a></p>
                  </div>
                </div>
                <Form />
              </div>
            </div>
          </div>
        </section>
        <section className="get-startd-contact">
          <div className="container">
            <div className="country-logo">
              <h5>{acf.sub_title}</h5>
              <ul className="logo_image">
                {acf.logoes && acf.logoes.map((item, index) => (
                  <li key={index} title={item.title}>
                    <Image
                      src={item.logo}
                      alt={item.title}
                      width={147}
                      height={147}
                      priority={true}
                      style={{ objectFit: 'contain' }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
