import React, {
  useState,
  ReactNode,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  Context
} from "react";

export const createRexStore: <T extends { [key: string]: new () => Rex<any> }>(
  store: T
) => {
  RexProvider: ({ children }: { children: React.ReactNode }) => JSX.Element;
  useRex: () => {
    [K in keyof typeof store]: InstanceType<typeof store[K]>;
  };
} = store => {
  type RexStore = {
    [K in keyof typeof store]: InstanceType<typeof store[K]>;
  };

  let RexContext: Context<RexStore>;

  const useRex = () => {
    const store = useContext(RexContext);
    return store;
  };

  const RexProvider = ({ children }: { children: ReactNode }) => {
    const intializedStore = {} as RexStore;
    for (const item in store) {
      // @ts-ignore
      intializedStore[item] = new store[item]();
    }
    RexContext = createContext(intializedStore);
    const { Provider } = RexContext;
    return <Provider value={intializedStore}>{children}</Provider>;
  };

  return { RexProvider, useRex };
};

class Rex<S> {
  private internalState!: Readonly<S>;
  private updateInternalState!: Dispatch<SetStateAction<S>>;

  public get state(): S {
    return this.internalState;
  }

  public set state(value: S) {
    [this.internalState, this.updateInternalState] = useState<S>(value);
  }

  public setState<K extends keyof S>(newInternalState: Pick<S, K> | S): void {
    if (!this.internalState) {
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
