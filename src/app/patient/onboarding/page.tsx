'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PatientOnboarding() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    medicalHistory: '',
    allergies: '',
    medications: '',
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    console.log('Form submitted:', formData);
    // Redirect to dashboard after submission
    router.push('/patient/dashboard');
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  id="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  aria-labelledby="dateOfBirthLabel"
                  required
                />
                <span id="dateOfBirthLabel" className="sr-only">Date of Birth</span>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Medical Information</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Medical History</label>
              <textarea
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleChange}
                rows={3}
                className="w-full p-2 border rounded-lg"
                placeholder="Any past medical conditions, surgeries, etc."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Allergies</label>
              <input
                type="text"
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                placeholder="List any allergies"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Medications</label>
              <input
                type="text"
                name="medications"
                value={formData.medications}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                placeholder="List current medications"
              />
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
                <p>Date of Birth: {formData.dateOfBirth}</p>
              </div>
              <div>
                <h3 className="font-semibold">Medical Information</h3>
                <p>Medical History: {formData.medicalHistory || 'None provided'}</p>
                <p>Allergies: {formData.allergies || 'None'}</p>
                <p>Current Medications: {formData.medications || 'None'}</p>
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
          <h1 className="text-3xl font-bold text-primary">Patient Onboarding</h1>
          <p className="mt-2 text-gray-600">Complete your profile to get started</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step >= i ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {i}
                  </div>
                  <span className="text-xs mt-1">
                    {i === 1 ? 'Personal' : i === 2 ? 'Medical' : 'Review'}
                  </span>
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-primary h-2.5 rounded-full transition-all duration-300 progress-bar"
                style={{ '--progress-width': `${(step / 3) * 100}%` } as React.CSSProperties}
              ></div>
            </div>
          </div>

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
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
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
