import React, {
  createContext,
  useContext,
  ReactNode,
  useReducer,
  Dispatch
} from "react";

const useRex = <T extends object, K extends keyof T>(
  defaultState: T
): [T, Dispatch<Partial<Pick<T, K>>>] => {
  const [state, setState] = useReducer(
    (oldState: T, stateUpdate: Partial<Pick<T, K>>) => {
      return {
        ...oldState,
        ...stateUpdate
      };
    },
    defaultState
  );

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
