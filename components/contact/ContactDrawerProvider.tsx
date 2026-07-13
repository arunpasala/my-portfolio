"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import ContactDrawer from "./ContactDrawer";

type ContactDrawerContextValue = {
  isOpen: boolean;
  openContactDrawer: () => void;
  closeContactDrawer: () => void;
};

const ContactDrawerContext =
  createContext<ContactDrawerContextValue | null>(null);

type ContactDrawerProviderProps = {
  children: ReactNode;
};

export function ContactDrawerProvider({
  children,
}: ContactDrawerProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openContactDrawer = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeContactDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      openContactDrawer,
      closeContactDrawer,
    }),
    [
      isOpen,
      openContactDrawer,
      closeContactDrawer,
    ],
  );

  return (
    <ContactDrawerContext.Provider value={value}>
      {children}

      <ContactDrawer
        isOpen={isOpen}
        onClose={closeContactDrawer}
      />
    </ContactDrawerContext.Provider>
  );
}

export function useContactDrawer() {
  const context = useContext(
    ContactDrawerContext,
  );

  if (!context) {
    throw new Error(
      "useContactDrawer must be used inside ContactDrawerProvider.",
    );
  }

  return context;
}