import React from 'react';
import './TopHeadingSection.css';

export default function TopHeadingSection({ topTitle, subTitle }) {
  return (
    <section className="magento-marketplace common-bg text-center">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <p dangerouslySetInnerHTML={{__html: topTitle}}></p>
            <br />
            <br />
            <p dangerouslySetInnerHTML={{ __html: subTitle}}></p>
          </div>
        </div>
      </div>
    </section>
  );
}
