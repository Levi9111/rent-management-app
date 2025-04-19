'use client';

import { getDataFromDB } from '@/api';
import { useContextData } from '@/ContextProvider/Provider';
import { Tenant } from '@/interfaces/interface';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

const Receipt = () => {
  // TODO: add a signature image of the owner
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const { receiptRef, base_url } = useContextData();
  const [receiptInfo, setReceiptInfo] = useState<{
    tenantId: string;
    totalPaid: number;
    paymentMethod: string;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const storedReceiptInfo = localStorage.getItem('receiptInfo');
      if (storedReceiptInfo) {
        const parsedReceiptInfo = JSON.parse(storedReceiptInfo);
        setReceiptInfo(parsedReceiptInfo);
        const result = await getDataFromDB(
          `${base_url}/tenant/${parsedReceiptInfo?.tenantId}`,
        );
        if (result.success) {
          setTenant(result.data);
        } else {
          toast.error(result.message);
        }
      } else {
        toast.error('No receipt information found.');
      }
    };

    fetchData();
  }, [base_url]);

  if (!tenant) {
    return <Skeleton />;
  }

  // Variables (fetching from tenant state)
  const ownerName = 'Alaul Hossein Md. Sharif';
  const ownerAddress = '187/5/B/1, Matikata, Dewan Para';
  const ownerPhone = '01976-084208';

  const receiptNo = `#${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(5, '0')}`; // Generate a random receipt number
  const date = new Date().toLocaleDateString('en-BD', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const tenantName = tenant.name || 'N/A';
  const flatNo = tenant.rentedUnit?.name || 'N/A';

  const rentAmount = tenant.rentedUnit?.monthlyRent || 0;
  const gasBill = tenant.rentedUnit?.gasBill || 0;
  const waterBill = tenant.rentedUnit?.waterBill || 0;
  const others = tenant.rentedUnit?.others || 0;

  const totalAmount = rentAmount + gasBill + waterBill + others;
  const amountPaid = receiptInfo?.totalPaid || 0;
  const paymentMethod = receiptInfo?.paymentMethod || 'Hand Cash';
  const balanceDue = totalAmount - amountPaid;

  // Note message based on balance
  const noteMessage =
    balanceDue > 0
      ? `Note: Payment received partially. Balance due ৳${balanceDue.toLocaleString()}.`
      : 'Note: Payment received in full for the mentioned period including utilities.';

  return (
    <div
      ref={receiptRef}
      className='max-w-xl mx-auto p-6 border rounded shadow bg-white text-gray-700'
    >
      {/* Header */}
      <div className='text-center mb-6'>
        <h1 className='text-2xl font-bold'>Rent Receipt</h1>
        <p>Owner Name: {ownerName}</p>
        <p>Address: {ownerAddress}</p>
        <p className='text-sm text-gray-600'>Phone: {ownerPhone}</p>
      </div>

      {/* Receipt Info */}
      <div className='flex justify-between mb-4'>
        <div>
          <p>
            <span className='font-semibold'>Receipt No:</span> {receiptNo}
          </p>
          <p>
            <span className='font-semibold'>Date:</span> {date}
          </p>
        </div>
        <div>
          <p>
            <span className='font-semibold'>Tenant Name:</span> {tenantName}
          </p>
          <p>
            <span className='font-semibold'>Flat No.:</span> {flatNo}
          </p>
        </div>
      </div>

      {/* Payment Details */}
      <div className='border-t border-b py-4 mb-4 space-y-2'>
        <div className='flex justify-between'>
          <span>
            Rent for{' '}
            {new Date().toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric',
            })}
            :
          </span>
          <span>{rentAmount.toLocaleString()}</span>
        </div>
        <div className='flex justify-between'>
          <span>Gas Bill:</span>
          <span>{gasBill.toLocaleString()}</span>
        </div>
        <div className='flex justify-between'>
          <span>Water Bill:</span>
          <span>{waterBill.toLocaleString()}</span>
        </div>
        <div className='flex justify-between'>
          <span>Others:</span>
          <span>
            {others.toString() === '0' ? '-' : others.toLocaleString()}
          </span>
        </div>
        <div className='flex justify-between'>
          <span>Total Amount:</span>
          <span>{totalAmount.toLocaleString()}</span>
        </div>
        <div className='flex justify-between'>
          <span>Amount Paid:</span>
          <span>{amountPaid.toLocaleString()}</span>
        </div>
        <div className='flex justify-between'>
          <span>Payment Method:</span>
          <span>{paymentMethod}</span>
        </div>
        <div className='flex justify-between'>
          <span>Balance Due:</span>
          <span>
            {balanceDue.toString() === '0' ? '-' : balanceDue.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Notes */}
      <div className='mb-4 text-sm'>
        <p>{noteMessage}</p>
        <p className='italic'>Thank you for your payment.</p>
      </div>

      {/* Signature */}
      <div className='flex justify-between items-center mt-6 gap-8'>
        <div>
          <p>-----------------------</p>
          <p className='text-sm'>Owner Signature</p>
        </div>
        <div>
          <p>-----------------------</p>
          <p className='text-sm'>Tenant Signature</p>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
