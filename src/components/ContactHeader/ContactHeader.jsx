'use client';

import path from 'path';
import React, { useState, useEffect } from 'react';
import './ContactHeader.css';
import Image from 'next/image';
import GeoFlag from '@/components/GeoFlag';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [siteDetails, setSiteDetails] = useState({ title_india: '', email_address: '', phone: '', flag_tooltip: '' });
  const [menuItems, setMenuItems] = useState([]);
  const [activeParentId, setActiveParentId] = useState(null);

  // Fetching the file data on client side
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/data/header-data.json');
      const json = await res.json();
      setSiteDetails(json.siteDetails);
      setMenuItems(json.menuItems);
    };

    fetchData();
  }, []);

  const toggleNavbar = () => {
    setMenuOpen(!menuOpen);
  };

  const handleParentClick = (e, item) => {
    if (item.child_items?.length > 0) {
        e.preventDefault();
        setActiveParentId((prevId) => (prevId === item.ID ? null : item.ID));
    }
  };

  return (
    <>
      <div className="top-header">
        <div className="container">
          <p>{siteDetails.title_india}</p>
          <ul className="desktop-view-only">
            <li className="mobile">
              <a href="tel:+17867538773">
                <span>
                  <Image src="/images/icons/head-call.svg" alt="Call Icon" width={13} height={13} />
                </span>
                <p>+91 91 0636 5362</p>
              </a>
            </li>
            <li className="email">
              <a href={`mailto:${siteDetails.email_address}`}>
                <span>
                  <Image src="/images/icons/head-mail.svg" alt="Mail Icon" width={16} height={11} />
                </span>
                <p>{siteDetails.email_address}</p>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <header id="myHeader masthead" className="site-header">
        <nav className="navbar navbar-expand-lg navbar-light p-0">
          <div className="container">
            <div className="navbar-header">
              <h1 className="logo">
                <a href="/" aria-label="site-logo" rel="noopener" className="navbar-brand">
                  <Image src="/images/logo.png" alt="MageMonkeys" width={271} height={178} />
                </a>
              </h1>
              <p className="logo-tagline">Official Magento Solution Partner</p>
              <div className="flg_img">
                <GeoFlag defaultTooltip={siteDetails.flag_tooltip || 'Magento'} />
              </div>
            </div>

            <ul className="mobile-view-only">
              <li className="cnt_in">
                <a href={`tel:${siteDetails.phone}`}>
                  <span>
                    <Image src="/images/icons/c-head-call.svg" alt="Call Icon" width={24} height={24} />
                  </span>
                </a>
              </li>
              <li className="cnt_in">
                <a href={`mailto:${siteDetails.email_address}`}>
                  <span>
                    <Image src="/images/icons/c-head-mail.svg" alt="Mail Icon" width={24} height={24} />
                  </span>
                </a>
              </li>
            </ul>

            <button  className={`menu-toggle ${menuOpen ? 'active' : ''}`}  type="button" onClick={toggleNavbar}>
              <img src={menuOpen ? "/images/icons/toggle-close-icon.svg" : "/images/icons/toggle-icon.svg"} alt={menuOpen ? "close-icon" : "toggle-icon"} width={26} height={26} />
            </button>

            <div className={`main-menu ${menuOpen ? 'show' : ''}`} id="navbarSupportedContent">
              <div className="menu-header">
                <ul id="menu-top-menu" className="menu-ul">
                    {menuItems.map((item) => (
                        <li
                        key={item.ID}
                        className={`menu-item menu-item-${item.ID} ${item.child_items?.length > 0 ? 'has-children' : ''} ${activeParentId === item.ID ? 'submenu-open' : ''}`}
                        >
                        <a href={item.url} onClick={(e) => handleParentClick(e, item)}>
                            {item.title}
                        </a>

                        {item.child_items?.length > 0 && activeParentId === item.ID && (
                            <ul className="sub-menu">
                            {item.child_items.map((child) => (
                                <li key={child.ID} className={`menu-item menu-item-${child.ID}`}>
                                <a href={child.url} dangerouslySetInnerHTML={{ __html: child.title }} />
                                </li>
                            ))}
                            </ul>
                        )}
                        </li>
                    ))}
                </ul>

              </div>
              <a target="_blank" className="businessemeet" href="/website-audit/" >FREE Website Audit</a>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
