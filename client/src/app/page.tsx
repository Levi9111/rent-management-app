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
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';

import { cn } from '@/lib/utils';
import { useContextData } from '@/ContextProvider/Provider';

import Receipt from '@/CustomComponents/Receipt';

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
      <div className='flex flex-1 mt-14'>
        {/* Sidebar */}
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
      </div>
    </div>
  );
};

export default Home;
