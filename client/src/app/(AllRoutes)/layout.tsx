'use client';
import { getDataFromDB } from '@/api';
import { useContextData } from '@/ContextProvider/Provider';
import Loader from '@/CustomComponents/Loader';
import { ReactNode, useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function AllRoutesLayout({
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
        console.log(result);
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

  return <>{children}</>;
}
