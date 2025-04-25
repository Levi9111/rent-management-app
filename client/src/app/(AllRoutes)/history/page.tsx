'use client';

import { getDataFromDB } from '@/api';
import { Skeleton } from '@/components/ui/skeleton';
import { useContextData } from '@/ContextProvider/Provider';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { User, Calendar, Phone, Mail, Home, Clock } from 'lucide-react';
import { Tenant } from '@/interfaces/interface';

const History = () => {
  const { base_url } = useContextData();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Tenant[] | []>([]);

  useEffect(() => {
    const fetchTenants = async () => {
      const result = await getDataFromDB(`${base_url}/tenant`);

      if (result?.success) {
        const sortedData = (result.data as Tenant[]).sort(
          (a: Tenant, b: Tenant) => a.name.localeCompare(b.name),
        );
        setData(sortedData);
        setLoading(false);
      } else {
        toast.error('Failed to fetch tenant details');
        setLoading(false);
      }
    };

    fetchTenants();
  }, [base_url]);

  if (loading) {
    return <Skeleton className='h-96 w-full' />;
  }

  const calculateStayDuration = (startDate: string, endDate: string | null) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();

    const years = end.getFullYear() - start.getFullYear();
    const months = end.getMonth() - start.getMonth() + years * 12;

    const fullYears = Math.floor(months / 12);
    const remainingMonths = months % 12;

    const yearsText =
      fullYears > 0 ? `${fullYears} year${fullYears > 1 ? 's' : ''}` : '';
    const monthsText =
      remainingMonths > 0
        ? `${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`
        : '';

    const separator = yearsText && monthsText ? ', ' : '';

    return `${yearsText}${separator}${monthsText}` || 'Less than a month';
  };

  const TenantTable = ({
    tenants,
    isCurrent,
  }: {
    tenants: Tenant[];
    isCurrent: boolean;
  }) => (
    <div className='overflow-x-auto'>
      <table className='min-w-full leading-normal border-collapse'>
        <thead className='bg-gray-100 text-gray-600 uppercase text-sm'>
          <tr>
            <th className='py-3 px-6 text-left'>
              <User className='inline-block h-4 w-4 mr-1' /> Name
            </th>
            <th className='py-3 px-6 text-left'>
              <Mail className='inline-block h-4 w-4 mr-1' /> Email
            </th>
            <th className='py-3 px-6 text-left'>
              <Phone className='inline-block h-4 w-4 mr-1' /> Phone
            </th>
            <th className='py-3 px-6 text-left'>
              <Home className='inline-block h-4 w-4 mr-1' /> Unit
            </th>

            <th className='py-3 px-6 text-left'>
              <Calendar className='inline-block h-4 w-4 mr-1' /> End Date
            </th>
            <th className='py-3 px-6 text-left'>
              <Clock className='inline-block h-4 w-4 mr-1' /> Duration
            </th>
            <th className='py-3 px-6 text-left'>Amount</th>
            {isCurrent && <th className='py-3 px-6 text-left'>Status</th>}
          </tr>
        </thead>
        <tbody>
          {tenants.map((tenant: Tenant, index: number) => (
            <tr
              key={tenant._id}
              className={`bg-white border-b transition duration-300 ease-in-out hover:bg-gray-50 ${
                index % 2 !== 0 ? 'bg-gray-50' : ''
              }`}
              style={{
                transform: `rotate(${Math.random() * 1 - 0.5}deg) translateY(${
                  Math.random() * 4 - 2
                }px)`,
                boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.05)',
              }}
            >
              <td className='py-3 px-6 text-left whitespace-nowrap'>
                {tenant.name}
              </td>
              <td className='py-3 px-6 text-left'>{tenant.email}</td>
              <td className='py-3 px-6 text-left'>{tenant.phoneNumber}</td>
              <td className='py-3 px-6 text-left'>
                {tenant.rentedUnit?.name || 'N/A'}
              </td>
              <td className='py-3 px-6 text-left'>
                {new Date(tenant.rentStartDate).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </td>

              <td className='py-3 px-6 text-left'>
                {calculateStayDuration(
                  tenant.rentStartDate,
                  tenant.rentEndDate!,
                )}
              </td>
              <td className='py-3 px-6 text-left'>
                {tenant.advancedAmount} BDT
              </td>
              {isCurrent && (
                <td className='py-3 px-6 text-left'>
                  <span className='font-semibold text-green-500'>Current</span>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {tenants.length === 0 && (
        <p className='text-gray-500 italic mt-4'>
          No tenants found in this section.
        </p>
      )}
    </div>
  );

  return (
    <div className='p-6'>
      <h2 className='text-3xl font-bold mb-8 text-center'>Tenant History</h2>

      <div className='space-y-8'>
        {/* Current Tenants Section */}
        <div className='border-t-4 border-green-500 pt-6'>
          <h3 className='text-2xl font-semibold text-green-500 mb-4 flex items-center gap-2'>
            <User className='h-6 w-6' /> Current Tenants
          </h3>
          <TenantTable
            tenants={data.filter(
              (tenant: Tenant) => tenant.status === 'current',
            )}
            isCurrent
          />
        </div>

        {/* Former Tenants Section */}
        <div className='border-t-4 border-red-500 pt-6'>
          <h3 className='text-2xl font-semibold text-red-500 mb-4 flex items-center gap-2'>
            <User className='h-6 w-6' /> Former Tenants
          </h3>
          <TenantTable
            tenants={data.filter(
              (tenant: Tenant) => tenant.status === 'former',
            )}
            isCurrent={false}
          />
        </div>
      </div>
    </div>
  );
};

export default History;
