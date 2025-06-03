'use client';

import React from 'react';
import Image from 'next/image';
import './B2BPowerSection.css';

const B2BPowerSection = ({
  title = '',
  content = '',
  backgroundImage = '',
  listItems = [],
}) => {
  return (
    <section className="b2b-power">
      <div className="container">
        <div className="row">
          {/* Render background image only if backgroundImage prop exists */}
          {backgroundImage && (
            <div className="background-image">
              <Image src={backgroundImage} alt="B2B Background" width={500} height={500} priority />
            </div>
          )}

          <div className="b2b-power-content">
            {/* Render title only if exists */}
            {title && <h4 dangerouslySetInnerHTML={{ __html: title }} />}

            {/* Render content only if exists */}
            {content && <div dangerouslySetInnerHTML={{ __html: content }} />}

            {/* Render list only if listItems has elements */}
            {listItems.length > 0 && (
              <div className="list-style">
                <ul>
                  {listItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default B2BPowerSection;
