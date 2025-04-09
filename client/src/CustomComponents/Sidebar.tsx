'use client';
import { useState } from 'react';
import {
  Menu,
  Plus,
  Edit,
  Trash2,
  Download,
  Send,
  Settings,
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';

import { cn } from '@/lib/utils';
import { useContextData } from '@/ContextProvider/Provider';
import Link from 'next/link';

const Sidebar = () => {
  const { receiptRef } = useContextData();
  const { isMobileSidebarOpen } = useContextData();
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
            <p className='text-sm'>187/5/B/1, Matikata, Dewan Para</p>
            <p className='text-sm mb-6'>Phone: 01976-084208</p>
          </>
        )}
        <div className='flex flex-col gap-3'>
          <Link
            href='/new-receipt'
            className='bg-blue-700 p-2 rounded flex items-center gap-2 hover:bg-blue-800 cursor-pointer'
            title='New Receipt'
          >
            <Plus size={16} />
            {isSidebarOpen && <span className='ml-2'>New Receipt</span>}
          </Link>
          <Link
            href='/edit-receipt'
            className='bg-blue-700 p-2 rounded flex items-center gap-2 hover:bg-blue-800 cursor-pointer'
            title='Edit Receipt'
          >
            <Edit size={16} />
            {isSidebarOpen && <span className='ml-2'>Edit Receipt</span>}
          </Link>
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
          <Link
            href='/admin-control'
            className='bg-gray-700 p-2 rounded flex items-center gap-2 hover:bg-gray-800 mt-4 cursor-pointer'
            title='Admin Control'
          >
            <Settings size={16} />
            {isSidebarOpen && <span className='ml-2'>Admin Control</span>}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
