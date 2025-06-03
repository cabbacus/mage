import React from 'react';
import './SpecialNoteSection.css';

export default function SpecialNoteSection({ title, description, cta }) {
  return (
    <section className="special-note">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h4 dangerouslySetInnerHTML={{ __html: title }} />
            <div dangerouslySetInnerHTML={{ __html: description }} />
            <div className="cnt-us-now">
              <a className="custom_btn" href={cta.button_internal_link}>
                {cta.button_label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
