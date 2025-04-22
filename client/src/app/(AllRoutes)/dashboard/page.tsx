'use client';

import { getDataFromDB } from '@/api';
import { useContextData } from '@/ContextProvider/Provider';
import { ReceiptData } from '@/interfaces/interface';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const Dashboard = () => {
  const [groupedReceipts, setGroupedReceipts] = useState<
    Record<string, Record<string, ReceiptData[]>>
  >({});
  const { base_url } = useContextData();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getDataFromDB(`${base_url}/receipt`);
      if (result?.data) {
        groupData(result.data);
        toast.success(result.message, {
          id: result.data._id,
        });
      } else {
        toast.error(result?.message || 'Failed to fetch receipts');
      }
    };

    fetchData();
  }, [base_url]);

  const groupData = (receipts: ReceiptData[]) => {
    const grouped: Record<string, Record<string, ReceiptData[]>> = {};

    receipts.forEach((receipt) => {
      const unitName = receipt.unitId.name;
      const year = new Date(receipt.generatedReceiptDate)
        .getFullYear()
        .toString();

      if (!grouped[unitName]) grouped[unitName] = {};
      if (!grouped[unitName][year]) grouped[unitName][year] = [];

      grouped[unitName][year].push(receipt);
    });

    setGroupedReceipts(grouped);
    console.log(grouped);
  };

  const formatDate = (dateStr: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateStr).toLocaleDateString('en-US', options);
  };

  const handleGenerateReceipt = async (id: string) => {
    const result = await getDataFromDB(`${base_url}/receipt/${id}`);
    console.log(result);

    // result.data.tenantId
    // result.data.totalAmount
    // result.data.paymentMethod
    console.log(result.data.tenantId);
    if (window !== undefined) {
      localStorage.setItem(
        'receiptInfo',
        JSON.stringify({
          paymentMethod: result.data.paymentMethod,
          totalPaid: result.data.rentAmountPaid.toString(),
          tenantId: result.data.tenantId,
        }),
      );
    }
  };

  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
      <h1 className='text-3xl font-bold text-gray-800 mb-8'>📊 Dashboard</h1>

      {Object.entries(groupedReceipts)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([unitName, years]) => (
          <div
            key={unitName}
            className='bg-white p-6 rounded-2xl shadow-md mb-8 border border-gray-200'
          >
            <h2 className='text-2xl font-semibold text-indigo-600 mb-6'>
              🏠 Unit: {unitName}
            </h2>

            {Object.entries(years).map(([year, receipts]) => (
              <div key={year} className='mb-6'>
                <h3 className='text-xl font-medium text-gray-700 mb-4'>
                  📅 Year: {year}
                </h3>
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {receipts.map((receipt) => (
                    <div
                      key={receipt._id}
                      className='bg-gray-100 border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition'
                    >
                      <p className='font-semibold text-indigo-600 mb-1'>
                        Receipt ID: {receipt.receiptId}
                      </p>
                      <p>🗓️ Month: {receipt.rentMonth}</p>
                      <p>💰 Paid: ৳{receipt.rentAmountPaid}</p>
                      <p>👤 Tenant: {receipt.tenantId.name}</p>
                      <p>📨 Payment Method: {receipt.paymentMethod}</p>
                      <p className='text-sm text-gray-500 mt-2'>
                        Generated: {formatDate(receipt.generatedReceiptDate)}
                      </p>
                      <button
                        className='mt-4 w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-3 rounded-lg text-sm transition'
                        onClick={() => handleGenerateReceipt(receipt._id)}
                      >
                        <Link href={`/new-receipt/${receipt.tenantId._id}`}>
                          Generate Receipt
                        </Link>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default Dashboard;
