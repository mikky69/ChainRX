'use client';

import Link from 'next/link';

export default function PharmacistDashboard() {
  const pendingPrescriptions = [
    { id: 'RX-1001', patient: 'John Doe', date: '2025-07-02', status: 'Pending' },
    { id: 'RX-1002', patient: 'Jane Smith', date: '2025-07-01', status: 'Pending' },
  ];

  const recentActivity = [
    { id: 'RX-1000', patient: 'Robert Johnson', date: '2025-06-30', status: 'Filled' },
    { id: 'RX-999', patient: 'Emily Davis', date: '2025-06-29', status: 'Filled' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-secondary">Pharmacist Dashboard</h1>
          <div className="flex space-x-4">
            <Link 
              href="/pharmacist/verify"
              className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90"
            >
              Verify Prescription
            </Link>
            <Link 
              href="/pharmacist/profile"
              className="px-4 py-2 border border-secondary text-secondary rounded-lg hover:bg-gray-50"
            >
              My Profile
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Stats */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Today's Overview</h2>
            <div className="space-y-4">
              <div>
                <p className="text-3xl font-bold text-secondary">12</p>
                <p className="text-sm text-gray-500">Prescriptions to fill</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-600">8</p>
                <p className="text-sm text-gray-500">Prescriptions filled</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-600">4</p>
                <p className="text-sm text-gray-500">Patient consultations</p>
              </div>
            </div>
          </div>

          {/* Pending Prescriptions */}
          <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Pending Prescriptions</h2>
              <Link 
                href="/pharmacist/prescriptions" 
                className="text-sm text-secondary hover:underline"
              >
                View All
              </Link>
            </div>
            
            {pendingPrescriptions.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prescription ID</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-2"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pendingPrescriptions.map((rx) => (
                      <tr key={rx.id}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{rx.id}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{rx.patient}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{rx.date}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            {rx.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                          <Link href={`/pharmacist/prescriptions/${rx.id}`} className="text-secondary hover:text-secondary/80">
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No pending prescriptions.</p>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
            <Link 
              href="/pharmacist/activity" 
              className="text-sm text-secondary hover:underline"
            >
              View All
            </Link>
          </div>
          
          {recentActivity.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prescription ID</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentActivity.map((rx) => (
                    <tr key={rx.id}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{rx.id}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{rx.patient}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{rx.date}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {rx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No recent activity.</p>
          )}
        </div>
      </div>
    </div>
  );
}
