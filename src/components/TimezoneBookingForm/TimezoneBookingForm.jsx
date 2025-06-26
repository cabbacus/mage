'use client';

import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useRouter } from 'next/navigation';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopBannerSection from '@/components/white-label-services/TopBannerSection';
import { Scrollbar } from 'react-scrollbars-custom';

export default function BookingForm() {
  const [timezone, setTimezone] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [slots, setSlots] = useState([]);
  const [userData, setUserData] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();

  const formatShortWeekday = (locale, date) => {
    const weekdayAbbreviations = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
    return weekdayAbbreviations[date.getDay()];
  };

  useEffect(() => {
    const buttons = document.querySelectorAll('.react-calendar__month-view__days__day');
    const container = document.querySelector('.react-calendar__month-view__days');
    if (!buttons.length || !container) return;

    container.querySelectorAll('.week-group').forEach(el => el.remove());

    for (let i = 0; i < buttons.length; i += 7) {
      const weekDiv = document.createElement('div');
      weekDiv.classList.add('week-group');
      for (let j = i; j < i + 7 && j < buttons.length; j++) {
        weekDiv.appendChild(buttons[j]);
      }
      container.appendChild(weekDiv);
    }
  });

  useEffect(() => {
    const geoString = localStorage.getItem('userGeoData');
    if (geoString) {
      try {
        const { data } = JSON.parse(geoString);
        setTimezone(data.timezone);
      } catch (e) {
        console.error('Failed to parse geoData:', e);
        setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
      }
    } else {
      setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    }

    const storedForm = localStorage.getItem('footerFormData');
    if (storedForm) {
      try {
        const parsedData = JSON.parse(storedForm);
        setUserData(parsedData);
      } catch (e) {
        console.error('Failed to parse footerFormData:', e);
        router.push('/');
      }
    } else {
      router.push('/');
    }

    setLoading(false);
  }, [router]);

  useEffect(() => {
    if (!selectedDate || !timezone) return;

    const start = new Date(selectedDate);
    start.setHours(10, 0, 0, 0);
    const end = new Date(selectedDate);
    end.setHours(24, 0, 0, 0);
    const now = new Date();
    const isToday = now.toDateString() === selectedDate.toDateString();

    const tempSlots = [];
    for (let d = new Date(start); d < end; d.setMinutes(d.getMinutes() + 30)) {
      const slotTime = new Date(d);
      if (isToday && slotTime <= now) continue;

      const label = slotTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: timezone,
      });

      tempSlots.push({ label, value: slotTime.toISOString() });
    }

    setSlots(tempSlots);
  }, [selectedDate, timezone]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTime) {
      alert('Please select a time slot.');
      return;
    }

    setSubmitting(true);

    const bookingDetails = {
      preferredDate: selectedDate.toISOString().split('T')[0],
      preferredTime: new Date(selectedTime).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: timezone,
      }),
      preferredTimezone: timezone,
    };

    const payload = {
      ...userData,
      ...bookingDetails,
    };

    try {
      const response = await fetch('https://demo.magemonkeys.com/wp-json/custom/v1/save-footer-form/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      await response.json();
      router.push('/thankyou'); // Redirect to thank-you page

    } catch (err) {
      console.error('Booking submission failed:', err);
      alert(`Failed to submit booking: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !timezone || !userData) {
    return;
  }

  return (
    <>
      <Header />
      <TopBannerSection title="Thank You" />

      <div className="managed_services_about thankyou">
        <div className="container">
          {submitting && (
            <div className="loader-overlay">
              <div className="loader"></div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <p>Please select the timings so we can connect with you at your convenience.</p>
            <div className="thk_sec">
              <div className="left_sec row">
                <div className="col-xs-12 col-sm-8">
                  <div className="contact-date hasDatepicker">
                    <Calendar
                      locale="en-US"
                      onChange={(date) => {
                        setSelectedDate(date);
                        setSelectedTime(null);
                      }}
                      value={selectedDate}
                      minDate={new Date()}
                      formatShortWeekday={formatShortWeekday}
                      view="month"
                      maxDetail="month"
                      next2Label={null}
                      prev2Label={null}
                      showNeighboringMonth={false}
                    />
                    <input type="hidden" name="contact_date" id="contact_date" value={selectedDate.toLocaleDateString('en-GB')} />
                  </div>
                </div>

                <div className="col-xs-12 col-sm-4">
                  <div className="tim_sec">
                    <ul className="radio-list-wrapper">
                      <Scrollbar>
                        {slots.length === 0 ? (
                          <li style={{ textAlign: 'center' }}>No slots available for this day.</li>
                        ) : (
                          slots.map((slot, index) => (
                            <li key={index}>
                              <input
                                type="radio"
                                id={`contact_time-${index}`}
                                name="contact_time"
                                value={slot.label}
                                checked={selectedTime === slot.value}
                                onChange={() => setSelectedTime(slot.value)}
                              />
                              <label htmlFor={`contact_time-${index}`} style={{ marginLeft: '0.5rem' }}>
                                {slot.label}
                              </label>
                            </li>
                          ))
                        )}
                      </Scrollbar>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <input type="hidden" name="fullName" value={userData.fullName} />
            <input type="hidden" name="email" value={userData.email} />
            <input type="hidden" name="mobile" value={userData.mobile} />
            <input type="hidden" name="requirement" value={userData.requirement} />

            <div className="action-btn">
              <button type="submit" className="common-btn">Submit</button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}
