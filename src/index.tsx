import React, {
  createContext,
  useContext,
  ReactNode,
  useReducer,
  Dispatch,
  ComponentType,
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
  injectStore: <K extends keyof T>(
    keys: K | K[]
  ) => <P extends object>(
    WrappedComponent: React.ComponentType<P>
  ) => React.ComponentType<P & Partial<Pick<T, K>>>;
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
    type PartialProps = Partial<Pick<T, K>>;

    return <P extends object>(
      WrappedComponent: ComponentType<P>
    ): ComponentType<P & PartialProps> => {
      return (props: P) => {
        const storeData = useStore();
        const extraProps: PartialProps = Array.isArray(keys)
          ? keys.reduce((acc: PartialProps, key) => {
              acc[key] = storeData[key];
              return acc;
            }, {} as PartialProps)
            // @ts-ignore
          : ({ [keys]: storeData[keys] } as { [index: K]: T[K] });
        return useMemo(() => <WrappedComponent {...props} {...extraProps} />, [
          ...Object.values(props),
          ...Object.values(extraProps)
        ]);
      };
    };
  };

  return { RexProvider, useStore, injectStore };
};

export default useRex;
