'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import ContactHeader from '@/components/ContactHeader/ContactHeader';
import Header from '@/components/Header';

const HeaderSwitcher = ({ siteDetails, menuItems }) => {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 991);
    };

    handleResize(); // Run once on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isContactPage = pathname.startsWith('/contact');

  if (isContactPage) {
    return <ContactHeader isMobile={isMobile} />;
  }

  return <Header siteDetails={siteDetails} menuItems={menuItems} isMobile={isMobile} />;
};

export default HeaderSwitcher;
