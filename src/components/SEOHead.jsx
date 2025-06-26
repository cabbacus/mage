'use client';
import React from 'react';

const SEOHead = ({ jsonLd }) => {
  if (!jsonLd) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default SEOHead;
