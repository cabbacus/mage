import BookingForm from '@/components/TimezoneBookingForm/TimezoneBookingForm';
import './thank-you.css';

import SEOHead from '@/components/SEOHead';
import { getPageData } from '@/utils/pageData';
import { getSeoMetadata } from '@/utils/seoHelper';

export async function generateMetadata() {
  const data = getPageData('/thank-you');
  return getSeoMetadata(data);
}

export default function ThankYouPage() {
  const data = getPageData('/thank-you');
  return (
    <>
    <SEOHead jsonLd={data?.aioseo_head_json?.schema} />
    <BookingForm />
  </>
  );
}
