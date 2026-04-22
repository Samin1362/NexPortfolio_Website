"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  createUserWithEmailAndPassword,
  onIdTokenChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase/client";

type AuthStatus = "loading" | "unconfigured" | "signed-in" | "signed-out";

type AuthContextValue = {
  status: AuthStatus;
  user: User | null;
  idToken: string | null;
  getIdToken: (forceRefresh?: boolean) => Promise<string | null>;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    displayName?: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");
  const authRef = useRef<ReturnType<typeof getFirebaseAuth> | null>(null);

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setStatus("unconfigured");
      return;
    }
    const auth = getFirebaseAuth();
    authRef.current = auth;
    const unsubscribe = onIdTokenChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        setUser(firebaseUser);
        setIdToken(token);
        setStatus("signed-in");
      } else {
        setUser(null);
        setIdToken(null);
        setStatus("signed-out");
      }
    });
    return () => unsubscribe();
  }, []);

  const getIdToken = useCallback(async (forceRefresh = false) => {
    const current = authRef.current?.currentUser ?? null;
    if (!current) return null;
    return current.getIdToken(forceRefresh);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const auth = getFirebaseAuth();
    await signInWithEmailAndPassword(auth, email, password);
  }, []);

  const register = useCallback(
    async (email: string, password: string, displayName?: string) => {
      const auth = getFirebaseAuth();
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      if (displayName && credential.user) {
        await updateProfile(credential.user, { displayName });
      }
    },
    [],
  );

  const logout = useCallback(async () => {
    const auth = getFirebaseAuth();
    await signOut(auth);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ status, user, idToken, getIdToken, login, register, logout }),
    [status, user, idToken, getIdToken, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>.");
  }
  return ctx;
}
