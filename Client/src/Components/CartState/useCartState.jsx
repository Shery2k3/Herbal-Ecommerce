import React, { createContext, useContext, useState } from 'react';

const AppStateContext = createContext();

export const AppProvider = ({ children }) => {
  const [isCartOpen, setCartOpen] = useState(false);

  const activateCart = () => {
    setCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setCartOpen(false);
  };

  return (
    <AppStateContext.Provider value={{ isCartOpen, activateCart, closeCart }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);

  if (!context) {
    throw new Error('useAppState must be used within an AppProvider');
  }

  return context;
};
