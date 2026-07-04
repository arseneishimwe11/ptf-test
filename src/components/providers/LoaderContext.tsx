"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface LoaderState {
  /** True once the preloader has fully wiped out (or was skipped). */
  done: boolean;
  markDone: () => void;
}

const LoaderContext = createContext<LoaderState>({
  done: false,
  markDone: () => {},
});

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState(false);
  const markDone = useCallback(() => setDone(true), []);
  const value = useMemo(() => ({ done, markDone }), [done, markDone]);
  return (
    <LoaderContext.Provider value={value}>{children}</LoaderContext.Provider>
  );
}

export const useLoader = () => useContext(LoaderContext);
