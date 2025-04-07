'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

interface TContext {
  base_url: string;
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (isMobileSidebarOpen: boolean) => void;
}

const Context = createContext<TContext | undefined>(undefined);
export const Provider = ({ children }: { children: ReactNode }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const base_url = process.env.NEXT_PUBLIC_BASE_URL!;

  return (
    <Context.Provider
      value={{ base_url, setIsMobileSidebarOpen, isMobileSidebarOpen }}
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
