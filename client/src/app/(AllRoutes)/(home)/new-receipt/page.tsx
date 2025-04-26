'use client';

import { getDataFromDB } from '@/api';
import { useContextData } from '@/ContextProvider/Provider';
import { CustomModal } from '@/CustomComponents/Modal';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Loader from '@/CustomComponents/Loader';

interface RentedUnit {
  name: string;
  monthlyRent: number;
  gasBill: number;
  waterBill: number;
  others: number;
}

interface TenantDetails {
  _id: string;
  name?: string;
  phoneNumber: string;
  email: string;
  rentStartDate: string;
  advancedAmount: number;
  rentedUnit: RentedUnit;
}

interface ReceiptFormValues {
  totalPaid: number;
  rentPaymentMethod: string;
}

const NewReceipt = () => {
  const { base_url } = useContextData();
  const [tenants, setTenants] = useState<TenantDetails[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTenantId, setActiveTenantId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ReceiptFormValues>();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getDataFromDB(`${base_url}/tenant/current`);
      if (result.success) {
        setTenants(result.data);
      } else {
        toast.error(result.data.message);
      }
      setLoading(false);
    };
    fetchData();
  }, [base_url]);

  const handleGenerateReceiptByModal = async (tenantId: string) => {
    const result = await getDataFromDB(
      `${base_url}/receipt/tenent-id/${tenantId}`,
    );
    if (result.success) {
      localStorage.setItem(
        'receiptInfo',
        JSON.stringify({
          tenantId: tenantId,
          totalPaid: result.data.rentAmountPaid,
          paymentMethod: result.data.paymentMethod,
        }),
      );

      router.push(`/new-receipt/${tenantId}`);
    } else {
      setActiveTenantId(tenantId);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setActiveTenantId(null);
    setIsModalOpen(false);
  };

  const onSubmit = async (data: ReceiptFormValues) => {
    const receiptData = {
      tenantId: activeTenantId,
      totalPaid: data.totalPaid,
      paymentMethod: data.rentPaymentMethod,
    };
    localStorage.setItem('receiptInfo', JSON.stringify(receiptData));

    router.push(`/new-receipt/${activeTenantId}`);
  };

  if (loading) return <Loader />;

  return (
    <div className='max-w-6xl w-full mx-auto p-4 '>
      <h1 className='text-2xl font-bold mb-6 text-center'>
        Generate Rent Receipts
      </h1>

      <div className='overflow-x-auto'>
        <table className='min-w-full border border-gray-300 text-sm'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='border px-3 py-2 text-left'>Tenant Name</th>
              <th className='border px-3 py-2 text-left'>Phone</th>
              <th className='border px-3 py-2 text-left'>Email</th>
              <th className='border px-3 py-2 text-left'>Unit</th>
              <th className='border px-3 py-2 text-left'>Rent (BDT)</th>
              <th className='border px-3 py-2 text-left'>Gas (BDT)</th>
              <th className='border px-3 py-2 text-left'>Water (BDT)</th>
              <th className='border px-3 py-2 text-left'>Others (BDT)</th>
              <th className='border px-3 py-2 text-left'>Advanced Paid</th>
              <th className='border px-3 py-2 text-left'>Actions</th>
            </tr>
          </thead>

          <tbody>
            {tenants?.map((tenant) => {
              const {
                _id,
                name,
                phoneNumber,
                email,
                rentedUnit,
                advancedAmount,
              } = tenant;

              const {
                name: unitName,
                monthlyRent,
                gasBill,
                waterBill,
                others,
              } = rentedUnit;

              return (
                <tr key={_id} className='border-t'>
                  <td className='border px-3 py-2 border-gray-300'>{name}</td>
                  <td className='border px-3 py-2 border-gray-300'>
                    {phoneNumber}
                  </td>
                  <td className='border px-3 py-2 border-gray-300'>{email}</td>
                  <td className='border px-3 py-2 border-gray-300'>
                    {unitName}
                  </td>
                  <td className='border px-3 py-2 border-gray-300'>
                    {monthlyRent}
                  </td>
                  <td className='border px-3 py-2 border-gray-300'>
                    {gasBill}
                  </td>
                  <td className='border px-3 py-2 border-gray-300'>
                    {waterBill}
                  </td>
                  <td className='border px-3 py-2 border-gray-300'>{others}</td>
                  <td className='border px-3 py-2 border-gray-300'>
                    {advancedAmount}
                  </td>

                  <td className='border px-3 py-2 border-gray-300'>
                    <button
                      onClick={() => handleGenerateReceiptByModal(_id)}
                      className='bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition'
                    >
                      Create Receipt
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {activeTenantId && (
        <CustomModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={`Generate Receipt`}
        >
          {tenants?.find((t) => t._id === activeTenantId) && (
            <div className=''>
              <h3 className='text-lg font-semibold mb-4'>Receipt Form</h3>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className='grid grid-cols-1 md:grid-cols-2 gap-4'
              >
                <div>
                  <label className='block text-sm font-medium'>
                    Tenant Name
                  </label>
                  <input
                    type='text'
                    value={tenants.find((t) => t._id === activeTenantId)?.name}
                    readOnly
                    className='w-full border px-3 py-2 rounded'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium'>Unit</label>
                  <input
                    type='text'
                    value={
                      tenants.find((t) => t._id === activeTenantId)?.rentedUnit
                        .name
                    }
                    readOnly
                    className='w-full border px-3 py-2 rounded'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium'>
                    Monthly Rent (BDT)
                  </label>
                  <input
                    type='number'
                    value={
                      tenants.find((t) => t._id === activeTenantId)?.rentedUnit
                        .monthlyRent
                    }
                    readOnly
                    className='w-full border px-3 py-2 rounded'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium'>
                    Gas Bill (BDT)
                  </label>
                  <input
                    type='number'
                    value={
                      tenants.find((t) => t._id === activeTenantId)?.rentedUnit
                        .gasBill
                    }
                    readOnly
                    className='w-full border px-3 py-2 rounded'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium'>
                    Water Bill (BDT)
                  </label>
                  <input
                    type='number'
                    value={
                      tenants.find((t) => t._id === activeTenantId)?.rentedUnit
                        .waterBill
                    }
                    readOnly
                    className='w-full border px-3 py-2 rounded'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium'>
                    Others (BDT)
                  </label>
                  <input
                    type='number'
                    value={
                      tenants.find((t) => t._id === activeTenantId)?.rentedUnit
                        .others
                    }
                    readOnly
                    className='w-full border px-3 py-2 rounded'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium'>
                    Total Amount (BDT)
                  </label>
                  <input
                    type='number'
                    value={
                      (tenants.find((t) => t._id === activeTenantId)?.rentedUnit
                        .monthlyRent || 0) +
                      (tenants.find((t) => t._id === activeTenantId)?.rentedUnit
                        .gasBill || 0) +
                      (tenants.find((t) => t._id === activeTenantId)?.rentedUnit
                        .waterBill || 0) +
                      (tenants.find((t) => t._id === activeTenantId)?.rentedUnit
                        .others || 0)
                    }
                    readOnly
                    className='w-full border px-3 py-2 rounded'
                  />
                </div>
                <div>
                  <label
                    htmlFor='totalPaid'
                    className='block text-sm font-medium'
                  >
                    Total Amount Paid (BDT)
                  </label>
                  <input
                    type='number'
                    id='totalPaid'
                    className='w-full border px-3 py-2 rounded'
                    {...register('totalPaid', {
                      required: 'Total amount paid is required',
                    })}
                  />
                  {errors.totalPaid && (
                    <span className='text-red-500 text-xs'>
                      {errors.totalPaid.message}
                    </span>
                  )}
                </div>
                <div className='md:col-span-2'>
                  <label
                    htmlFor='paymentMethod'
                    className='block text-sm font-medium'
                  >
                    Rent Payment Method
                  </label>
                  <input
                    type='text'
                    id='paymentMethod'
                    className='w-full border px-3 py-2 rounded'
                    placeholder='e.g. Hand Cash'
                    {...register('rentPaymentMethod', {
                      required: 'Payment method is required',
                    })}
                  />
                  {errors.rentPaymentMethod && (
                    <span className='text-red-500 text-xs'>
                      {errors.rentPaymentMethod.message}
                    </span>
                  )}
                </div>
                <div className='md:col-span-2'>
                  <button
                    type='submit'
                    className='w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition'
                  >
                    Generate Receipt
                  </button>
                </div>
              </form>
            </div>
          )}
        </CustomModal>
      )}
    </div>
  );
};

export default NewReceipt;
