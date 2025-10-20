import { createContext, useContext, useState, ReactNode } from 'react';

type CursorColor = 'white' | 'green' | 'yellow';

interface CursorColorContextType {
  color: CursorColor;
  setColor: (color: CursorColor) => void;
}

const CursorColorContext = createContext<CursorColorContextType | undefined>(undefined);

export const CursorColorProvider = ({ children }: { children: ReactNode }) => {
  const [color, setColor] = useState<CursorColor>('white');

  return (
    <CursorColorContext.Provider value={{ color, setColor }}>
      {children}
    </CursorColorContext.Provider>
  );
};

export const useCursorColor = () => {
  const context = useContext(CursorColorContext);
  if (context === undefined) {
    throw new Error('useCursorColor must be used within a CursorColorProvider');
  }
  return context;
};
