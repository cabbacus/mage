'use client';

import React from 'react';
import './ServiceSection.css';

export default function ServicesSection({ services, sectionClass = 'new-store-service', sectionTitle, content='' }) {
  if (!services || services.length === 0) return null;

  return (
    <section className={sectionClass}>
      <div className="container">
        {sectionTitle?.trim() && (
          <div className="head-title">
            <div className='white-label-sr-desc'>
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          </div>
        )}
      </div>
      <div className="services-list-wrp">
        <div className="container">
          {sectionTitle?.trim() && (
            <div className="title">
              <h4 dangerouslySetInnerHTML={{ __html: sectionTitle }} />
            </div>
          )}
          <div className="row">
            <div className="grid-services">
              {services.map((service, idx) => (
                <div key={idx} className="service-list">
                  <h4>{service.title}</h4>
                  <div dangerouslySetInnerHTML={{ __html: service.description }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
