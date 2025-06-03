import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopBannerSection from '@/components/white-label-services/TopBannerSection';
import TimezoneBookingForm from '@/components/TimezoneBookingForm/TimezoneBookingForm';

export const metadata = {
  title: 'Thank You - magemonkeys',
};

export default function BookingPage() {
  return (
    <>
      <Header />
      <TopBannerSection title="Thank You" />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <TimezoneBookingForm />
      </div>

      <Footer />
    </>
  );
}
