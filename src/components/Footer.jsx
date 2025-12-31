import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Social Links */}
        <div className={styles.socialLinks}>
          <div className={styles.socialIcon}>FB</div>
          <div className={styles.socialIcon}>IG</div>
          <div className={styles.socialIcon}>TW</div>
          <div className={styles.socialIcon}>YT</div>
        </div>

        {/* Footer Links */}
        <div className={styles.footerLinks}>
          <div>
            <p>Audio Description</p>
            <p>Investor Relations</p>
            <p>Legal Notices</p>
          </div>
          <div>
            <p>Help Center</p>
            <p>Jobs</p>
            <p>Cookie Preferences</p>
          </div>
          <div>
            <p>Gift Cards</p>
            <p>Terms of Use</p>
            <p>Corporate Information</p>
          </div>
          <div>
            <p>Media Center</p>
            <p>Privacy</p>
            <p>Contact Us</p>
          </div>
        </div>

        {/* Service Code */}
        <div className={styles.serviceCode}>
          <button className={styles.serviceCodeButton}>
            Service Code
          </button>
        </div>

        {/* Copyright */}
        <p className={styles.copyright}>© 1997-2025 Netflix, Inc.</p>
      </div>
    </footer>
  );
};

export default Footer;
