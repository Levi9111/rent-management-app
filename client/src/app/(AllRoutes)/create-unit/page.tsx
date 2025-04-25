'use client';

import { useContextData } from '@/ContextProvider/Provider';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { getDataFromDB, postToDB } from '@/api';
import {
  House,
  DollarSign,
  Edit,
  XCircle,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import { Unit } from '@/interfaces/interface';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

const CreateUnit = () => {
  const { base_url } = useContextData();
  const [loading, setLoading] = useState(true);
  const [units, setUnits] = useState<Unit[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [openCreateFormModal, setOpenCreateFormModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      monthlyRent: 0,
      gasBill: 0,
      waterBill: 0,
      others: 0,
    },
  });

  useEffect(() => {
    const fetchUnits = async () => {
      const result = await getDataFromDB(`${base_url}/unit`);

      if (result?.success) {
        setUnits(result.data);
        toast.success(result.message);
      } else {
        toast.error('Failed to fetch Unit details');
      }
      setLoading(false);
    };

    fetchUnits();
  }, [base_url]);

  const handleCreateUnitClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCreateUnitConfirm = () => {
    setOpenModal(false);
    setOpenCreateFormModal(true);
  };

  const handleCloseCreateFormModal = () => {
    setOpenCreateFormModal(false);
  };

  const handleCreateNewUnit = async (data: {
    name: string;
    monthlyRent: number;
    gasBill: number;
    waterBill: number;
    others?: number;
  }) => {
    const result = await postToDB(`${base_url}/unit/create-unit`, {
      unit: data,
    });

    const fetchUnits = async () => {
      const result = await getDataFromDB(`${base_url}/unit`);

      if (result?.success) {
        setUnits(result.data);
      } else {
        toast.error('Failed to fetch Unit details');
      }
      setLoading(false);
    };

    if (result?.success) {
      toast.success('New unit created!');
      setOpenCreateFormModal(false);
      reset();
      await fetchUnits();
    } else {
      toast.error('Failed to create new unit');
    }
  };

  if (loading) {
    return (
      <div className='p-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto'>
        {[...Array(6)].map((_, idx) => (
          <div key={idx} className='flex flex-col gap-2'>
            <Skeleton className='h-5 w-32' />
            <Skeleton className='h-7 w-full' />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className='p-6 min-h-screen bg-gray-100'>
      {/* Header */}
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-4xl font-bold text-gray-900 flex items-center'>
          <House className='mr-2 text-blue-600' size={32} />
          Units
        </h1>
        <button
          onClick={handleCreateUnitClick}
          className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center'
        >
          <Edit className='mr-2' size={20} />
          Create Unit
        </button>
      </div>

      {/* Units List */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
        {units.length === 0 ? (
          <p className='text-lg text-gray-600'>No units available</p>
        ) : (
          units
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((unit) => (
              <div
                key={unit._id}
                className='relative bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition duration-150'
              >
                {/* Details button */}
                <Link href={`/create-unit/${unit._id}`}>
                  <motion.button
                    whileHover={{
                      scale: 1.08,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className='absolute top-3 right-3 bg-blue-500/90 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1 hover:bg-blue-600 shadow-sm'
                  >
                    Details
                    <ArrowRight size={14} />
                  </motion.button>
                </Link>

                <div className='p-6'>
                  <h3 className='text-2xl font-semibold text-gray-800 flex items-center mb-2'>
                    <House className='mr-2 text-gray-500' size={24} />
                    {unit.name}
                  </h3>

                  <div className='space-y-1'>
                    <p className='text-gray-600 flex items-center'>
                      <DollarSign className='mr-2 text-green-500' size={20} />
                      Monthly Rent: <strong>{unit.monthlyRent} BDT</strong>
                    </p>
                    <p className='text-gray-600 flex items-center'>
                      <DollarSign className='mr-2 text-yellow-500' size={20} />
                      Gas Bill: <strong>{unit.gasBill} BDT</strong>
                    </p>
                    <p className='text-gray-600 flex items-center'>
                      <DollarSign className='mr-2 text-blue-500' size={20} />
                      Water Bill: <strong>{unit.waterBill} BDT</strong>
                    </p>
                    <p className='text-gray-600 flex items-center'>
                      <DollarSign className='mr-2 text-gray-500' size={20} />
                      Other Charges: <strong>{unit.others} BDT</strong>
                    </p>
                  </div>

                  {/* Occupied status as a label */}
                  <div className='mt-4'>
                    <span
                      className={`inline-flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full ${
                        unit.occupied
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {unit.occupied ? (
                        <>
                          <XCircle size={14} /> Occupied
                        </>
                      ) : (
                        <>
                          <CheckCircle size={14} /> Available
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))
        )}
      </div>

      {/* Confirmation Modal */}
      {openModal && (
        <motion.div
          className='fixed inset-0 flex items-center justify-center bg-black/50 z-50'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className='bg-white p-8 rounded-lg w-full max-w-lg'
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <h2 className='text-2xl font-semibold mb-4 text-gray-800'>
              Are you sure you want to create a new unit?
            </h2>
            <p className='text-gray-600 mb-4'>
              You already have the following units:
            </p>

            <ul className='space-y-2 mb-4'>
              {units.map((unit) => (
                <li key={unit._id} className='text-gray-800 flex items-center'>
                  <House className='mr-2 text-gray-600' size={18} />
                  {unit.name}
                </li>
              ))}
            </ul>

            <div className='flex justify-end space-x-4 mt-4'>
              <button
                onClick={handleCloseModal}
                className='bg-gray-500 text-white px-6 py-2 rounded-md'
              >
                Cancel
              </button>
              <button
                onClick={handleCreateUnitConfirm}
                className='bg-blue-600 text-white px-6 py-2 rounded-md'
              >
                Create Unit
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Create Unit Form Modal */}
      {openCreateFormModal && (
        <motion.div
          className='fixed inset-0 flex items-center justify-center bg-black/50 z-50'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className='bg-white p-8 rounded-lg w-full max-w-lg'
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <h2 className='text-2xl font-semibold mb-4 text-gray-800'>
              Create New Unit
            </h2>
            <form onSubmit={handleSubmit(handleCreateNewUnit)}>
              {/* Name Field */}
              <div className='mb-4'>
                <label className='block text-gray-700 mb-2'>Unit Name</label>
                <input
                  type='text'
                  {...register('name', { required: 'Unit name is required' })}
                  className='w-full border border-gray-300 p-2 rounded-md'
                  placeholder='Enter unit name'
                />
                {errors.name && (
                  <p className='text-red-500 text-sm'>{errors.name.message}</p>
                )}
              </div>

              {/* Monthly Rent */}
              <div className='mb-4'>
                <label className='block text-gray-700 mb-2'>
                  Monthly Rent (BDT)
                </label>
                <input
                  type='number'
                  {...register('monthlyRent', {
                    required: 'Monthly rent is required',
                  })}
                  className='w-full border border-gray-300 p-2 rounded-md'
                  placeholder='Enter monthly rent'
                />
                {errors.monthlyRent && (
                  <p className='text-red-500 text-sm'>
                    {errors.monthlyRent.message}
                  </p>
                )}
              </div>

              {/* Gas Bill */}
              <div className='mb-4'>
                <label className='block text-gray-700 mb-2'>
                  Gas Bill (BDT)
                </label>
                <input
                  type='number'
                  {...register('gasBill', { required: 'Gas bill is required' })}
                  className='w-full border border-gray-300 p-2 rounded-md'
                  placeholder='Enter gas bill'
                />
                {errors.gasBill && (
                  <p className='text-red-500 text-sm'>
                    {errors.gasBill.message}
                  </p>
                )}
              </div>

              {/* Water Bill */}
              <div className='mb-4'>
                <label className='block text-gray-700 mb-2'>
                  Water Bill (BDT)
                </label>
                <input
                  type='number'
                  {...register('waterBill', {
                    required: 'Water bill is required',
                  })}
                  className='w-full border border-gray-300 p-2 rounded-md'
                  placeholder='Enter water bill'
                />
                {errors.waterBill && (
                  <p className='text-red-500 text-sm'>
                    {errors.waterBill.message}
                  </p>
                )}
              </div>

              {/* Others */}
              <div className='mb-4'>
                <label className='block text-gray-700 mb-2'>
                  Other Charges (BDT)
                </label>
                <input
                  type='number'
                  {...register('others', {
                    required: 'Other charges are required',
                  })}
                  className='w-full border border-gray-300 p-2 rounded-md'
                  placeholder='Enter other charges'
                />
                {errors.others && (
                  <p className='text-red-500 text-sm'>
                    {errors.others.message}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className='flex justify-end space-x-4'>
                <button
                  type='button'
                  onClick={handleCloseCreateFormModal}
                  className='bg-gray-500 text-white px-6 py-2 rounded-md'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='bg-blue-600 text-white px-6 py-2 rounded-md'
                >
                  Create Unit
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default CreateUnit;
