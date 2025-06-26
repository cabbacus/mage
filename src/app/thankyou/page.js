import fs from 'fs';
import path from 'path';
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './thankyou.css';
import SEOHead from '@/components/SEOHead';
import { getPageData } from '@/utils/pageData';
import { getSeoMetadata } from '@/utils/seoHelper';

export async function generateMetadata() {
  const data = getPageData('/thankyou');
  return getSeoMetadata(data);
}

export default async function Page() {
  const data = getPageData('/thankyou');
  const acf = data.acf || {};
  return (
    <>
    <SEOHead jsonLd={data?.aioseo_head_json?.schema} />
    <Header />
    <div className="thankyou-wraper">
        <div className="inner_banner full-width">
            <div className="inner_banner_text">
                <div className="container">
                    <h1>{ data.title.rendered }</h1>
                </div>
            </div>
        </div>

        <div className="managed-services-about">
            <div className="container">
                <p>We have received your inquiry.</p>
                <p>Our team will get back to you as per your time request.</p>
            </div>
        </div>
    </div>
    <Footer />
    </>
  );
}
