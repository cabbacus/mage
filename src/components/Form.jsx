'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { getUserGeoData } from '@/utils/getUserCountry';

const CustomForm = ({
  placeholders = {
    fullName: 'Full Name',
    email: 'Email Address',
    mobile: 'Mobile Number',
    requirement: 'Tell us about your requirement',
  },
  buttonLabel = 'Submit',
}) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    requirement: '',
    company: '', // Honeypot field
  });

  const [userCountry, setUserCountry] = useState('us');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadCountry = async () => {
      const geoData = await getUserGeoData();
      if (geoData?.country_code) {
        setUserCountry(geoData.country_code.toLowerCase());
      }
    };
    loadCountry();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMobileChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      mobile: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot spam protection
    if (formData.company?.trim()) {
      console.warn('Bot detected via honeypot field.');
      return;
    }

    setSubmitting(true); // Show Loader

    try {
      const response = await fetch('https://demo.magemonkeys.com/wp-json/custom/v1/save-footer-form/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Form submission failed.');
      }

      // Store data for thank-you page
      localStorage.setItem('footerFormData', JSON.stringify(formData));

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        mobile: '',
        requirement: '',
        company: '',
      });

      // Redirect to thank-you page
      router.push('/thank-you');
    } catch (err) {
      console.error('Submission failed:', err);
      alert('Something went wrong. Please try again later.');
    } finally {
      setSubmitting(false); // Hide loader
    }
  };

  return (
    <div>
      {submitting && (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="footer-form">
        <div className="row">
          <div className="col-xs-12 col-sm-4 input-box">
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              required
              autoComplete="name"
              className="form-control"
              placeholder={placeholders.fullName}
            />
          </div>

          <div className="col-xs-12 col-sm-4 input-box">
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className="form-control"
              placeholder={placeholders.email}
            />
          </div>

          <div className="col-xs-12 col-sm-4 input-box">
            <PhoneInput
              country={userCountry}
              value={formData.mobile}
              onChange={handleMobileChange}
              disableCountryCode={true}
              disableCountryGuess={true}
              inputProps={{
                name: 'mobile',
                required: true,
                id: 'mobile',
              }}
              inputStyle={{ width: '100%' }}
              placeholder={placeholders.mobile}
              containerClass="phone-input-container"
            />
          </div>

          <div className="col-xs-12 col-sm-12 input-box">
            <textarea
              id="requirement"
              name="requirement"
              rows={4}
              value={formData.requirement}
              onChange={handleChange}
              required
              className="form-control"
              placeholder={placeholders.requirement}
            />
          </div>

          {/* Honeypot field - hidden from users */}
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            style={{ display: 'none' }}
            tabIndex="-1"
            autoComplete="off"
          />

          <div className="col-xs-12 col-sm-12">
            <button type="submit" className="common-btn">
              {buttonLabel}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CustomForm;
