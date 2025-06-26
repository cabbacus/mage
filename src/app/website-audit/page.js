import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Form from '@/components/Form';
import Image from 'next/image';
import './website-audit.css';

import SEOHead from '@/components/SEOHead';
import { getPageData } from '@/utils/pageData';
import { getSeoMetadata } from '@/utils/seoHelper';

export async function generateMetadata() {
  const data = getPageData('/website-audit');
  return getSeoMetadata(data);
}

export default async function Page() {
  const data = getPageData('/website-audit');
  const acf = data.acf || {};
  return (
    <>
      <SEOHead jsonLd={data?.aioseo_head_json?.schema} />
      <Header />

      <section className="main-banner">
        <Image
          src="/data/images/website-audit/why-hire.jpg"
          alt="Why Hire"
          width={500}
          height={500}
          className="mobile-banner-img"
        />
        <div className="container">
          <div className="row">
            <div className="col-md-12 main-title">
              <h1 dangerouslySetInnerHTML={{ __html: acf.heading_title || '' }} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 main-banner-left">
              {acf.audit_repeater?.map((item, i) => (
                <div key={i} className="grid-left-right">
                  <div className="left-img">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="right-content">
                    <h6 dangerouslySetInnerHTML={{ __html: item.title }} />
                    <p dangerouslySetInnerHTML={{ __html: item.description }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-6 main-banner-right get_started">
              <div className="right-title">
                <h4 dangerouslySetInnerHTML={{ __html: acf.title || '' }} />
                <div dangerouslySetInnerHTML={{ __html: acf.description || '' }} />
              </div>
              <Form buttonLabel="Schedule a call" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
