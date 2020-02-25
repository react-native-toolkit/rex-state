import React, {
  useState,
  ReactNode,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  Context,
  useEffect
} from "react";

export const createRexStore: <T extends { [key: string]: new () => any }>(
  store: T
) => {
  RexProvider: ({ children }: { children: React.ReactNode }) => JSX.Element;
  useRex: () => { [K in keyof typeof store]: InstanceType<typeof store[K]> };
} = store => {
  type RexStore = { [K in keyof typeof store]: InstanceType<typeof store[K]> };

  const RexContext = createContext(store);

  const useRex = () => {
    const store = useContext(RexContext);
    return store;
  };

  const RexInitializer = ({ children }) => {
    const appStore = useRex();

    for (const each in appStore) {
      console.log("initializing...");
      appStore[each].initialize();
    }

    return <>{children}</>;
  };

  const RexProvider = ({ children }: { children: ReactNode }) => {
    console.log("updating provider");
    const { Provider } = RexContext;
    return (
      <Provider value={store}>
        <RexInitializer>{children}</RexInitializer>
      </Provider>
    );
  };

  return { RexProvider, useRex };
};

class Rex<S> {
  private internalState!: Readonly<S>;
  private updateInternalState!: Dispatch<SetStateAction<S>>;
  private defaultState!: S;

  public get state(): S {
    if (!this.internalState) {
      this.initialize();
    }
    return this.internalState;
  }

  public initialize() {
    [this.internalState, this.updateInternalState] = useState<S>(
      this.defaultState
    );
  }

  public set state(value: S) {
    this.defaultState = value;
  }

  public setState<K extends keyof S>(newInternalState: Pick<S, K> | S): void {
    if (!this.internalState) {
      // TODO: This will not work after perf optimization
      // @ts-ignore
      this.state = newInternalState;
    } else {
      this.updateInternalState({
        ...this.internalState,
        ...newInternalState
      });
    }
  }
}

export default Rex;
