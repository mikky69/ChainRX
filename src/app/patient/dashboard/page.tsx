'use client';

import Link from 'next/link';

export default function PatientDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Patient Dashboard</h1>
          <div className="flex space-x-4">
            <Link 
              href="/patient/prescriptions"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              My Prescriptions
            </Link>
            <Link 
              href="/patient/profile"
              className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-gray-50"
            >
              My Profile
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link 
                href="/patient/prescriptions/upload"
                className="block p-3 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
              >
                Upload Prescription
              </Link>
              <Link 
                href="/patient/appointments"
                className="block p-3 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
              >
                Book Appointment
              </Link>
              <Link 
                href="/patient/health-records"
                className="block p-3 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
              >
                View Health Records
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="p-4 border-b">
                <div className="flex justify-between">
                  <span className="font-medium">Prescription Refill</span>
                  <span className="text-sm text-gray-500">2 hours ago</span>
                </div>
                <p className="text-sm text-gray-600">Your prescription for Ibuprofen has been refilled.</p>
              </div>
              <div className="p-4 border-b">
                <div className="flex justify-between">
                  <span className="font-medium">Appointment Confirmed</span>
                  <span className="text-sm text-gray-500">1 day ago</span>
                </div>
                <p className="text-sm text-gray-600">Your appointment with Dr. Smith has been confirmed for July 15, 2025.</p>
              </div>
              <div className="p-4">
                <div className="flex justify-between">
                  <span className="font-medium">New Prescription</span>
                  <span className="text-sm text-gray-500">3 days ago</span>
                </div>
                <p className="text-sm text-gray-600">Dr. Johnson has prescribed you Amoxicillin.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Token Balance */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Your $chAInRx Tokens</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-primary">1,250 <span className="text-lg font-normal">$chAInRx</span></p>
              <p className="text-sm text-gray-500">Earn more tokens by completing health goals</p>
            </div>
            <Link 
              href="/patient/rewards"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              View Rewards
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
