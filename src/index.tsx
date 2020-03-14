import React, {
  createContext,
  useContext,
  ReactNode,
  useReducer,
  Dispatch,
  ReactElement,
  useMemo
} from "react";

const useRex = <T extends object>(
  defaultState: T
): [T, Dispatch<Partial<Pick<T, keyof T>>>] => {
  const [state, setState] = useReducer(
    (oldState: T, stateUpdate: Partial<Pick<T, keyof T>>) => {
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
  injectStore: any;
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

  const injectStore = <K extends keyof T>(keys: K | K[]) => {
    return (WrappedComponent: React.ComponentType<object>) => {
      if (typeof keys === "string") {
        return (props: object) => {
          const storeData = useStore();
          const extraProps = {
            [keys]: storeData[keys]
          };
          return useMemo(
            () => <WrappedComponent {...props} {...extraProps} />,
            [...Object.values(props), extraProps[keys]]
          );
        };
      } else if (Array.isArray(keys)) {
        return (props: object) => {
          const storeData = useStore();
          const extraProps: object = keys.reduce((acc: any, key) => {
            acc[key] = storeData[key];
            return acc;
          }, {} as any);
          return useMemo(
            () => <WrappedComponent {...props} {...extraProps} />,
            [...Object.values(props), ...Object.values(extraProps)]
          );
        };
      }
    };
  };

  return { RexProvider, useStore, injectStore };
};

export default useRex;
