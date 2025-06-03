// components/SEOHead.jsx
'use client';
import Head from 'next/head';
import React from 'react';

const SEOHead = ({ seo }) => {
  if (!seo?.aioseo_head) return null;

  return (
    <Head>
      <div dangerouslySetInnerHTML={{ __html: seo.aioseo_head }} />
    </Head>
  );
};

export default SEOHead;
