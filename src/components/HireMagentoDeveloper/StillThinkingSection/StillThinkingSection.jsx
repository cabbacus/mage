import React from 'react';
import Image from 'next/image';
import './StillThinkingSection.css';

export default function StillThinkingSection({ title, description, guaranteeTitle, guaranteeDescription }) {
  return (
    <section className="stile-thinking">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="stile-think-content">
              <h4>{title}</h4>
              <h5>
                {description}
                <Image src="/images/smile.png" alt="Smile Png" width={44} height={44} />
              </h5>
            </div>
            <div className="guarantee-content">
              <h4 dangerouslySetInnerHTML={{ __html: guaranteeTitle }} />
              <div dangerouslySetInnerHTML={{ __html: guaranteeDescription }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
