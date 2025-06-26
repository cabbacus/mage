import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import AnalyticsScripts from '@/components/AnalyticsScripts';
import Image from 'next/image';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}
        <div className="mobile-bottom-header">
          <div className="container">
            <ul className="desktop-view-only">
              <li className="cnt_in">
                <a href="tel:+91 9106365362">
                  <span><Image src="/images/icons/head-call.svg" width={13.4} height={13} alt="head-call" /></span>
                  <p>call us</p>
                </a>
              </li>
              <li className="cnt_in">
                <a href="mailto:contact@magemonkeys.com">
                  <span><Image src="/images/icons/head-mail.svg" width={16} height={11} alt="head-mail" /></span>
                  <p>email us</p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </body>
    </html>
  );
}
