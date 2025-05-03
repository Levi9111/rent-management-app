'use client';
import { postToDB } from '@/api';
import { useContextData } from '@/ContextProvider/Provider';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type FormData = {
  ownerName?: string;
  villaName?: string;
  streetAddress?: string;
  phoneNumber?: string;
  ownerSignature?: FileList;
  bankName?: string;
  branchName?: string;
  accountNumber?: string;
  routingNumber?: string;
};

const Settings = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const { base_url } = useContextData();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    const filteredData: Partial<FormData> = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => {
        if (value instanceof FileList) return value.length > 0;
        return value !== undefined && value !== '';
      }),
    );
    const formData = new FormData();

    if (filteredData.ownerSignature && filteredData.ownerSignature[0]) {
      formData.append('file', filteredData.ownerSignature[0]);
    }

    formData.append('data', JSON.stringify({ settings: filteredData }));

    try {
      const result = await postToDB(
        `${base_url}/settings/manage-settings`,
        formData,
      );

      console.log(result);
      if (toast.success) {
        toast.success(result.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to save settings.');
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 p-4 md:p-8'>
      <div className='max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8'>
        <h2 className='text-3xl font-bold text-center text-gray-800 mb-8'>
          Settings
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
          {/* Main Form Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Owner Name */}
            <div>
              <label className='block text-sm font-medium mb-1'>
                Owner Name
              </label>
              <input
                type='text'
                {...register('ownerName')}
                placeholder='John Doe'
                className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            {/* Villa Name */}
            <div>
              <label className='block text-sm font-medium mb-1'>
                Villa Name
              </label>
              <input
                type='text'
                {...register('villaName')}
                placeholder='Patwari Villa'
                className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className='block text-sm font-medium mb-1'>
                Phone Number
              </label>
              <input
                type='tel'
                {...register('phoneNumber')}
                placeholder='01976084208'
                className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            {/* Owner Signature */}
            <div>
              <label className='block text-sm font-medium mb-1'>
                Owner Signature (Image Upload)
              </label>
              <input
                type='file'
                accept='image/*'
                {...register('ownerSignature')}
                className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            {/* Street Address - full width on md+ */}
            <div className='md:col-span-2'>
              <label className='block text-sm font-medium mb-1'>
                Street Address
              </label>
              <textarea
                {...register('streetAddress')}
                placeholder='187/5/B/1, Matikata, Dewan Para'
                rows={3}
                className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
              />
            </div>
          </div>

          {/* Bank Details Section */}
          <div className='p-6 border-2 border-blue-400 rounded-xl bg-blue-50'>
            <h3 className='text-xl font-semibold text-blue-700 mb-6 text-center md:text-left'>
              Bank Details
            </h3>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  Bank Name
                </label>
                <input
                  type='text'
                  {...register('bankName')}
                  placeholder='Bank of Example'
                  className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>

              <div>
                <label className='block text-sm font-medium mb-1'>
                  Branch Name
                </label>
                <input
                  type='text'
                  {...register('branchName')}
                  placeholder='Main Branch'
                  className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>

              <div>
                <label className='block text-sm font-medium mb-1'>
                  Account Number
                </label>
                <input
                  type='text'
                  {...register('accountNumber')}
                  placeholder='1234567890'
                  className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>

              <div>
                <label className='block text-sm font-medium mb-1'>
                  Routing Number
                </label>
                <input
                  type='text'
                  {...register('routingNumber')}
                  placeholder='987654321'
                  className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed'
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Settings'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
