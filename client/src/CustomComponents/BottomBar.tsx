import {
  HistoryIcon,
  LayoutDashboard,
  PlusCircle,
  Settings,
  Users,
} from 'lucide-react';
import Link from 'next/link';

const BottomBar = () => {
  return (
    <div className='fixed bottom-0 left-0 w-full bg-blue-600 text-white shadow-md z-50 flex justify-around items-center h-14 md:hidden'>
      <Link
        href='/dashboard'
        className='flex flex-col items-center justify-center hover:text-blue-200'
      >
        <LayoutDashboard size={20} />
        <span className='text-xs'>Dashboard</span>
      </Link>
      <Link
        href='/create-unit'
        className='flex flex-col items-center justify-center hover:text-blue-200'
      >
        <PlusCircle size={20} />
        <span className='text-xs'>Create</span>
      </Link>
      <Link
        href='/current-tenants'
        className='flex flex-col items-center justify-center hover:text-blue-200'
      >
        <Users size={20} />
        <span className='text-xs'>Tenants</span>
      </Link>
      <Link
        href='/history'
        className='flex flex-col items-center justify-center hover:text-blue-200'
      >
        <HistoryIcon size={20} />
        <span className='text-xs'>History</span>
      </Link>
      <Link
        href='/settings'
        className='flex flex-col items-center justify-center hover:text-blue-200'
      >
        <Settings size={20} />
        <span className='text-xs'>Settings</span>
      </Link>
    </div>
  );
};

export default BottomBar;
