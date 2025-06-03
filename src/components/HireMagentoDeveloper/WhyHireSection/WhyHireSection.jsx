import React from 'react';
import Image from 'next/image';
import './WhyHireSection.css';

export default function WhyHireSection({ title, items = [] }) {
  return (
    <section className="why-hire">
      <div className="background-image">
        <Image src='/data/images/hire-magento-developer/why-hire.jpg' alt="B2B Background" width={500} height={500} priority />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="ecommerce-box-content">
              <h4 dangerouslySetInnerHTML={{ __html: title }} />
              <div className="list-style">
                <ul>
                  {items.map((item, idx) => (
                    <li key={idx} dangerouslySetInnerHTML={{ __html: item.title }} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
