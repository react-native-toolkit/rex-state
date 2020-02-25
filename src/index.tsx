import React, { useState, createContext, useContext, ReactNode } from "react";

const useRex = <T extends object>(
  defaultState: T
): [T, <K extends keyof T>(newInternalState: Pick<T, K> | T) => void] => {
  const [state, updateInternalState] = useState(defaultState);

  const setState = <K extends keyof T>(newInternalState: Pick<T, K> | T) => {
    updateInternalState({
      ...state,
      ...newInternalState
    });
  };

  return [state, setState];
};

export const createRexStore = <T extends object>(
  useRexState: () => T
): {
  RexProvider: ({ children }: { children: ReactNode }) => JSX.Element;
  useStore: () => T;
} => {
  const RexContext = createContext<ReturnType<() => T>>({} as T);
  const { Provider } = RexContext;

  const useStore = () => {
    const store = useContext(RexContext);
    return store;
  };

  const RexProvider = ({ children }: { children: ReactNode }) => {
    const state = useRexState();
    return <Provider value={state}>{children}</Provider>;
  };

  return { RexProvider, useStore };
};

export default useRex;
