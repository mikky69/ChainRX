'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ProgressBar from '@/components/ProgressBar';
import { researchInterests, type ResearchInterest, type ResearcherFormData } from '@/types/researcher';

const steps = [
  'Personal Information',
  'Institutional Information',
  'Research Interests',
  'Review & Submit'
];

export default function ResearcherOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ResearcherFormData>({
    fullName: '',
    email: '',
    phone: '',
    institution: '',
    department: '',
    researchFocus: '',
    yearsOfExperience: '',
    orcidId: '',
    areasOfInterest: [],
    researchDescription: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ResearcherFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const interests = checked
        ? [...prev.areasOfInterest, value as ResearchInterest]
        : prev.areasOfInterest.filter(item => item !== value);
      
      return { ...prev, areasOfInterest: interests };
    });
    
    // Clear any previous errors
    if (errors.areasOfInterest) {
      setErrors(prev => ({ ...prev, areasOfInterest: undefined }));
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/researcher/onboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/researcher/dashboard');
      } else {
        console.error('Failed to submit researcher information');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="John Doe"
                  required
                  aria-required="true"
                  {...(errors.fullName ? { 'aria-invalid': 'true', 'aria-describedby': 'fullName-error' } : {})}
                />
                {errors.fullName && (
                  <p id="fullName-error" className="mt-1 text-sm text-red-600">
                    {errors.fullName}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="john.doe@example.com"
                  required
                  aria-required="true"
                  inputMode="email"
                  autoComplete="email"
                  {...(errors.email ? { 'aria-invalid': 'true', 'aria-describedby': 'email-error' } : {})}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                  inputMode="tel"
                  autoComplete="tel"
                  aria-describedby="phone-help"
                />
                <p id="phone-help" className="mt-1 text-xs text-gray-500">
                  Optional. Include country code for international numbers.
                </p>
              </div>
              <div>
                <label htmlFor="orcidId" className="block text-sm font-medium text-gray-700 mb-1">
                  ORCID iD
                </label>
                <input
                  type="text"
                  id="orcidId"
                  name="orcidId"
                  value={formData.orcidId}
                  onChange={handleChange}
                  placeholder="0000-0000-0000-0000"
                  pattern="\d{4}-\d{4}-\d{4}-\d{3}[0-9X]"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  aria-describedby="orcid-help"
                />
                <p id="orcid-help" className="mt-1 text-xs text-gray-500">
                  Your 16-digit ORCID iD in the format XXXX-XXXX-XXXX-XXXX
                </p>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Institutional Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-1">
                  Institution <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="institution"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="University of Example"
                  required
                  aria-required="true"
                  {...(errors.institution ? { 'aria-invalid': 'true', 'aria-describedby': 'institution-error' } : {})}
                />
                {errors.institution && (
                  <p id="institution-error" className="mt-1 text-sm text-red-600">
                    {errors.institution}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., Department of Pharmacology"
                  aria-describedby="department-help"
                />
                <p id="department-help" className="mt-1 text-xs text-gray-500">
                  Your department or research group (if applicable)
                </p>
              </div>
              <div>
                <label htmlFor="researchFocus" className="block text-sm font-medium text-gray-700 mb-1">
                  Research Focus <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="researchFocus"
                  name="researchFocus"
                  value={formData.researchFocus}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., Drug Discovery, Clinical Trials, etc."
                  required
                  aria-required="true"
                  {...(errors.researchFocus ? { 'aria-invalid': 'true', 'aria-describedby': 'researchFocus-error' } : {})}
                />
                {errors.researchFocus && (
                  <p id="researchFocus-error" className="mt-1 text-sm text-red-600">
                    {errors.researchFocus}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700 mb-1">
                  Years of Research Experience <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="yearsOfExperience"
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                  min="0"
                  max="50"
                  step="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="5"
                  required
                  aria-required="true"
                  {...(errors.yearsOfExperience ? { 'aria-invalid': 'true', 'aria-describedby': 'experience-error' } : {})}
                />
                {errors.yearsOfExperience && (
                  <p id="experience-error" className="mt-1 text-sm text-red-600">
                    {errors.yearsOfExperience}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Research Interests</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Areas of Interest (Select all that apply)</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    'Clinical Trials',
                    'Pharmacology',
                    'Drug Development',
                    'Genomics',
                    'Public Health',
                    'Epidemiology',
                    'Health Informatics',
                    'Other'
                  ].map((interest) => (
                    <label key={interest} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="areasOfInterest"
                        value={interest}
                        checked={formData.areasOfInterest.includes(interest)}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Research Description</label>
                <textarea
                  name="researchDescription"
                  value={formData.researchDescription}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Please describe your current research focus and objectives..."
                  required
                />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Review Your Information</h2>
            <div className="bg-gray-50 p-6 rounded-lg text-left">
              <h3 className="font-medium text-gray-900 mb-4">Personal Information</h3>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-2 text-sm">
                <div className="flex">
                  <dt className="w-1/3 text-gray-500">Full Name:</dt>
                  <dd className="text-gray-900">{formData.fullName}</dd>
                </div>
                <div className="flex">
                  <dt className="w-1/3 text-gray-500">Email:</dt>
                  <dd className="text-gray-900">{formData.email}</dd>
                </div>
                <div className="flex">
                  <dt className="w-1/3 text-gray-500">Phone:</dt>
                  <dd className="text-gray-900">{formData.phone}</dd>
                </div>
                <div className="flex">
                  <dt className="w-1/3 text-gray-500">ORCID iD:</dt>
                  <dd className="text-gray-900">{formData.orcidId || 'Not provided'}</dd>
                </div>
              </dl>

              <h3 className="font-medium text-gray-900 mt-6 mb-4">Institutional Information</h3>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-2 text-sm">
                <div className="flex">
                  <dt className="w-1/3 text-gray-500">Institution:</dt>
                  <dd className="text-gray-900">{formData.institution}</dd>
                </div>
                <div className="flex">
                  <dt className="w-1/3 text-gray-500">Department:</dt>
                  <dd className="text-gray-900">{formData.department}</dd>
                </div>
                <div className="flex">
                  <dt className="w-1/3 text-gray-500">Research Focus:</dt>
                  <dd className="text-gray-900">{formData.researchFocus}</dd>
                </div>
                <div className="flex">
                  <dt className="w-1/3 text-gray-500">Years of Experience:</dt>
                  <dd className="text-gray-900">{formData.yearsOfExperience}</dd>
                </div>
              </dl>

              <h3 className="font-medium text-gray-900 mt-6 mb-4">Research Interests</h3>
              <div className="text-sm">
                <p className="text-gray-500 mb-2">Areas of Interest:</p>
                <div className="flex flex-wrap gap-2">
                  {formData.areasOfInterest.length > 0 ? (
                    formData.areasOfInterest.map((interest) => (
                      <span key={interest} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {interest}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">No areas selected</span>
                  )}
                </div>
                <div className="mt-4">
                  <p className="text-gray-500 mb-1">Research Description:</p>
                  <p className="text-gray-900 whitespace-pre-line">{formData.researchDescription || 'No description provided'}</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Please review your information before submitting. You can go back to make changes if needed.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Researcher Onboarding</h1>
          <p className="mt-2 text-sm text-gray-600">
            Complete your profile to access research tools and data
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="mb-8">
            <ProgressBar 
              currentStep={currentStep}
              totalSteps={steps.length}
              label={`Step ${currentStep} of ${steps.length}`}
              variant="primary"
              size="lg"
              showStepNumbers
              showPercentage
              className="mb-4"
            />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              {renderStep()}
            </div>

            <div className="flex justify-between pt-6 border-t border-gray-200">
              <div>
                {currentStep === 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Back
                  </button>
                )}
              </div>
              <div>
                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Submit Application
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>Already have an account?{' '}
            <Link href="/login" className="text-primary hover:text-primary/80 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
