'use client';

import { useContextData } from '@/ContextProvider/Provider';

const Home = () => {
  const { basicInfo } = useContextData();
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-white px-4 py-12 text-center'>
      {/* Welcome Section */}
      <div className='space-y-4 mb-10'>
        <h1 className='text-4xl md:text-5xl font-bold text-blue-800'>
          Welcome to {basicInfo?.villaName} 🏡
        </h1>
        <p className='text-lg md:text-xl text-gray-700 max-w-2xl mx-auto'>
          Manage your building’s rent, tenants, and receipts easily and
          efficiently. This platform is built to simplify rent management for
          {basicInfo?.villaName}.
        </p>
      </div>

      {/* Divider */}
      <div className='w-full max-w-sm border-t-2 border-blue-300 my-8' />

      {/* Owner Info */}
      <div className='bg-white shadow-xl rounded-2xl p-6 sm:p-8 max-w-sm w-full text-left transition-all duration-300 hover:shadow-2xl'>
        <h2 className='text-xl font-semibold text-blue-700 mb-4'>
          Owner Information
        </h2>
        <div className='space-y-2 text-gray-800'>
          <p>
            <span className='font-semibold'>Name:</span> {basicInfo?.ownerName}
          </p>
          <p>
            <span className='font-semibold'>Address:</span>{' '}
            {basicInfo?.streetAddress}
          </p>
          <p>
            <span className='font-semibold'>Phone:</span>{' '}
            {basicInfo?.phoneNumber}
          </p>
        </div>
      </div>

      {/* Footer */}
      <p className='text-sm text-gray-500 mt-12'>
        {basicInfo?.villaName} Rent Management © {new Date().getFullYear()}
      </p>
    </div>
  );
};

export default Home;
