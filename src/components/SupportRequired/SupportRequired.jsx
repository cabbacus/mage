'use client';

import React, { useState } from 'react';
import './SupportRequired.css';
import Image from 'next/image';
import Form from '@/components/Form';

export default function SupportRequired({
  form_title = '',
  support_required_heading='',
  form_shortcode = '',
  support_required = [],
}) {
  const [modalTitle, setModalTitle] = useState('');
  const [showModal, setShowModal] = useState(false);

  const openModal = (title) => {
    setModalTitle(title || form_title);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalTitle('');
  };

  return (
    <>
      <section className="for-general-support">
        <div className="container">
          <div className="general-support-wrp">
            <h4>{support_required_heading}</h4>
            <div className="box-grid-wrp">
              {support_required.map((item, idx) => (
                <a key={idx} className="support-box" href="#" onClick={(e) => { e.preventDefault(); openModal(item.gs_image_text); }} >
                  <Image src={`/data/images/24-7-magento-critical-general-support/g-support${idx+1}.png`} alt={item.gs_image_text} width={85} height={90} />
                  <h6>{item.gs_image_text}</h6>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {showModal && (
        <>
          <div className="general-support-modal">
            <div className="modal-content">
              <div className="modal-body">
                <h5>{modalTitle}</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
                <div className="contact-wrap">
                  <Form />
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop" onClick={closeModal}></div>
        </>
      )}
    </>
  );
}
