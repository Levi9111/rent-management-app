import {
  HistoryIcon,
  LayoutDashboard,
  LogOut,
  Notebook,
  PlusCircle,
  Users,
} from 'lucide-react';
import Link from 'next/link';

const BottomBar = () => {
  return (
    <div className='md:pt-0 pt-16'>
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
          href='/notes'
          className='flex flex-col items-center justify-center hover:text-blue-200'
        >
          <Notebook size={18} /> Notes
        </Link>
        <Link
          href='/'
          className='flex flex-col items-center justify-center hover:text-blue-200'
        >
          <LogOut size={18} /> Logout
        </Link>
      </div>
    </div>
  );
};

export default BottomBar;
