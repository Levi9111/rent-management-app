'use client';
import { useState } from 'react';
import {
  Menu,
  Plus,
  Trash2,
  Download,
  Send,
  Settings,
  Loader,
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';

import { cn } from '@/lib/utils';
import { useContextData } from '@/ContextProvider/Provider';
import Link from 'next/link';
import { postToDB } from '@/api';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';

const Sidebar = () => {
  const { receiptRef, base_url, basicInfo } = useContextData();
  const { isMobileSidebarOpen } = useContextData();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loadingSendEmail, setLoadingSendEmail] = useState(false);
  const params = useParams();

  const generatePDF = async (element: HTMLDivElement, scale = 2) => {
    const originalBackground = element.style.background;
    element.style.background = '#ffffff';

    const canvas = await html2canvas(element, {
      scale,
      logging: true,
      backgroundColor: '#ffffff',
    });

    element.style.background = originalBackground;

    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;
    const imgWidth = pageWidth - 2 * margin;
    let imgHeight = (canvas.height * imgWidth) / canvas.width;

    if (imgHeight > pageHeight - 2 * margin) {
      imgHeight = pageHeight - 2 * margin;
    }

    pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight);

    return pdf;
  };

  const handleDownloadPDF = async () => {
    if (receiptRef.current) {
      const pdf = await generatePDF(receiptRef.current, 1.5);
      pdf.save('receipt.pdf');
    }
  };

  const handleSendReceiptToTenant = async () => {
    console.log(base_url);
    if (receiptRef.current) {
      setLoadingSendEmail(true);
      const pdf = await generatePDF(receiptRef.current, 1.5);
      const pdfBlob = pdf.output('blob');
      const formData = new FormData();
      formData.append('file', pdfBlob, 'receipt.pdf');

      if (typeof params.id === 'string') {
        formData.append('tenantId', params.id);
      } else {
        toast.error('Invalid Tenant ID!');
        return;
      }

      try {
        const result = await postToDB(
          `${base_url}/receipt/send-receipt-to-tenant`,
          formData,
        );

        console.log('Result for Email to tenant');
        console.log(result);
        if (result.success) {
          toast.success(result.message);
          setLoadingSendEmail(false);
        }
      } catch (error) {
        console.error(error);
        toast.error('Something went wrong!!');
        setLoadingSendEmail(false);
      }
    }
  };

  return (
    <div
      className={cn(
        'bg-blue-600 text-white transition-all duration-300 p-4 flex-col z-40',
        'hidden lg:flex',
        isSidebarOpen ? 'w-64' : 'w-16',
        isMobileSidebarOpen
          ? 'fixed md:static top-14 left-0 h-full md:min-h-screen flex '
          : 'fixed md:static top-14 -left-64 md:left-0 h-full md:min-h-screen flex ',
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
            <h2 className='text-lg font-bold'>{basicInfo?.villaName}</h2>
            <p className='text-sm'>{basicInfo?.streetAddress}</p>
            <p className='text-sm mb-6'>Phone: {basicInfo?.phoneNumber}</p>
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

          {/* TODO: here will be a logic if it is clicked it will take to the new-receipt page with the modal open with the informations of the previous tenant receipt */}

          {/* <Link
            href='/edit-receipt'
            className='bg-blue-700 p-2 rounded flex items-center gap-2 hover:bg-blue-800 cursor-pointer'
            title='Edit Receipt'
          >
            <Edit size={16} />
            {isSidebarOpen && <span className='ml-2'>Edit Receipt</span>}
          </Link> */}
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
            className={cn(
              'bg-blue-700 p-2 rounded flex items-center gap-2',
              !loadingSendEmail && 'hover:bg-blue-800 cursor-pointer',
            )}
            title='Send to Tenant'
            onClick={handleSendReceiptToTenant}
            disabled={loadingSendEmail}
          >
            <Send size={16} />
            {loadingSendEmail ? (
              <Loader className='animate-spin ml-2' />
            ) : (
              isSidebarOpen && <span className='ml-2'>Send to Tenant</span>
            )}
          </button>
          <Link
            href='/settings'
            className='bg-gray-700 p-2 rounded flex items-center gap-2 hover:bg-gray-800 mt-4 cursor-pointer'
            title='Admin Settings'
          >
            <Settings size={16} />
            {isSidebarOpen && <span className='ml-2'>Admin Settings</span>}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
