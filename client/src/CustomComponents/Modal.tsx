'use client';

import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { ReactNode } from 'react';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  isSmall?: boolean;
}

export const CustomModal = ({
  isOpen,
  onClose,
  title,
  children,
  isSmall = false,
}: CustomModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50 backdrop-blur-sm'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={cn(
              'bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative ',
              isSmall
                ? ''
                : 'md:h-max h-screen md:overflow-y-auto overflow-y-scroll md:pb-6 pb-20',
            )}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className='absolute top-3 right-3 text-gray-500 hover:text-gray-700'
            >
              <X className='w-5 h-5' />
            </button>

            {/* Modal Title */}
            {title && (
              <h2 className='text-xl font-semibold mb-4 text-gray-800'>
                {title}
              </h2>
            )}

            {/* Modal Content */}
            <div>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
