// components/AnalyticsScripts.jsx
'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export default function AnalyticsScripts() {
  useEffect(() => {
    // Save gclid to sessionStorage (mimicking PHP session)
    const urlParams = new URLSearchParams(window.location.search);
    const gclid = urlParams.get('gclid');
    if (gclid) {
      sessionStorage.setItem('gclid', gclid);
    }
  }, []);

  const gclid = typeof window !== 'undefined' && sessionStorage.getItem('gclid');

  return (
    <>
      {/* LinkedIn Insight */}
      <Script id="linkedin-insight" strategy="afterInteractive">
        {`
          _linkedin_partner_id = "7044626";
          window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
          window._linkedin_data_partner_ids.push(_linkedin_partner_id);
        `}
      </Script>
      <Script
        src="https://snap.licdn.com/li.lms-analytics/insight.min.js"
        strategy="afterInteractive"
      />

      {/* StatCounter */}
      <Script id="statcounter" strategy="lazyOnload">
        {`
          var sc_project = 11889984;
          var sc_invisible = 1;
          var sc_security = "33abedc5";
        `}
      </Script>
      <Script
        src="https://www.statcounter.com/counter/counter.js"
        strategy="lazyOnload"
      />

      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-Q6HEBEFLD8"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-Q6HEBEFLD8');
        `}
      </Script>

      {/* Microsoft Clarity – conditional */}
      {gclid && (
        <Script id="clarity" strategy="afterInteractive">
          {`
            (function (c, l, a, r, i, t, y) {
              c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
              t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
              y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
            })(window, document, "clarity", "script", "h5x1eegr48");
          `}
        </Script>
      )}

      {/* Tawk.to Chat */}
      <Script id="tawkto" strategy="lazyOnload">
        {`
          var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
          (function () {
            var s1 = document.createElement("script"),
              s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = 'https://embed.tawk.to/64e3443ccc26a871b0307634/1h8bs53js';
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin', '*');
            s0.parentNode.insertBefore(s1, s0);
          })();
          var removeBranding = function () {
            try {
              var iframe = document.querySelector("iframe[title*=chat]:nth-child(2)");
              if (iframe && iframe.contentDocument) {
                var el = iframe.contentDocument.querySelector("a[class*=tawk-branding]");
                if (el) el.remove();
              }
            } catch (e) {}
          };
          setInterval(removeBranding, 100);
        `}
      </Script>
    </>
  );
}
