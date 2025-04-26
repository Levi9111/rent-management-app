'use client';

import { CustomModal } from '@/CustomComponents/Modal';
import Sidebar from '@/CustomComponents/Sidebar';
import { ReactNode, useState } from 'react';
import Link from 'next/link';

export default function HomeLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className='flex flex-col min-h-screen bg-gray-200 '>
      <div className='md:grid md:grid-cols-[max-content_1fr]'>
        {/* Sidebar */}
        <Sidebar setOpenModal={setOpenModal} />

        {/* Conditional Modal */}
        <CustomModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          isSmall={true}
        >
          <div className='text-center text-sm md:text-base text-gray-700'>
            Please go to{' '}
            <strong className='test-blue-600 hover:text-blue-800 transition duration-200'>
              <Link href='/new-receipt' onClick={() => setOpenModal(false)}>
                New Receipt
              </Link>
            </strong>{' '}
            and then click <strong>Create Receipt</strong> to download or send
            the receipt to the tenant.
          </div>
        </CustomModal>

        {/* Main Content */}
        <div className='flex-1 flex justify-center items-center p-6 pb-20 md:pb-6'>
          {children}
        </div>
      </div>
    </div>
  );
}
