'use client';

import { useState, useEffect } from 'react';
import {
  format,
  addMinutes,
  startOfDay,
  setHours,
  setMinutes,
  isAfter,
} from 'date-fns';

export default function TimezoneBookingForm() {
  const [selectedDate, setSelectedDate] = useState(() => startOfDay(new Date()));
  const [selectedTime, setSelectedTime] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function getNowInTimeZone(timeZone) {
    try {
      const localString = new Date().toLocaleString('en-US', { timeZone });
      return new Date(localString);
    } catch {
      return new Date(); // fallback
    }
  }

  useEffect(() => {
    const slots = [];
    const startHour = 16;
    const startMinute = 30;
    const endHour = 23;
    const endMinute = 30;

    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const now = getNowInTimeZone(userTimeZone);

    let slotDate = setMinutes(setHours(selectedDate, startHour), startMinute);
    const endDate = setMinutes(setHours(selectedDate, endHour), endMinute);

    const isToday =
      selectedDate.getFullYear() === now.getFullYear() &&
      selectedDate.getMonth() === now.getMonth() &&
      selectedDate.getDate() === now.getDate();

    while (
      isAfter(endDate, slotDate) ||
      format(slotDate, 'HH:mm') === format(endDate, 'HH:mm')
    ) {
      if (!isToday || isAfter(slotDate, now)) {
        slots.push(format(slotDate, 'h:mm aa'));
      }
      slotDate = addMinutes(slotDate, 30);
    }

    setTimeSlots(slots);
    setSelectedTime('');
  }, [selectedDate]);

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select both a date and time.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  const todayISO = new Date().toISOString().split('T')[0];
  const selectedDateISO = format(selectedDate, 'yyyy-MM-dd');

  return (
    <div className="space-y-6">
      {!submitted ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="contact_date" className="block mb-2 text-sm font-medium text-gray-700">
                Select a Date:
              </label>
              <input
                type="date"
                id="contact_date"
                name="contact_date"
                className="w-full border border-gray-300 rounded-lg p-2 text-gray-700"
                min={todayISO}
                value={selectedDateISO}
                onChange={(e) => setSelectedDate(startOfDay(new Date(e.target.value)))}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Select a Time:</label>
              <ul className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto border border-gray-300 p-2 rounded-lg bg-white">
                {timeSlots.length === 0 && <li className="text-gray-500">No available time slots</li>}
                {timeSlots.map((slot, index) => (
                  <li key={index}>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="radio"
                        id={`contact_time-${index}`}
                        name="contact_time"
                        value={slot}
                        checked={selectedTime === slot}
                        onChange={() => setSelectedTime(slot)}
                        className="form-radio text-blue-600"
                      />
                      <span className="ml-2 text-gray-700">{slot}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-right">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}

            >
              {isSubmitting ? 'Booking...' : 'Book Now'}
            </button>
          </div>
        </>
      ) : (
        <div className="text-center text-green-600 text-lg font-medium">
          ✅ Your booking for {selectedTime} on {format(selectedDate, 'PPP')} has been submitted!
        </div>
      )}
    </div>
  );
}
