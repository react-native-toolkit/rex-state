import React, { ReactNode, FC } from 'react';
import { createContext, useContextSelector } from 'use-context-selector';

export const createRexStore = <T, V>(
  useRexState: (value?: V) => T
): {
  RexProvider: FC<{
    children: ReactNode;
    value?: V;
  }>;
  useStore: {
    <K>(selector: (val: T) => K): K;
    (selector?: ((val: T) => T) | undefined): T;
  };
} => {
  const RexContext = createContext<ReturnType<() => T>>((null as any) as T);
  const { Provider } = RexContext;

  function useStore<K>(selector: (val: T) => K): K;
  function useStore(selector?: (val: T) => T): T;
  function useStore(selector: any): any {
    const store = useContextSelector(RexContext, selector || ((ctx) => ctx));
    if (!store) {
      throw new Error(
        'Component must be wrapped with a suitable <RexProvider>'
      );
    }
    return store;
  }

  const RexProvider: FC<{
    children: ReactNode;
    value?: V;
  }> = ({ children, value }) => {
    const state = useRexState(value);
    return <Provider value={state}>{children}</Provider>;
  };

  return { RexProvider, useStore };
};
