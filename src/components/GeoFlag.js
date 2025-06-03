'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export const getUserGeoData = async () => {
  const cached = localStorage.getItem('userGeoData');
  const oneHour = 60 * 60 * 1000;

  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      const isFresh = Date.now() - parsed.timestamp < oneHour;
      if (isFresh && parsed.data?.country_code) return parsed.data;
    } catch {
      localStorage.removeItem('userGeoData');
    }
  }

  try {
    const res = await fetch('https://ipapi.co/json/');
    if (!res.ok) throw new Error('API failed');
    const data = await res.json();
    if (data?.country_code) {
      localStorage.setItem(
        'userGeoData',
        JSON.stringify({ timestamp: Date.now(), data })
      );
      return data;
    }
  } catch (error) {
    console.error('Geolocation error:', error);
    const fallback = navigator.language || 'en-US';
    return {
      country_code: fallback.slice(-2).toLowerCase(),
      country_name: fallback,
    };
  }
};

export default function GeoFlag({ defaultTooltip }) {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    async function loadGeo() {
      const data = await getUserGeoData();
      setGeoData({
        country_code: data.country_code.toLowerCase(),
        country_name: data.country_name || defaultTooltip,
      });
    }
    loadGeo();
  }, [defaultTooltip]);

  if (!geoData?.country_code || !geoData?.country_name) return null; // Or a loading spinner

  return (
    <div className="tooltip fg3">
      <Image
        src={`/images/flags/${geoData.country_code}.png`}
        alt={`${geoData.country_name} flag`}
        width={24}
        height={16}
        loading="lazy"
      />
      <span className="tooltiptext">
        {`${geoData.country_name}'s Leading Magento Agency`}
      </span>
    </div>
  );
}
