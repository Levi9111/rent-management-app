'use client';

import { getDataFromDB, updateDataIntoDB } from '@/api';
import { useContextData } from '@/ContextProvider/Provider';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Loader2, Download, StopCircle } from 'lucide-react';
import { Tenant } from '@/interfaces/interface';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';

const TenantDetails = () => {
  const params = useParams();
  const router = useRouter();
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const { base_url } = useContextData();

  useEffect(() => {
    const fetchTenants = async () => {
      const result = await getDataFromDB(`${base_url}/tenant/${params.id}`);

      if (result?.success) {
        setTenant(result.data);
        toast.success(result.message);
      } else {
        toast.error('Failed to fetch tenant details');
      }
      setLoading(false);
    };

    fetchTenants();
  }, [base_url, params.id]);

  const handleUpdate = async () => {
    setLoading(true);
    const result = await updateDataIntoDB(
      `${base_url}/tenant/update-tenant/${params.id}`,
      {
        tenant: {
          status: 'former',
        },
      },
    );
    setLoading(false);
    if (result?.success) {
      toast.success(result.message);
      router.push('/current-tenants');
    } else {
      toast.error('Failed to update tenant status');
    }
  };

  const handleDownload = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <Loader2 className='animate-spin w-8 h-8 text-gray-500' />
      </div>
    );
  }

  if (!tenant) {
    return (
      <div className='text-center text-red-500'>No tenant data found.</div>
    );
  }

  const {
    name,
    phoneNumber,
    email,
    rentStartDate,
    rentEndDate,
    rentedUnit,
    advancedAmount,
    status,
    createdAt,
  } = tenant;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='max-w-4xl mx-auto p-6'
    >
      <div className='flex md:flex-row flex-col justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Tenant Details</h1>
        <div className='flex space-x-2 print:hidden '>
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <button className='flex items-center gap-1 bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 transition'>
                <StopCircle size={16} />
                End Aggrement
              </button>
            </AlertDialogTrigger>

            {/* TODO: fix the position of this Alert content */}
            <AlertDialogContent className='w-full max-w-md '>
              <AlertDialogTitle className='text-lg font-semibold'>
                End Agreement
              </AlertDialogTitle>
              <div className='space-y-4'>
                <h2 className='text-lg font-semibold'>Are you sure?</h2>
                <p>
                  This action will end the agreement and mark the unit as
                  available.
                </p>
              </div>
              <div className='flex justify-end space-x-4 mt-4'>
                {/* Cancel action */}
                <AlertDialogCancel
                  onClick={() => setOpen(false)}
                  className='text-gray-600'
                >
                  Cancel
                </AlertDialogCancel>
                {/* Confirm action */}
                <AlertDialogAction
                  onClick={handleUpdate}
                  className='bg-red-600 text-white hover:bg-red-700'
                >
                  End Agreement
                </AlertDialogAction>
              </div>
            </AlertDialogContent>
          </AlertDialog>

          <button
            onClick={handleDownload}
            className='flex items-center gap-1 bg-green-500 text-white px-3 py-1.5 rounded hover:bg-green-600 transition'
          >
            <Download size={16} />
            Download
          </button>
        </div>
      </div>

      <div className='bg-white shadow-md rounded-lg p-6 space-y-6'>
        {/* Personal Info */}
        <Section title='Personal Information'>
          <DetailItem label='Name' value={name || ''} />
          <DetailItem label='Phone Number' value={phoneNumber} />
          <DetailItem label='Email' value={email} />
          <DetailItem label='Status' value={status} />
        </Section>

        {/* Rental Info */}
        <Section title='Rental Information'>
          <DetailItem
            label='Rent Start Date'
            value={new Date(rentStartDate).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          />
          <DetailItem
            label='Rent End Date'
            value={
              rentEndDate
                ? new Date(rentEndDate).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })
                : 'Ongoing'
            }
          />
          <DetailItem label='Advanced Amount' value={`৳${advancedAmount}`} />
          <DetailItem
            label='Created At'
            value={new Date(createdAt).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          />
        </Section>

        {/* Unit Info */}
        {rentedUnit && (
          <Section title='Unit Information'>
            <DetailItem label='Unit Name' value={rentedUnit.name} />
            <DetailItem
              label='Monthly Rent'
              value={`৳${rentedUnit.monthlyRent}`}
            />
            <DetailItem label='Gas Bill' value={`৳${rentedUnit.gasBill}`} />
            <DetailItem label='Water Bill' value={`৳${rentedUnit.waterBill}`} />
            <DetailItem label='Other Charges' value={`৳${rentedUnit.others}`} />
            <DetailItem
              label='Occupied'
              value={rentedUnit.occupied ? 'Yes' : 'No'}
            />
          </Section>
        )}
      </div>
    </motion.div>
  );
};

// Reusable Section component
const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div>
    <h2 className='text-xl font-semibold mb-4 border-b pb-2'>{title}</h2>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>{children}</div>
  </div>
);

// Reusable Detail item
const DetailItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className='flex flex-col'>
    <span className='text-gray-500 text-sm'>{label}</span>
    <span
      className={cn(
        'font-medium capitalize',
        value === 'former' && 'text-red-500 font-bold',
        value === 'current' && 'text-blue-500 font-bold',
      )}
    >
      {value}
    </span>
  </div>
);

export default TenantDetails;
