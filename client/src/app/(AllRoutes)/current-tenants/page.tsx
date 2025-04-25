'use client';

import { useEffect, useState } from 'react';
import {
  PlusCircle,
  Mail,
  Phone,
  CalendarCheck,
  User2,
  Wallet,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getDataFromDB, postToDB } from '@/api';
import { toast } from 'sonner';
import Link from 'next/link';
import { useContextData } from '@/ContextProvider/Provider';
import { Tenant, Unit } from '@/interfaces/interface';
import { motion } from 'framer-motion';

type TTenant = {
  name: string;
  phoneNumber: string;
  email: string;
  rentStartDate: string;
  advancedAmount: number;
  rentedUnit: string;
};

const CurrentTenants = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [units, setUnits] = useState<Unit[]>([]); // List of available units
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false); // For opening the modal
  const [newTenant, setNewTenant] = useState<TTenant>({
    name: '',
    phoneNumber: '',
    email: '',
    rentStartDate: '',
    advancedAmount: 0,
    rentedUnit: '',
  });
  const { base_url } = useContextData();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getDataFromDB(`${base_url}/tenant/current`);
      const unitsResult = await getDataFromDB(
        `${base_url}/unit?occupied=false`,
      ); // Fetch available units

      if (result?.success) {
        setTenants(result.data);
        toast.success(result.message, {
          id: 'tenant',
        });
      } else {
        toast.error('Failed to fetch tenants');
        setError('Failed to fetch tenants');
      }

      if (unitsResult?.success) {
        setUnits(unitsResult.data);
      } else {
        toast.error('Failed to fetch units');
      }

      setLoading(false);
    };

    fetchData();
  }, [base_url]);

  if (loading) {
    return (
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse'>
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className='bg-white rounded-2xl shadow-lg p-5 space-y-4'
          >
            <div className='h-4 bg-gray-300 rounded w-1/2'></div>
            <div className='h-3 bg-gray-300 rounded w-3/4'></div>
            <div className='h-3 bg-gray-300 rounded w-2/3'></div>
            <div className='h-3 bg-gray-300 rounded w-1/2'></div>
            <div className='h-3 bg-gray-300 rounded w-2/4'></div>
            <div className='h-3 bg-gray-300 rounded w-1/3'></div>
          </div>
        ))}
      </div>
    );
  }

  const handleCreateTenant = async () => {
    const result = await postToDB(`${base_url}/tenant/create-tenant`, {
      tenant: newTenant,
    });
    if (result?.success) {
      toast.success('Tenant created successfully', {
        id: result.data._id,
      });
      setTenants([...tenants, result.data]); // Add new tenant to the list
      setOpenModal(false); // Close modal after success
    } else {
      toast.error('Failed to create tenant');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setNewTenant((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className='p-6 min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold text-gray-800'>Current Tenants</h1>
        <Button
          className='bg-blue-700 hover:bg-blue-800 text-white'
          onClick={() => setOpenModal(true)} // Open modal when button is clicked
        >
          <PlusCircle className='mr-2 h-5 w-5' /> Create New Tenant
        </Button>
      </div>

      {error && <p className='text-red-500'>{error}</p>}
      {!loading && !error && tenants.length === 0 && (
        <p className='text-gray-600'>No tenants found.</p>
      )}

      {/* Tenants Grid */}
      {/* Tenants Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
        {tenants.map((tenant) => (
          <motion.div
            key={tenant._id}
            className='bg-white rounded-3xl shadow-md p-6 space-y-5 border border-gray-200 relative transition-all duration-300'
          >
            {/* Details button */}
            <Link href={`/current-tenants/${tenant._id}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 250 }}
                className='absolute top-4 right-4 bg-blue-600 text-white text-sm font-medium px-4 py-1.5 rounded-full flex items-center gap-2 hover:bg-blue-700 shadow-md'
              >
                Details <ArrowRight size={16} />
              </motion.button>
            </Link>

            <div className='text-lg font-semibold text-gray-900 flex items-center gap-3'>
              <User2 className='text-blue-600 w-5 h-5' />
              {tenant.name || 'Unnamed Tenant'}
            </div>

            <div className='text-gray-700 flex items-center gap-3'>
              <Phone className='text-blue-600 w-5 h-5' />
              {tenant.phoneNumber}
            </div>

            <div className='text-gray-700 flex items-center gap-3'>
              <Mail className='text-blue-600 w-5 h-5' />
              {tenant.email}
            </div>

            <div className='text-gray-700 flex items-center gap-3'>
              <CalendarCheck className='text-blue-600 w-5 h-5' />
              <span>
                Start:{' '}
                {new Date(tenant.rentStartDate).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>

            <div className='text-gray-700 flex items-center gap-3'>
              <Wallet className='text-blue-600 w-5 h-5' />
              <span className='font-medium'>Advanced:</span>
              <span className='text-lg font-bold text-green-700'>
                ৳ {tenant.advancedAmount}
              </span>
            </div>

            <div className='flex items-center gap-3'>
              <span className='text-sm font-medium text-gray-700'>Status:</span>
              <span className='capitalize bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-800'>
                {tenant.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal for creating new tenant */}
      {openModal && (
        <motion.div
          className='fixed inset-0 flex items-center justify-center bg-black/50 z-[100] p-2 md:overflow-y-auto overflow-y-scroll'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className='bg-white p-8 rounded-lg w-full max-w-lg'
            initial={{ y: '-10vh' }}
            animate={{ y: 0 }}
            exit={{ y: '100vh' }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <h2 className='text-2xl font-semibold mb-4'>Create New Tenant</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Name Field */}
                <div>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    placeholder='Name'
                    value={newTenant.name}
                    onChange={handleChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md'
                  />
                </div>

                {/* Phone Number Field */}
                <div>
                  <label
                    htmlFor='phoneNumber'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Phone Number
                  </label>
                  <input
                    type='text'
                    id='phoneNumber'
                    name='phoneNumber'
                    placeholder='Phone Number'
                    value={newTenant.phoneNumber}
                    onChange={handleChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md'
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Email
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    placeholder='Email'
                    value={newTenant.email}
                    onChange={handleChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md'
                  />
                </div>

                {/* Rent Start Date Field */}
                <div>
                  <label
                    htmlFor='rentStartDate'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Rent Start Date
                  </label>
                  <input
                    type='date'
                    id='rentStartDate'
                    name='rentStartDate'
                    value={newTenant.rentStartDate}
                    onChange={handleChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md'
                  />
                </div>

                {/* Advanced Amount Field */}
                <div>
                  <label
                    htmlFor='advancedAmount'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Advanced Amount
                  </label>
                  <input
                    type='number'
                    id='advancedAmount'
                    name='advancedAmount'
                    placeholder='Advanced Amount'
                    value={newTenant.advancedAmount}
                    onChange={handleChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md'
                  />
                </div>

                {/* Rented Unit Field */}
                <div>
                  <label
                    htmlFor='rentedUnit'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Rented Unit
                  </label>
                  <select
                    id='rentedUnit'
                    name='rentedUnit'
                    value={newTenant.rentedUnit}
                    onChange={handleChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md'
                  >
                    <option value='' disabled>
                      Select Rented Unit
                    </option>
                    {units.map((unit) => (
                      <option key={unit._id} value={unit._id}>
                        {unit.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='flex justify-end space-x-4 mt-4'>
                <Button
                  onClick={() => setOpenModal(false)}
                  className='bg-gray-500 text-white'
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateTenant}
                  className='bg-blue-700 text-white'
                >
                  Create Tenant
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default CurrentTenants;
