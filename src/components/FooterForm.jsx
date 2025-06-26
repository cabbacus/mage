'use client';

import React, { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { getUserGeoData } from '@/utils/getUserCountry';
import { useRouter } from 'next/navigation';

const FooterForm = ({ formTitle = "Let’s initiate a discussion!!" }) => {
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

    // Anti-bot honeypot check
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
      console.log(result);
      if (!response.ok) {
        throw new Error(result.message || 'Form submission failed.');
      }

      // Save data to localStorage for thank-you page calendar (optional)
      localStorage.setItem('footerFormData', JSON.stringify(formData));

      // Reset the form
      setFormData({
        fullName: '',
        email: '',
        mobile: '',
        requirement: '',
        company: '',
      });

      // Redirect to thank-you page (optional)
      router.push('/thank-you');

    } catch (error) {
      console.error('Form submission error:', error);
      alert('Submission failed. Please try again later.');
    } finally {
      setSubmitting(false); // Hide loader
    }
  };


  return (
    <section className="footer-form-wrp text-center">
      <div className="container">
        <div className="footer-form-title">
          <h4 className="form-heading" dangerouslySetInnerHTML={{ __html: formTitle }} />
          <p className="form-tagline">
            <span>With</span> Only Agency that provides a 24/7 emergency support.
          </p>
        </div>
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
                placeholder="Full Name"
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
                placeholder="Email Address"
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
                placeholder="Mobile Number"
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
                placeholder="Tell us about your requirement"
              />
            </div>

            {/* Honeypot field */}
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
                Schedule a call
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default FooterForm;
