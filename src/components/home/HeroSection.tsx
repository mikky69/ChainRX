import React from 'react';
import { BouncingIcon } from '../ui/BouncingIcon';
import { FaUserMd, FaFlask, FaUserInjured, FaArrowRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import styles from './HeroSection.module.css';

export const HeroSection = () => {
  const router = useRouter();

  const handleNavigate = (userType: string) => {
    router.push(`/${userType}/onboarding`);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
      {/* Background Image */}
      <div className={styles.backgroundImage} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Transforming Healthcare Through Innovation
          </h1>
          <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto">
            Join our platform to connect researchers, pharmacists, and patients in a collaborative healthcare ecosystem.
          </p>
          
          {/* Bouncing Icons */}
          <div className="flex flex-wrap justify-center gap-12 md:gap-20 mb-16">
            <div className="flex flex-col items-center cursor-pointer" onClick={() => handleNavigate('pharmacist')}>
              <BouncingIcon 
                icon={
                  <div className="bg-white p-6 rounded-full shadow-lg text-blue-600 text-4xl">
                    <FaUserMd />
                  </div>
                }
                delay={0.2}
              />
              <h3 className="mt-4 text-lg font-semibold text-gray-800">Pharmacists</h3>
              <p className="text-gray-600 text-sm mt-1">Manage medications and patient care</p>
            </div>

            <div className="flex flex-col items-center cursor-pointer" onClick={() => handleNavigate('researcher')}>
              <BouncingIcon 
                icon={
                  <div className="bg-white p-6 rounded-full shadow-lg text-green-600 text-4xl">
                    <FaFlask />
                  </div>
                }
                delay={0.4}
              />
              <h3 className="mt-4 text-lg font-semibold text-gray-800">Researchers</h3>
              <p className="text-gray-600 text-sm mt-1">Advance medical research</p>
            </div>

            <div className="flex flex-col items-center cursor-pointer" onClick={() => handleNavigate('patient')}>
              <BouncingIcon 
                icon={
                  <div className="bg-white p-6 rounded-full shadow-lg text-purple-600 text-4xl">
                    <FaUserInjured />
                  </div>
                }
                delay={0.6}
              />
              <h3 className="mt-4 text-lg font-semibold text-gray-800">Patients</h3>
              <p className="text-gray-600 text-sm mt-1">Access better healthcare</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => handleNavigate('/register')}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Get Started
            </button>
            <button 
              onClick={() => {
                const aboutSection = document.getElementById('about');
                aboutSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
