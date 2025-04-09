'use client';
import { useForm } from 'react-hook-form';

type FormData = {
  ownerName: string;
  villaName: string;
  streetAddress: string;
  phoneNumber: string;
  ownerSignature: FileList;
};

const Settings = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const formData = new FormData();
    formData.append('ownerName', data.ownerName);
    formData.append('villaName', data.villaName);
    formData.append('streetAddress', data.streetAddress);
    formData.append('phoneNumber', data.phoneNumber);
    if (data.ownerSignature && data.ownerSignature.length > 0) {
      formData.append('ownerSignature', data.ownerSignature[0]);
    }

    // TODO: Replace with your API call
    console.log('Form Data:', data);
    alert('Settings saved successfully!');

    reset();
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
            {...register('ownerName', { required: 'Owner name is required' })}
            placeholder='John Doe'
            className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          {errors.ownerName && (
            <p className='text-red-500 text-sm'>{errors.ownerName.message}</p>
          )}
        </div>

        {/* Villa Name */}
        <div>
          <label className='block text-sm font-medium mb-1'>Villa Name</label>
          <input
            type='text'
            {...register('villaName', { required: 'Villa name is required' })}
            placeholder='Patwari Villa'
            className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          {errors.villaName && (
            <p className='text-red-500 text-sm'>{errors.villaName.message}</p>
          )}
        </div>

        {/* Street Address */}
        <div>
          <label className='block text-sm font-medium mb-1'>
            Street Address
          </label>
          <textarea
            {...register('streetAddress', {
              required: 'Street address is required',
            })}
            placeholder='187/5/B/1, Matikata, Dewan Para'
            rows={3}
            className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          {errors.streetAddress && (
            <p className='text-red-500 text-sm'>
              {errors.streetAddress.message}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className='block text-sm font-medium mb-1'>Phone Number</label>
          <input
            type='tel'
            {...register('phoneNumber', {
              required: 'Phone number is required',
            })}
            placeholder='01976-084208'
            className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          {errors.phoneNumber && (
            <p className='text-red-500 text-sm'>{errors.phoneNumber.message}</p>
          )}
        </div>

        {/* Owner Signature */}
        <div>
          <label className='block text-sm font-medium mb-1'>
            Owner Signature (Image Upload)
          </label>
          <input
            type='file'
            accept='image/*'
            {...register('ownerSignature', {
              required: 'Owner signature is required',
            })}
            className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          {errors.ownerSignature && (
            <p className='text-red-500 text-sm'>
              {errors.ownerSignature.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          className='w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium'
        >
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default Settings;
