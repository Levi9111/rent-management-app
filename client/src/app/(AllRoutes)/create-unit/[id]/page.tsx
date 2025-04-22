'use client';

import { getDataFromDB, updateDataIntoDB } from '@/api';
import { useContextData } from '@/ContextProvider/Provider';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Pencil,
  Home,
  DollarSign,
  Flame,
  Droplet,
  Settings,
  CheckCircle,
  XCircle,
  CalendarDays,
} from 'lucide-react';
import { Button } from '@/components/ui/button'; // assuming shadcn/ui
import { Unit } from '@/interfaces/interface';
import { CustomModal } from '@/CustomComponents/Modal';
import { useForm, Controller } from 'react-hook-form';

interface UnitFormProps {
  unit: Partial<Unit>;
  onSubmit: (data: Unit) => void;
}

const UnitDetails = () => {
  const { base_url } = useContextData();
  const { id } = useParams();
  const [unit, setUnit] = useState<Unit | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUnitDetails = async () => {
      try {
        const result = await getDataFromDB(`${base_url}/unit/${id}`);
        if (result.success) {
          setUnit(result.data);
        } else {
          toast.error(result.message);
        }
      } catch {
        toast.error('Failed to fetch unit details');
      } finally {
        setLoading(false);
      }
    };
    fetchUnitDetails();
  }, [base_url, id]);

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

  if (!unit) {
    return (
      <div className='p-6 text-center text-gray-500'>
        No unit details found.
      </div>
    );
  }

  const handleUpdateUnit = async (data: Partial<Unit>) => {
    try {
      const updatedData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [
          key,
          typeof value === 'number' ? value.toString() : value,
        ]),
      );

      const result = await updateDataIntoDB(
        `${base_url}/unit/update-unit/${id}`,
        { unit: updatedData },
      );
      if (result.success) {
        toast.success('Unit updated successfully!');
        setIsModalOpen(false);
        setUnit(result.data);
      } else {
        toast.error(result.message || 'Failed to update unit.');
      }
    } catch {
      toast.error('An error occurred while updating.');
    }
  };

  return (
    <div className='p-6 max-w-5xl mx-auto space-y-6'>
      {/* Header with Edit Button */}
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-3xl font-semibold text-gray-800 flex items-center gap-3'>
          <Home className='w-7 h-7 text-blue-600' />
          Unit Details: {unit.name}
        </h2>
        <Button
          className='flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white'
          onClick={() => setIsModalOpen(true)}
        >
          <Pencil className='w-4 h-4' />
          Edit Unit
        </Button>
      </div>

      {/* Modal with Unit Form */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Edit Unit info: ${unit.name}`}
      >
        <UnitForm unit={unit} onSubmit={handleUpdateUnit} />
      </CustomModal>

      {/* Details Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white shadow-md rounded-xl p-6'>
        <DetailItem
          icon={<DollarSign className='text-green-600 w-5 h-5' />}
          label='Monthly Rent'
          value={`৳ ${unit.monthlyRent}`}
        />
        <DetailItem
          icon={<Flame className='text-red-600 w-5 h-5' />}
          label='Gas Bill'
          value={`৳ ${unit.gasBill}`}
        />
        <DetailItem
          icon={<Droplet className='text-blue-600 w-5 h-5' />}
          label='Water Bill'
          value={`৳ ${unit.waterBill}`}
        />
        <DetailItem
          icon={<Settings className='text-yellow-600 w-5 h-5' />}
          label='Other Charges'
          value={`৳ ${unit.others}`}
        />
        <DetailItem
          icon={
            unit.occupied ? (
              <XCircle className='text-red-600 w-5 h-5' />
            ) : (
              <CheckCircle className='text-green-600 w-5 h-5' />
            )
          }
          label='Occupied'
          value={unit.occupied ? 'Yes' : 'No'}
        />
        <DetailItem
          icon={<CalendarDays className='text-gray-600 w-5 h-5' />}
          label='Created At'
          value={new Date(unit.createdAt).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        />
        <DetailItem
          icon={<CalendarDays className='text-gray-600 w-5 h-5' />}
          label='Updated At'
          value={new Date(unit.updatedAt).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        />
      </div>
    </div>
  );
};

// Reusable detail item component
const DetailItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className='flex items-center gap-4'>
    <div className='flex-shrink-0'>{icon}</div>
    <div>
      <div className='text-gray-700 text-base font-medium'>{label}</div>
      <div className='text-gray-900 text-lg'>{value}</div>
    </div>
  </div>
);

// UnitForm Component - Separate form for updating unit
const UnitForm = ({ unit, onSubmit }: UnitFormProps) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      monthlyRent: unit.monthlyRent,
      gasBill: unit.gasBill,
      waterBill: unit.waterBill,
      others: unit.others,
    },
  });

  return (
    //@ts-expect-error onSubmit prop
    <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Monthly Rent
        </label>
        <Controller
          name='monthlyRent'
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type='number'
              className='w-full border border-gray-300 rounded-lg p-2'
            />
          )}
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Gas Bill
        </label>
        <Controller
          name='gasBill'
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type='number'
              className='w-full border border-gray-300 rounded-lg p-2'
            />
          )}
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Water Bill
        </label>
        <Controller
          name='waterBill'
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type='number'
              className='w-full border border-gray-300 rounded-lg p-2'
            />
          )}
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Other Charges
        </label>
        <Controller
          name='others'
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type='number'
              className='w-full border border-gray-300 rounded-lg p-2'
            />
          )}
        />
      </div>

      <div className='flex justify-end'>
        <Button
          type='submit'
          className='bg-blue-600 hover:bg-blue-700 text-white'
        >
          Update Unit
        </Button>
      </div>
    </form>
  );
};

export default UnitDetails;
