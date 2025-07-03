'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ProgressBar from '@/components/ProgressBar';

export default function PharmacistOnboarding() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    licenseNumber: '',
    pharmacyName: '',
    pharmacyAddress: '',
    yearsOfExperience: '',
    specialization: '',
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (e.g., API call)
    console.log('Pharmacist form submitted:', formData);
    // Redirect to dashboard after submission
    router.push('/pharmacist/dashboard');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter your full name"
                  aria-labelledby="fullNameLabel"
                  required
                />
                <span id="fullNameLabel" className="sr-only">Full Name</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter your email address"
                  aria-labelledby="emailLabel"
                  required
                />
                <span id="emailLabel" className="sr-only">Email Address</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter your phone number"
                  aria-labelledby="phoneLabel"
                  required
                />
                <span id="phoneLabel" className="sr-only">Phone Number</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
                <input
                  type="text"
                  name="licenseNumber"
                  id="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter your license number"
                  aria-labelledby="licenseNumberLabel"
                  required
                />
                <span id="licenseNumberLabel" className="sr-only">License Number</span>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Professional Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pharmacy Name</label>
                <input
                  type="text"
                  name="pharmacyName"
                  id="pharmacyName"
                  value={formData.pharmacyName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter pharmacy name"
                  aria-labelledby="pharmacyNameLabel"
                  required
                />
                <span id="pharmacyNameLabel" className="sr-only">Pharmacy Name</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                <input
                  type="number"
                  name="yearsOfExperience"
                  id="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                  min="0"
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter years of experience"
                  aria-labelledby="yearsOfExperienceLabel"
                  required
                />
                <span id="yearsOfExperienceLabel" className="sr-only">Years of Experience</span>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Pharmacy Address</label>
                <input
                  type="text"
                  name="pharmacyAddress"
                  id="pharmacyAddress"
                  value={formData.pharmacyAddress}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter pharmacy address"
                  aria-labelledby="pharmacyAddressLabel"
                  required
                />
                <span id="pharmacyAddressLabel" className="sr-only">Pharmacy Address</span>
              </div>
              <div>
                <label id="specializationLabel" className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                <select
                  name="specialization"
                  id="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  aria-labelledby="specializationLabel"
                  required
                >
                  <option value="">Select specialization</option>
                  <option value="general">General Pharmacy</option>
                  <option value="clinical">Clinical Pharmacy</option>
                  <option value="oncology">Oncology Pharmacy</option>
                  <option value="pediatrics">Pediatric Pharmacy</option>
                  <option value="geriatrics">Geriatric Pharmacy</option>
                  <option value="psychiatric">Psychiatric Pharmacy</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">Review Your Information</h2>
            <div className="bg-gray-50 p-6 rounded-lg text-left space-y-4">
              <div>
                <h3 className="font-semibold">Personal Information</h3>
                <p>Name: {formData.fullName}</p>
                <p>Email: {formData.email}</p>
                <p>Phone: {formData.phone}</p>
                <p>License Number: {formData.licenseNumber}</p>
              </div>
              <div>
                <h3 className="font-semibold">Professional Information</h3>
                <p>Pharmacy: {formData.pharmacyName}</p>
                <p>Experience: {formData.yearsOfExperience} years</p>
                <p>Address: {formData.pharmacyAddress}</p>
                <p>Specialization: {formData.specialization || 'Not specified'}</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-secondary">Pharmacist Onboarding</h1>
          <p className="mt-2 text-gray-600">Complete your professional profile to get started</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md">
          <ProgressBar 
            currentStep={step} 
            totalSteps={3} 
            label="Onboarding Progress" 
          />

          <form onSubmit={handleSubmit}>
            {renderStep()}
            
            <div className="mt-8 flex justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Back
                </button>
              ) : (
                <Link 
                  href="/" 
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 inline-block"
                >
                  Cancel
                </Link>
              )}
              
              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
