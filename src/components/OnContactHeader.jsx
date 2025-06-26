'use client';

import { useEffect, useState } from 'react';
import ContactHeader from '@/components/ContactHeader/ContactHeader';
import Header from '@/components/Header';

const OnContactHeader = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 991);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile ? <Header /> : <ContactHeader />;
};

export default OnContactHeader;