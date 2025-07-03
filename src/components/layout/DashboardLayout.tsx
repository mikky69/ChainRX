import React from 'react';
import { Inter } from 'next/font/google';
import Header from './Header';
import Sidebar from './Sidebar';

const inter = Inter({ subsets: ['latin'] });

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'patient' | 'pharmacist' | 'researcher';
}

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
  return (
    <div className={`min-h-screen bg-gray-50 ${inter.className}`}>
      <Header role={role} />
      <div className="flex
       
       
        <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
