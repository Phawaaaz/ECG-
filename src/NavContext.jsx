import { createContext, useContext } from 'react';

export const NavContext = createContext(null);
export const MobileMenuContext = createContext({ open: false, toggle: () => {}, close: () => {} });

export function useNav() {
  return useContext(NavContext);
}

export function useMobileMenu() {
  return useContext(MobileMenuContext);
}
