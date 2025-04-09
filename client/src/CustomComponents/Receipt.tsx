'use client';
import Image from 'next/image';
import logo from '../../public/pv-logo.png';
import { useContextData } from '@/ContextProvider/Provider';
const Receipt = () => {
  const { receiptRef } = useContextData();
  return (
    <div
      ref={receiptRef}
      className='max-w-lg w-full bg-white shadow-xl rounded-lg p-6 relative'
    >
      <Image
        src={logo}
        alt='Patwary vila logo'
        width={1400}
        height={800}
        className='absolute top-0 right-0 left-0 bottom-0 h-full z-10 object-cover object-center opacity-20'
      />
      <div className='text-center mb-4 relative z-20'>
        <h2 className='text-lg font-bold'>Patwari Villa</h2>
        <p className='text-sm text-gray-600'>187/5/B/1, Matikata, Dewan Para</p>
        <p className='text-sm text-gray-600'>Phone: 01976-084208</p>
      </div>
      <h2 className='text-center text-xl font-bold text-red-600 relative z-20'>
        Rental Receipt
      </h2>
      <div className='border-t border-gray-300 pt-4 mt-2 relative z-20'>
        <div className='flex justify-between'>
          <span className='font-bold'>Receipt No:</span>
          <span className='text-gray-700'>383</span>
        </div>
        <div className='flex justify-between'>
          <span className='font-bold'>Date:</span>
          <span className='text-gray-700'>
            {String(new Date().getDate()).padStart(2, '0')}/
            {String(new Date().getMonth() + 1).padStart(2, '0')}/
            {String(new Date().getFullYear()).slice(-2)}
          </span>
        </div>
      </div>
      <div className='mt-4 relative z-20'>
        <div className='flex justify-between'>
          <span className='font-bold'>Tenant Name:</span>
          <span className='text-gray-700'>Ismail Hossain</span>
        </div>
        <div className='flex justify-between'>
          <span className='font-bold'>Flat No:</span>
          <span className='text-gray-700'>A-1</span>
        </div>
        <div className='flex justify-between'>
          <span className='font-bold'>Month:</span>
          <span className='text-gray-700'>April</span>
        </div>
        <div className='flex justify-between'>
          <span className='font-bold'>Rent Amount:</span>
          <span className='text-gray-700'>5000/-</span>
        </div>
        <div className='flex justify-between'>
          <span className='font-bold'>Advanced Amount:</span>
          <span className='text-gray-700'>2000/-</span>
        </div>
        <div className='flex justify-between'>
          <span className='font-bold'>Gas Bill:</span>
          <span className='text-gray-700'>-</span>
        </div>
        <div className='flex justify-between'>
          <span className='font-bold'>Water Bill:</span>
          <span className='text-gray-700'>500/-</span>
        </div>
        <div className='flex justify-between'>
          <span className='font-bold'>Others:</span>
          <span className='text-gray-700'>20/-</span>
        </div>
        <div className='flex justify-between border-t border-gray-300 mt-2 pt-2'>
          <span className='font-bold'>Total:</span>
          <span className='text-gray-800 font-bold'>5520/-</span>
        </div>
      </div>
      <div className='mt-6 text-right border-t border-gray-500 pt-2 relative z-20'>
        <span className='text-sm font-bold block pt-6'>Sharif Alaul</span>
        <span className='text-sm text-gray-700'>Owner</span>
      </div>
    </div>
  );
};

export default Receipt;
