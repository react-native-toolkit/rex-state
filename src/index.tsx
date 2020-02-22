import React, {
  useState,
  ReactNode,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  Context
} from "react";

export const createRexStore: <T extends { [key: string]: Rex<any> }>(
  store: T
) => {
  RexProvider: ({ children }: { children: React.ReactNode }) => JSX.Element;
  useRex: () => T;
} = store => {
  let RexContext: Context<typeof store>;

  const useRex = () => {
    const store = useContext(RexContext);
    return store;
  };

  const RexProvider = ({ children }: { children: ReactNode }) => {
    const intializedStore: typeof store = {};
    for (const item in store) {
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

  public get state(): Readonly<S> {
    return this.internalState;
  }

  public set state(value: Readonly<S>) {
    [this.internalState, this.updateInternalState] = useState<S>(value);
  }

  public setState<K extends keyof S>(newInternalState: Pick<S, K> | S): void {
    if (!this.internalState) {
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
