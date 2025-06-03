'use client';

import React from 'react';
import './steps.css';
import Image from 'next/image';

const Steps = ({
  highlights_title = '',
  highlights_description = '',
  heading = '',
  sub_heading = '',
  steps = [],
  perform_sub_heading_title = '',
  perform_image = '',
  how_we_perform_title = '',
  how_we_perform_description = '',
  perform_repeater = []
}) => {
  return (
    <section className="migrate-to-magento">
      <div className="container">
        {/* Highlights Section */}
        {(highlights_title || highlights_description) && (
          <div className="highlights-steps">
            {highlights_title && (
              <h4 dangerouslySetInnerHTML={{ __html: highlights_title }} />
            )}
            {highlights_description && (
              <div dangerouslySetInnerHTML={{ __html: highlights_description }} />
            )}
          </div>
        )}

        {/* Main Heading and Subheading */}
        {(heading || sub_heading) && (
          <div className="head-title">
            {heading && <h4 dangerouslySetInnerHTML={{ __html: heading }} />}
            {sub_heading && <p dangerouslySetInnerHTML={{ __html: sub_heading }} />}
          </div>
        )}

        {/* Steps Timeline */}
        {Array.isArray(steps) && steps.length > 0 && (
          <div className="time-line">
            {steps.map((step, index) => (
              <div className="time-line-process" key={index}>
                <div className="process-num">
                  Step <span className="num-count">{index + 1}</span>
                </div>

                {(step.title || step.description) && (
                  <div className="service-list-content">
                    {step.title && <h4>{step.title}</h4>}
                    {step.description && (
                      <div dangerouslySetInnerHTML={{ __html: step.description }} />
                    )}
                  </div>
                )}

                {step.image && (
                  <div className="process-img">
                    <Image
                      src={step.image}
                      alt={step.title || `Step ${index + 1}`}
                      width={760}
                      height={500}
                      priority
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Perform Section */}
        {(perform_image || perform_sub_heading_title || how_we_perform_title || how_we_perform_description || (Array.isArray(perform_repeater) && perform_repeater.length > 0)) && (
          <div className="perform-it">
            {(perform_image || perform_sub_heading_title) && (
              <div className="banner-sect">
                {perform_image && (
                  <Image
                    src={perform_image}
                    alt="setting-img"
                    width={62}
                    height={56}
                    priority
                  />
                )}
                {perform_sub_heading_title && (
                  <p dangerouslySetInnerHTML={{ __html: perform_sub_heading_title }} />
                )}
              </div>
            )}

            {(how_we_perform_title || how_we_perform_description) && (
              <div className="perform-it-head">
                {how_we_perform_title && (
                  <h4>{how_we_perform_title}</h4>
                )}
                {how_we_perform_description && (
                  <p>{how_we_perform_description}</p>
                )}
              </div>
            )}

            {Array.isArray(perform_repeater) && perform_repeater.length > 0 && (
              <div className="perform-it-inner">
                {perform_repeater.map((p_repeater, index) => (
                  <div className="perform-it-left-right" key={index}>
                    {p_repeater.image && <img src={p_repeater.image} alt="" />}
                    {p_repeater.small_description && <p>{p_repeater.small_description}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Steps;
