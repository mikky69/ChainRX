import React from 'react';
import { FaShieldAlt, FaUsers, FaChartLine, FaFlask } from 'react-icons/fa';

export const AboutSection = () => {
  const features = [
    {
      icon: <FaShieldAlt className="text-3xl text-blue-600 mb-4" />,
      title: 'Secure Platform',
      description: 'Your data is protected with enterprise-grade security measures and compliance with healthcare regulations.'
    },
    {
      icon: <FaUsers className="text-3xl text-green-600 mb-4" />,
      title: 'Collaborative Network',
      description: 'Connect with healthcare professionals and researchers to collaborate on improving patient outcomes.'
    },
    {
      icon: <FaChartLine className="text-3xl text-purple-600 mb-4" />,
      title: 'Data-Driven Insights',
      description: 'Access powerful analytics and reporting tools to drive better healthcare decisions.'
    },
    {
      icon: <FaFlask className="text-3xl text-red-600 mb-4" />,
      title: 'Research Focused',
      description: 'Contribute to cutting-edge medical research and access the latest findings in your field.'
    }
  ];

  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About ChainRX
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're revolutionizing healthcare by connecting researchers, pharmacists, and patients on a single, secure platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-center">
                {feature.icon}
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600 mb-6">
              At ChainRX, we believe that better healthcare outcomes are achieved through collaboration and data-driven insights. 
              Our platform bridges the gap between medical research and patient care, enabling seamless information sharing 
              and collaboration among healthcare professionals.
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span className="text-gray-600">HIPAA compliant platform</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span className="text-gray-600">End-to-end encrypted communications</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span className="text-gray-600">Real-time data synchronization</span>
              </li>
            </ul>
          </div>
          <div className="bg-gray-100 rounded-xl overflow-hidden h-96">
            <img 
              src="/images/healthcare-team.jpg" 
              alt="Healthcare team collaborating" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
