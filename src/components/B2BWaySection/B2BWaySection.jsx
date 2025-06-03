'use client';

import React from 'react';
import Image from 'next/image';
import './B2BWaySection.css';

const B2BWaySection = ({
  title = 'Mage Monkeys Way',
  content = 'Mage Monkeys offers you a fully customized and easy-to-implement B2B digital commerce store to help you switch your wholesale business online in no time.',
  imageSrc = '/data/images/magento-enterprise-b2b-solution/b2b-way.png',
}) => {
  return (
    <section className="b2b-way">
      <div className="b2b-way-content">
        <div className="way-img">
          <Image
            src={imageSrc}
            alt="B2B Way"
            width={500}
            height={500}
          />
        </div>
        <div className="way-content">
          <div className="rgtsc">
            <h4 dangerouslySetInnerHTML={{ __html: title }} />
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default B2BWaySection;
