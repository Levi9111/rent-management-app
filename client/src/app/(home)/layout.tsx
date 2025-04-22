'use client';
import { getDataFromDB } from '@/api';
import { useContextData } from '@/ContextProvider/Provider';
import Loader from '@/CustomComponents/Loader';
import Sidebar from '@/CustomComponents/Sidebar';
import { ReactNode, useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { base_url, basicInfo, setBasicInfo } = useContextData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDataFromDB(`${base_url}/settings`);
        setBasicInfo(result.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching settings:', error);
        setLoading(false);
        toast.error('Something went wrong!');
      }
    };

    if (!basicInfo) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [base_url, basicInfo, setBasicInfo]);

  if (loading) return <Loader />;

  return (
    <div className='flex flex-col min-h-screen bg-gray-200 '>
      <div className='md:grid md:grid-cols-[max-content_1fr]'>
        {/* Sidebar */}
        <Sidebar />
        {/* Main Content */}
        <div className='flex-1 flex justify-center items-center p-6 pb-20 md:pb-6'>
          {children}
        </div>
      </div>
    </div>
  );
}
