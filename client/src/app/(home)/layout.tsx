'use client';
import Sidebar from '@/CustomComponents/Sidebar';
import { ReactNode } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className='flex flex-col min-h-screen bg-gray-200 '>
      <div className='md:grid md:grid-cols-[max-content_1fr]'>
        {/* Sidebar */}
        <Sidebar />
        {/* Main Content */}
        <div className='flex-1 flex justify-center items-center p-6 pb-20 md:pb-6'>
          {children}
        </div>
      </div>
    </div>
  );
}
