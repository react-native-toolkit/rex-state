import React, {
  createContext,
  useContext,
  ReactNode,
  useReducer,
  Dispatch,
  ComponentType,
  useMemo,
  FC,
  forwardRef,
} from "react";

const useRex = <T extends object>(
  defaultState: T
): [T, Dispatch<Partial<Pick<T, keyof T>>>] => {
  const [state, setState] = useReducer(
    (oldState: T, stateUpdate: Partial<Pick<T, keyof T>>) => {
      return {
        ...oldState,
        ...stateUpdate,
      };
    },
    defaultState
  );

  return [state, setState];
};

export const createRexStore = <T extends object, V>(
  useRexState: (value: V) => T
): {
  RexProvider: ({
    children,
    value,
  }: {
    children: ReactNode;
    value: V;
  }) => JSX.Element;
  useStore: () => T;
  injectStore: <K extends keyof T>(
    keys: K | K[]
  ) => <P extends object>(
    WrappedComponent: React.ComponentType<P>
  ) => React.ComponentType<P & Partial<Pick<T, K>>>;
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
    value: V;
  }) => {
    const state = useRexState(value);
    return <Provider value={state}>{children}</Provider>;
  };

  const injectStore = <K extends keyof T>(keys: K | K[]) => {
    type PartialProps = Partial<Pick<T, K>>;

    return <P extends object>(
      WrappedComponent: ComponentType<P>
    ): ComponentType<P & PartialProps> => {
      const MemoizedComponent: FC<P & PartialProps> = (props: P, ref) => {
        const storeData = useStore();
        const extraProps: PartialProps = Array.isArray(keys)
          ? keys.reduce((acc: PartialProps, key) => {
              acc[key] = storeData[key];
              return acc;
            }, {} as PartialProps)
          : // @ts-ignore
            ({ [keys]: storeData[keys] } as { [index: K]: T[K] });
        return useMemo(
          () => <WrappedComponent ref={ref} {...props} {...extraProps} />,
          [...Object.values(props), ...Object.values(extraProps)]
        );
      };

      const displayName = WrappedComponent.displayName;
      MemoizedComponent.displayName = `InjectStore${
        displayName ? `(${displayName})` : ""
      }`;
      const FinalComponent = (forwardRef(
        // @ts-ignore
        MemoizedComponent
      ) as any) as ComponentType<P & PartialProps>;

      return FinalComponent;
    };
  };

  return { RexProvider, useStore, injectStore };
};

export default useRex;
