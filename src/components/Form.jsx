'use client';

import React, { useState, useEffect } from 'react';
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
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    requirement: '',
  });

  const [userCountry, setUserCountry] = useState('us');

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Replace with your API call or submission logic
  };

  return (
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

        <div className="col-xs-12 col-sm-12">
          <button type="submit" className="common-btn">
            {buttonLabel}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CustomForm;
