import React from 'react';
import Link from 'next/link';
import { FaTwitter, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ChainRX</h3>
            <p className="text-gray-400">
              Transforming healthcare through innovative technology and collaboration.
            </p>
            <div className="flex space-x-4 mt-4">
              <a 
                href="https://twitter.com/chainrx" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Follow us on Twitter"
                title="Follow us on Twitter"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a 
                href="https://linkedin.com/company/chainrx" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Connect with us on LinkedIn"
                title="Connect with us on LinkedIn"
              >
                <FaLinkedin className="text-xl" />
              </a>
              <a 
                href="https://github.com/chainrx" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="View our GitHub repository"
                title="View our GitHub repository"
              >
                <FaGithub className="text-xl" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">For You</h4>
            <ul className="space-y-2">
              <li><Link href="/patient" className="text-gray-400 hover:text-white transition-colors">Patients</Link></li>
              <li><Link href="/pharmacist" className="text-gray-400 hover:text-white transition-colors">Pharmacists</Link></li>
              <li><Link href="/researcher" className="text-gray-400 hover:text-white transition-colors">Researchers</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="/documentation" className="text-gray-400 hover:text-white transition-colors">Documentation</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 rounded-l-lg focus:outline-none text-gray-900 w-full"
              />
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-lg transition-colors"
                aria-label="Subscribe to newsletter"
                title="Subscribe to our newsletter"
              >
                <span className="sr-only">Subscribe</span>
                <FaEnvelope aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">© {currentYear} ChainRX. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
