import React from 'react';
import './ExpertDeveloperSection.css';

export default function ExpertDeveloperSection({ title, items = [] }) {
  return (
    <section className="are-expert">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="magento-ecommerce-box-content">
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
