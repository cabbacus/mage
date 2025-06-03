// utils/getUserGeoData.js

export const getUserGeoData = async () => {
  const cached = localStorage.getItem('userGeoData');
  const oneHour = 60 * 60 * 1000;

  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      const isFresh = Date.now() - parsed.timestamp < oneHour;

      if (isFresh && parsed.data?.country_code) {
        return parsed.data; // Return full data object, including country_name
      }
    } catch {
      localStorage.removeItem('userGeoData');
    }
  }

  try {
    const res = await fetch('https://ipapi.co/json/');
    if (!res.ok) throw new Error('API failed');
    const data = await res.json();

    if (data?.country_code) {
      localStorage.setItem('userGeoData', JSON.stringify({
        timestamp: Date.now(),
        data,
      }));
      return data;
    }
  } catch (error) {
    console.error('Geolocation error:', error);
    const fallback = navigator.language || 'en-US';
    return {
      country_code: fallback.slice(-2).toLowerCase(),
      country_name: fallback, // fallback name just from locale
    };
  }
};
