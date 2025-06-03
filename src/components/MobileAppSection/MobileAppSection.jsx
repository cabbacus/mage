'use client';

import React from 'react';
import Image from 'next/image';
import './MobileAppSection.css';

const MobileAppSection = ({
  title = '',
  description = '',
  image = '',
  cta_button = {
    button_label: '',
    button_internal_link: '',
    button_external_link: '',
  },
  pop_button = '',
  onPopupClick = () => {}, // Pass a function to handle popup click
}) => {
  const link = cta_button?.button_external_link || cta_button?.button_internal_link;

  return (
    <section className="mobile-app-middle-sec">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="mobile-app-inner">
              <div className="mobile-app-left">
                {title && <h4 dangerouslySetInnerHTML={{ __html: title }} />}
                
                {description && (
                  <div
                    className="content"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                )}

                {link && cta_button?.button_label && (
                  <a className="custom_btn info-button" href={link}>
                    {cta_button.button_label}
                  </a>
                )}

                {pop_button && (
                  <button
                    type="button"
                    className="custom_btn schedule"
                    onClick={onPopupClick}
                  >
                    {pop_button}
                  </button>
                )}
              </div>

              {image && (
                <div className="mobile-app-img">
                  <Image
                    src={image}
                    alt="Mobile App Image"
                    width={760}
                    height={500}
                    priority
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileAppSection;
