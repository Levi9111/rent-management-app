'use client';
import { useRef, useState } from 'react';
import {
  Menu,
  Plus,
  Edit,
  Trash2,
  Download,
  Send,
  Settings,
  PlusCircle,
  LayoutDashboard,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import { RefObject } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';
import logo from '../../public/pv-logo.png';
import { cn } from '@/lib/utils';
import { useContextData } from '@/ContextProvider/Provider';

const Receipt = ({
  receiptRef,
}: {
  receiptRef: RefObject<HTMLDivElement | null>;
}) => {
  return (
    <div
      ref={receiptRef}
      className='max-w-lg w-full bg-white shadow-xl rounded-lg p-6 relative'
    >
      <Image
        src={logo}
        alt='Patwary vila logo'
        width={1400}
        height={800}
        className='absolute top-0 right-0 left-0 bottom-0 h-full z-10 object-cover object-center opacity-20'
      />
      <div className='text-center mb-4 relative z-20'>
        <h2 className='text-lg font-bold'>Patwari Villa</h2>
        <p className='text-sm text-gray-600'>187/5/B/1, Matikata, Dewan Para</p>
        <p className='text-sm text-gray-600'>Phone: 01976-084208</p>
      </div>
      <h2 className='text-center text-xl font-bold text-red-600 relative z-20'>
        Rental Receipt
      </h2>
      <div className='border-t border-gray-300 pt-4 mt-2 relative z-20'>
        <div className='flex justify-between'>
          <span className='font-bold'>Receipt No:</span>
          <span className='text-gray-700'>383</span>
        </div>
        <div className='flex justify-between'>
          <span className='font-bold'>Date:</span>
          <span className='text-gray-700'>
            {String(new Date().getDate()).padStart(2, '0')}/
            {String(new Date().getMonth() + 1).padStart(2, '0')}/
            {String(new Date().getFullYear()).slice(-2)}
          </span>
        </div>
      </div>
      <div className='mt-4 relative z-20'>
        <div className='flex justify-between'>
          <span className='font-bold'>Tenant Name:</span>
          <span className='text-gray-700'>Ismail Hossain</span>
        </div>
        <div className='flex justify-between'>
          <span className='font-bold'>Flat No:</span>
          <span className='text-gray-700'>A-1</span>
        </div>
        <div className='flex justify-between'>
          <span className='font-bold'>Month:</span>
          <span className='text-gray-700'>April</span>
        </div>
        <div className='flex justify-between'>
          <span className='font-bold'>Rent Amount:</span>
          <span className='text-gray-700'>5000/-</span>
        </div>
        <div className='flex justify-between'>
          <span className='font-bold'>Advanced Amount:</span>
          <span className='text-gray-700'>2000/-</span>
        </div>
        <div className='flex justify-between'>
          <span className='font-bold'>Gas Bill:</span>
          <span className='text-gray-700'>-</span>
        </div>
        <div className='flex justify-between'>
          <span className='font-bold'>Water Bill:</span>
          <span className='text-gray-700'>500/-</span>
        </div>
        <div className='flex justify-between'>
          <span className='font-bold'>Others:</span>
          <span className='text-gray-700'>20/-</span>
        </div>
        <div className='flex justify-between border-t border-gray-300 mt-2 pt-2'>
          <span className='font-bold'>Total:</span>
          <span className='text-gray-800 font-bold'>5520/-</span>
        </div>
      </div>
      <div className='mt-6 text-right border-t border-gray-500 pt-2 relative z-20'>
        <span className='text-sm font-bold block pt-6'>Sharif Alaul</span>
        <span className='text-sm text-gray-700'>Owner</span>
      </div>
    </div>
  );
};

const Home = () => {
  const { isMobileSidebarOpen } = useContextData();
  const receiptRef = useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleDownloadPDF = async () => {
    if (receiptRef.current) {
      const originalBackground = receiptRef.current.style.background;
      receiptRef.current.style.background = '#ffffff';

      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        logging: true,
        backgroundColor: '#ffffff',
      });

      receiptRef.current.style.background = originalBackground;

      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save('receipt.pdf');
    }
  };

  return (
    <div className='flex flex-col min-h-screen bg-gray-200 '>
      {/* Navbar */}

      <div className='flex flex-1 mt-14'>
        {/* Sidebar for Desktop */}
        {/* isSidebarOpen ? 'md:w-64' : 'md:w-16', */}
        <div
          className={cn(
            'bg-blue-600 text-white transition-all duration-300 p-4 flex-col z-40',
            'hidden lg:flex',
            isSidebarOpen ? 'w-64' : 'w-16',
            isMobileSidebarOpen
              ? 'fixed top-14 left-0 h-full flex '
              : 'fixed top-14 -left-64 md:left-0 h-full flex ',
          )}
        >
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className='mb-4 cursor-pointer '
          >
            <Menu size={24} />
          </button>

          <div>
            {isSidebarOpen && (
              <>
                <h2 className='text-lg font-bold'>Patwari Villa</h2>
                <p className='text-sm'>187/5/B, Matikata, Dewan Para</p>
                <p className='text-sm mb-6'>Phone: 01976-084208</p>
              </>
            )}
            <div className='flex flex-col gap-3'>
              <button
                className='bg-blue-700 p-2 rounded flex items-center gap-2 hover:bg-blue-800 cursor-pointer'
                title='New Receipt'
              >
                <Plus size={16} />
                {isSidebarOpen && <span className='ml-2'>New Receipt</span>}
              </button>
              <button
                className='bg-blue-700 p-2 rounded flex items-center gap-2 hover:bg-blue-800 cursor-pointer'
                title='Edit Receipt'
              >
                <Edit size={16} />
                {isSidebarOpen && <span className='ml-2'>Edit Receipt</span>}
              </button>
              <button
                className='bg-blue-700 p-2 rounded flex items-center gap-2 hover:bg-blue-800 cursor-pointer'
                title='Delete Receipt'
              >
                <Trash2 size={16} />
                {isSidebarOpen && <span className='ml-2'>Delete Receipt</span>}
              </button>
              <button
                className='bg-blue-700 p-2 rounded flex items-center gap-2 hover:bg-blue-800 cursor-pointer'
                title='Download PDF'
                onClick={handleDownloadPDF}
              >
                <Download size={16} />
                {isSidebarOpen && <span className='ml-2'>Download PDF</span>}
              </button>
              <button
                className='bg-blue-700 p-2 rounded flex items-center gap-2 hover:bg-blue-800 cursor-pointer'
                title='Send to Tenant'
              >
                <Send size={16} />
                {isSidebarOpen && <span className='ml-2'>Send to Tenant</span>}
              </button>
              <button
                className='bg-gray-700 p-2 rounded flex items-center gap-2 hover:bg-gray-800 mt-4 cursor-pointer'
                title='Admin Control'
              >
                <Settings size={16} />
                {isSidebarOpen && <span className='ml-2'>Admin Control</span>}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className='flex-1 flex justify-center items-center p-6 pb-20 md:pb-6'>
          <Receipt receiptRef={receiptRef} />
        </div>

        {/* Mobile Bottom Bar */}
        <div className='fixed bottom-0 left-0 w-full bg-blue-600 text-white shadow-md z-50 flex justify-around items-center h-14 lg:hidden'>
          <button className='flex flex-col items-center justify-center hover:text-blue-200'>
            <LayoutDashboard size={20} />
            <span className='text-xs'>Dashboard</span>
          </button>
          <button className='flex flex-col items-center justify-center hover:text-blue-200'>
            <PlusCircle size={20} />
            <span className='text-xs'>New</span>
          </button>
          <button className='flex flex-col items-center justify-center hover:text-blue-200'>
            <Users size={20} />
            <span className='text-xs'>Tenants</span>
          </button>
          <button
            className='flex flex-col items-center justify-center hover:text-blue-200'
            onClick={handleDownloadPDF}
          >
            <Download size={20} />
            <span className='text-xs'>Download</span>
          </button>
          <button className='flex flex-col items-center justify-center hover:text-blue-200'>
            <Settings size={20} />
            <span className='text-xs'>More</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
