'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react'; // Optional icons
import './FAQ.css';

const FAQ = ({ title, faqs = [] }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="faq-section">
      <div className="container">
        <div className="faq-title">
          {title && <h4>{title}</h4>}
        </div>
        <div className="faq-items">
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;
            const answerId = `faq-answer-${index}`;

            return (
              <div className="faq-item" key={index}>
                <button type="button" className={`faq-question ${isActive ? 'active' : ''}`} onClick={() => toggleFAQ(index)} aria-expanded={isActive} >
                  <span>{faq.title}</span>
                </button>
                {isActive && (
                  <div className="faq-answer" role="region" aria-labelledby={`faq-question-${index}`}>
                    <p>{faq.description}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FAQ;