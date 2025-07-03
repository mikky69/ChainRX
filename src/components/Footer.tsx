"use client";

import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">chAInRx</h3>
            <p className="text-gray-600">
              Empowering patients, pharmacists, and researchers through blockchain technology.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">For Patients</h4>
            <ul className="space-y-3">
              <li><Link href="/patient/onboarding" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Get Started</Link></li>
              <li><Link href="/faq" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">FAQ</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Contact Support</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">For Pharmacists</h4>
            <ul className="space-y-2">
              <li><Link href="/pharmacist/onboarding" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Join Our Network</Link></li>
              <li><Link href="/resources" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Resources</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Contact Sales</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Terms of Service</Link></li>
              <li><Link href="/cookies" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className={styles.copyrightSection}>
          <div className={styles.copyrightOverlay}></div>
          <div className={styles.copyrightContent}>
            <p className="text-center text-white/90 text-sm">
              &copy; {currentYear} chAInRx. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
