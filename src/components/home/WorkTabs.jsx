'use client';
 
import { useState, useEffect } from 'react';
import '@/styles/WorkTabs.css';
import Image from 'next/image';
 
export default function WorkTabs({ workSections, middleCenterTitle }) {
  const [activeTab, setActiveTab] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
 
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    handleResize(); // initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
 
  return (
    <section className="solution-sec">
      <div className="container">
        <div className="main-title">
          <h5>{middleCenterTitle}</h5>
        </div>
 
        <div className="solution-tab">
          {/* Desktop Tabs */}
          {!isMobile && (
            <>
              <ul className="nav nav-tabs" role="tablist">
                {workSections.map((item, idx) => (
                  <li className="nav-item" key={idx}>
                    <button
                      className={`nav-link ${activeTab === idx ? 'active' : ''}`}
                      onClick={() => setActiveTab(idx)}
                    >
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
 
              <div className="tab-content">
                {workSections.map((item, idx) => (
                  <div
                    key={idx}
                    className={`tab-pane fade ${activeTab === idx ? 'show active' : ''}`}
                  >
                    <TabContent item={item} />
                  </div>
                ))}
              </div>
            </>
          )}
 
          {/* Mobile Accordion */}
          {isMobile && (
            <div className="accordion">
              {workSections.map((item, idx) => (
                <div className="accordion-item" key={idx}>
                  <div
                    className={`accordion-header ${activeTab === idx ? 'active' : ''}`}
                    onClick={() => setActiveTab(activeTab === idx ? -1 : idx)}
                  >
                    {item.title}
                  </div>
                  <div className={`accordion-body ${activeTab === idx ? 'show' : ''}`}>
                    <TabContent item={item} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
 
function TabContent({ item }) {
  return (
    <div className="tab-content-wrap">
      {item.image && (
        <div className="tab-content-left">
          <a href="#">
            <Image src={item.image} width={686} height={610} alt={item.title} />
          </a>
        </div>
      )}

      <div className="tab-content-right">
        <h5><a href="#">{item.title}</a></h5>
        <div dangerouslySetInnerHTML={{ __html: item.description }} />
        <div className="tab-btn-box">
          <a
            className="common-btn know-more"
            href={item.cta_link_button.button_external_link}
            target="_blank"
            rel="noreferrer"
          >
            {item.cta_link_button.button_label}
          </a>
          <a
            className="common-btn discuss"
            href={item.cta_link_button.button_external_link}
            target="_blank"
            rel="noreferrer"
          >
            Let's Discuss
          </a>
        </div>
      </div>
    </div>
  );
}