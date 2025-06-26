'use client';

import React from 'react';
import Image from 'next/image';
import './TopBannerSection.css';

export default function TopBannerSection({ title = '', topImage = '', sub_title = '' }) {
  const hasTextContent = title || sub_title;

  return (
    <section className="about-us banner-text">
      <div className="container">
        
        {hasTextContent && (
          <div className="about-us-content">
            {title && <h2 dangerouslySetInnerHTML={{ __html: title }} />}
            {sub_title && <p dangerouslySetInnerHTML={{ __html: sub_title }} />}
          </div>
        )}

        {topImage && (
          <div className="banner-img">
            <Image src={topImage} alt="Magento eCommerce Store Banner" width={438} height={230} priority />
          </div>
        )}

      </div>
    </section>
  );
}
