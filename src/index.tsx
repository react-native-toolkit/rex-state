import React, {
  useState,
  ReactNode,
  createContext,
  useContext,
  Dispatch,
  SetStateAction
} from "react";

const createStore = (store: object) => {
  const intializedStore = {};
  for (const item in store) {
    intializedStore[item] = new store[item]();
  }
  return intializedStore;
};

export interface RexProviderProps {
  children: ReactNode;
  store: object;
}

const initalAppState = {};

const AppContext = createContext(initalAppState);

const { Provider } = AppContext;

export const useRex = () => {
  const store = useContext(AppContext);
  return store;
};

export const RexProvider = ({ children, store }: RexProviderProps) => {
  const initializedStore = createStore(store);
  return <Provider value={initializedStore}>{children}</Provider>;
};

class Rex {
  private internalState: object;
  private updateInternalState: Dispatch<SetStateAction<object>>;

  get state() {
    return this.internalState;
  }

  set state(value: object) {
    [this.internalState, this.updateInternalState] = useState<object>(value);
  }

  public setState(newInternalState: object) {
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
