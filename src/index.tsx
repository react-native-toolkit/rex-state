import React, { createContext, useContext, ReactNode } from "react";

export const createRexStore = <T extends object, V>(
  useRexState: (value?: V) => T
): {
  RexProvider: ({
    children,
    value,
  }: {
    children: ReactNode;
    value?: V;
  }) => JSX.Element;
  useStore: () => T;
} => {
  const RexContext = createContext<ReturnType<() => T>>((null as any) as T);
  const { Provider } = RexContext;

  const useStore = () => {
    const store = useContext(RexContext);
    if (!store) {
      throw new Error(
        "Component must be wrapped with a suitable <RexProvider>"
      );
    }
    return store;
  };

  const RexProvider = ({
    children,
    value,
  }: {
    children: ReactNode;
    value?: V;
  }) => {
    const state = useRexState(value);
    return <Provider value={state}>{children}</Provider>;
  };

  return { RexProvider, useStore };
};
