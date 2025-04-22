'use client';

import { postToDB } from '@/api';
import { useContextData } from '@/ContextProvider/Provider';
import { BasicInfo, ReceiptData, Tenant } from '@/interfaces/interface';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

const Receipt = () => {
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const { receiptRef, base_url, basicInfo } = useContextData();
  const [loading, setLoading] = useState(true);
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const storedReceiptInfo = localStorage.getItem('receiptInfo');
      if (storedReceiptInfo) {
        const parsedReceiptInfo = JSON.parse(storedReceiptInfo);

        const result = await postToDB(`${base_url}/receipt/create-receipt`, {
          receipt: {
            tenantId: parsedReceiptInfo.tenantId,
            rentAmountPaid: +parsedReceiptInfo.totalPaid,
            paymentMethod: parsedReceiptInfo.paymentMethod,
          },
        });

        console.log(result);
        if (result.success) {
          setTenant(result.data.tenantId);
          setReceiptData(result.data);
          toast.success(result.message, {
            id: result.data.receiptId,
          });
          setLoading(false);
        } else {
          toast.error(result.message, {
            id: result.data.receiptId,
          });
          setLoading(false);
        }
      } else {
        toast.error('No receipt information found.');
        setLoading(false);
      }
    };

    fetchData();
  }, [base_url]);

  if (!receiptData || !tenant || loading) {
    return <Skeleton />;
  }

  const { ownerName, streetAddress, phoneNumber, ownerSignatureUrl } =
    basicInfo as BasicInfo;

  const {
    receiptId,
    generatedReceiptDate,
    rentMonth,
    rentAmountPaid,
    balanceDue,
    unitId,
    tenantId,
    paymentMethod,
    totalAmount,
  } = receiptData;

  const { name: flatNo, gasBill, waterBill, others } = unitId;
  const { name: tenantName } = tenantId;

  const date = new Date(generatedReceiptDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const amountPaid = rentAmountPaid;

  const noteMessage =
    balanceDue > 0
      ? `Note: Payment received partially. Balance due ৳${balanceDue.toLocaleString()}.`
      : 'Note: Payment received in full for the mentioned period including utilities.';

  return (
    <div
      ref={receiptRef}
      className='max-w-xl mx-auto p-6 border rounded shadow bg-white text-gray-700 relative'
    >
      {/* Header */}
      <div className='text-center mb-6'>
        <h1 className='text-2xl font-bold'>Rent Receipt</h1>
        <p>Owner Name: {ownerName}</p>
        <p>Address: {streetAddress}</p>
        <p className='text-sm text-gray-600'>Phone: {phoneNumber}</p>
      </div>

      {/* Receipt Info */}
      <div className='flex justify-between mb-4'>
        <div>
          <p>
            <span className='font-semibold'>Receipt No:</span> {receiptId}
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
            <span className='font-semibold'>Flat No:</span> {flatNo}
          </p>
        </div>
      </div>

      {/* Payment Details */}
      <div className='border-t border-b py-4 mb-4 space-y-2'>
        <div className='flex justify-between'>
          <span>Rent for {rentMonth}:</span>
          <span>{rentAmountPaid?.toLocaleString()}</span>
        </div>
        <div className='flex justify-between'>
          <span>Gas Bill:</span>
          <span>{gasBill?.toLocaleString()}</span>
        </div>
        <div className='flex justify-between'>
          <span>Water Bill:</span>
          <span>{waterBill?.toLocaleString()}</span>
        </div>
        <div className='flex justify-between'>
          <span>Others:</span>
          <span>
            {others?.toString() === '0' ? '-' : others?.toLocaleString()}
          </span>
        </div>
        <div className='flex justify-between font-semibold'>
          <span>Total Amount:</span>
          <span>{totalAmount?.toLocaleString()}</span>
        </div>
        <div className='flex justify-between'>
          <span>Amount Paid:</span>
          <span>{amountPaid?.toLocaleString()}</span>
        </div>
        <div className='flex justify-between'>
          <span>Payment Method:</span>
          <span>{paymentMethod}</span>
        </div>
        <div className='flex justify-between'>
          <span>Balance Due:</span>
          <span>
            {balanceDue?.toString() === '0'
              ? '-'
              : balanceDue?.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Notes */}
      <div className='mb-4 text-sm'>
        <p>{noteMessage}</p>
        <p className='italic'>Thank you for your payment.</p>
      </div>

      {/* Signature */}
      <Image
        src={ownerSignatureUrl}
        alt='Signature'
        width={300}
        height={200}
        className='w-24 absolute'
        style={{
          mixBlendMode: 'multiply',
          filter: 'brightness(0) invert(0)',
        }}
      />
      <div className='flex justify-between items-center mt-6 gap-8'>
        <div className='relative'>
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
