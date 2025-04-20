'use client';
import { BasicInfo } from '@/interfaces/interface';
import {
  createContext,
  ReactNode,
  RefObject,
  useContext,
  useRef,
  useState,
} from 'react';

interface TContext {
  base_url: string;
  isMobileSidebarOpen: boolean;
  receiptRef: RefObject<HTMLDivElement | null>;
  setIsMobileSidebarOpen: (isMobileSidebarOpen: boolean) => void;
  showReceipt: boolean;
  setShowReceipt: (showReceipt: boolean) => void;
  basicInfo: BasicInfo | null;
  setBasicInfo: (basicInfo: BasicInfo) => void;
}

const Context = createContext<TContext | undefined>(undefined);
export const Provider = ({ children }: { children: ReactNode }) => {
  const receiptRef = useRef<HTMLDivElement>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [basicInfo, setBasicInfo] = useState<BasicInfo | null>(null);
  const base_url = process.env.NEXT_PUBLIC_BASE_URL!;

  return (
    <Context.Provider
      value={{
        base_url,
        setIsMobileSidebarOpen,
        isMobileSidebarOpen,
        receiptRef,
        showReceipt,
        setShowReceipt,
        basicInfo,
        setBasicInfo,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useContextData = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
