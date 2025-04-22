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
};

const Settings = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const { base_url } = useContextData();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const formData = new FormData();

    if (data.ownerSignature && data.ownerSignature[0]) {
      formData.append('file', data.ownerSignature[0]);
    }

    formData.append('data', JSON.stringify({ settings: data }));

    try {
      const result = await postToDB(
        `${base_url}/settings/manage-settings`,
        formData,
      );
      if (toast.success) {
        toast.success(result.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <div className='max-w-lg mx-auto mt-10 p-8 bg-white shadow-xl rounded-2xl space-y-6'>
      <h2 className='text-3xl font-bold text-center text-gray-800'>Settings</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        {/* Owner Name */}
        <div>
          <label className='block text-sm font-medium mb-1'>Owner Name</label>
          <input
            type='text'
            {...register('ownerName')}
            placeholder='John Doe'
            className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>

        {/* Villa Name */}
        <div>
          <label className='block text-sm font-medium mb-1'>Villa Name</label>
          <input
            type='text'
            {...register('villaName')}
            placeholder='Patwari Villa'
            className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>

        {/* Street Address */}
        <div>
          <label className='block text-sm font-medium mb-1'>
            Street Address
          </label>
          <textarea
            {...register('streetAddress')}
            placeholder='187/5/B/1, Matikata, Dewan Para'
            rows={3}
            className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className='block text-sm font-medium mb-1'>Phone Number</label>
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

        {/* Submit Button */}
        <button
          type='submit'
          className='w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium'
        >
          {loading ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
};

export default Settings;
