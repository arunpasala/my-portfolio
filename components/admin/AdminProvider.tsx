"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Session } from "@supabase/supabase-js";

import { supabase } from "@/lib/supabase";

type OAuthProvider = "google" | "github";

type AdminContextValue = {
  session: Session | null;
  sessionLoading: boolean;
  loadingProvider: OAuthProvider | null;
  authError: string;
  adminFetch: (
    input: RequestInfo | URL,
    init?: RequestInit
  ) => Promise<Response>;
  signIn: (provider: OAuthProvider) => Promise<void>;
  signOut: () => Promise<void>;
  clearAuthError: () => void;
};

const AdminContext =
  createContext<AdminContextValue | null>(null);

export function AdminProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] =
    useState<Session | null>(null);

  const [sessionLoading, setSessionLoading] =
    useState(true);

  const [loadingProvider, setLoadingProvider] =
    useState<OAuthProvider | null>(null);

  const [authError, setAuthError] = useState("");

  // ======================================================
  // LOAD AND WATCH SESSION
  // ======================================================

  useEffect(() => {
    let active = true;

    const loadSession = async () => {
      const {
        data: { session: currentSession },
        error,
      } = await supabase.auth.getSession();

      if (!active) {
        return;
      }

      if (error) {
        setAuthError(error.message);
      }

      setSession(currentSession);
      setSessionLoading(false);
    };

    void loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        setSession(currentSession);
        setSessionLoading(false);
        setLoadingProvider(null);
      }
    );

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  // ======================================================
  // ADMIN API REQUEST
  // ======================================================

  const adminFetch = useCallback(
    async (
      input: RequestInfo | URL,
      init?: RequestInit
    ) => {
      const accessToken =
        session?.access_token;

      if (!accessToken) {
        throw new Error(
          "Your admin session is missing or expired."
        );
      }

      const headers = new Headers(
        init?.headers
      );

      headers.set(
        "Authorization",
        `Bearer ${accessToken}`
      );

      if (
        init?.body &&
        !headers.has("Content-Type")
      ) {
        headers.set(
          "Content-Type",
          "application/json"
        );
      }

      return fetch(input, {
        ...init,
        headers,
        cache: "no-store",
      });
    },
    [session?.access_token]
  );

  // ======================================================
  // SIGN IN
  // ======================================================

  const signIn = useCallback(
    async (provider: OAuthProvider) => {
      try {
        setLoadingProvider(provider);
        setAuthError("");

        const redirectTo =
          `${window.location.origin}` +
          `/auth/callback?next=${encodeURIComponent(
            "/admin"
          )}`;

        const { error } =
          await supabase.auth.signInWithOAuth({
            provider,
            options: {
              redirectTo,
            },
          });

        if (error) {
          throw error;
        }
      } catch (error) {
        setAuthError(
          error instanceof Error
            ? error.message
            : "Unable to sign in."
        );

        setLoadingProvider(null);
      }
    },
    []
  );

  // ======================================================
  // SIGN OUT
  // ======================================================

  const signOut = useCallback(async () => {
    try {
      setAuthError("");

      const { error } =
        await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      setSession(null);

      window.location.href = "/admin";
    } catch (error) {
      setAuthError(
        error instanceof Error
          ? error.message
          : "Unable to sign out."
      );
    }
  }, []);

  const value = useMemo<AdminContextValue>(
    () => ({
      session,
      sessionLoading,
      loadingProvider,
      authError,
      adminFetch,
      signIn,
      signOut,
      clearAuthError: () =>
        setAuthError(""),
    }),
    [
      session,
      sessionLoading,
      loadingProvider,
      authError,
      adminFetch,
      signIn,
      signOut,
    ]
  );

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);

  if (!context) {
    throw new Error(
      "useAdmin must be used inside AdminProvider."
    );
  }

  return context;
}