"use client";

import ContactDrawer from "@/components/contact/ContactDrawer";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type ContactDrawerContextType = {
  isContactDrawerOpen: boolean;
  openContactDrawer: () => void;
  closeContactDrawer: () => void;
};

const ContactDrawerContext =
  createContext<ContactDrawerContextType | null>(null);

type ContactDrawerProviderProps = {
  children: ReactNode;
};

export function ContactDrawerProvider({
  children,
}: ContactDrawerProviderProps) {
  const [isContactDrawerOpen, setIsContactDrawerOpen] =
    useState(false);

  const openContactDrawer = useCallback(() => {
    setIsContactDrawerOpen(true);
  }, []);

  const closeContactDrawer = useCallback(() => {
    setIsContactDrawerOpen(false);
  }, []);

  const contextValue = useMemo(
    () => ({
      isContactDrawerOpen,
      openContactDrawer,
      closeContactDrawer,
    }),
    [
      isContactDrawerOpen,
      openContactDrawer,
      closeContactDrawer,
    ],
  );

  return (
    <ContactDrawerContext.Provider value={contextValue}>
      {children}

      <ContactDrawer
        isOpen={isContactDrawerOpen}
        onClose={closeContactDrawer}
      />
    </ContactDrawerContext.Provider>
  );
}

export function useContactDrawer() {
  const context = useContext(ContactDrawerContext);

  if (!context) {
    throw new Error(
      "useContactDrawer must be used inside ContactDrawerProvider",
    );
  }

  return context;
}