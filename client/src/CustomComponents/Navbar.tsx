'use client';
import { useContextData } from '@/ContextProvider/Provider';
import {
  History as HistoryIcon,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  PlusCircle,
  Users,
} from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
  const { isMobileSidebarOpen, setIsMobileSidebarOpen, basicInfo } =
    useContextData();
  return (
    <nav className='fixed top-0 left-0 w-full bg-blue-700 text-white shadow-md z-50 h-14 flex items-center justify-between px-4 md:px-6'>
      <div className='flex items-center gap-3'>
        <Menu
          size={24}
          className='cursor-pointer lg:hidden'
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />
        <Link href='/' className='font-bold text-lg flex gap-3 items-start'>
          <Home />
          {basicInfo?.villaName}
        </Link>
      </div>

      <div className='hidden md:flex items-center gap-3 text-sm'>
        <Link
          href='/create-unit'
          className='flex items-center gap-1 hover:text-gray-200'
        >
          <PlusCircle size={18} /> Create
        </Link>
        <Link
          href='/history'
          className='flex items-center gap-1 hover:text-gray-200'
        >
          <HistoryIcon size={18} /> History
        </Link>
        <Link
          href='/dashboard'
          className='flex items-center gap-1 hover:text-gray-200'
        >
          <LayoutDashboard size={18} /> Dashboard
        </Link>
        <Link
          href='/current-tenants'
          className='flex items-center gap-1 hover:text-gray-200'
        >
          <Users size={18} /> Tenants
        </Link>

        <Link href='/' className='flex items-center gap-1 hover:text-gray-200'>
          <LogOut size={18} /> Logout
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
