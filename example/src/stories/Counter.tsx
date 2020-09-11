import React, { useState } from 'react';
import { createRexStore } from 'rex-state';

const useCounterHook = (initialCount?: number) => {
  const [count, setCount] = useState(initialCount || 0);

  const increaseCount = () => setCount(count + 1);
  const decreaseCount = () => setCount(count - 1);

  return {
    count,
    increaseCount,
    decreaseCount,
  };
};

const { useStore: useCounter, RexProvider: CountProvider } = createRexStore(
  useCounterHook
);

const CountDisplay = () => {
  const { count } = useCounter();

  return <h1>{count}</h1>;
};

const Controls = () => {
  const { increaseCount, decreaseCount } = useCounter();

  return (
    <>
      <button onClick={decreaseCount}>
        <span role="img" aria-label="subtract">
          ➖
        </span>
      </button>
      <button onClick={increaseCount}>
        <span role="img" aria-label="add">
          ➕
        </span>
      </button>
    </>
  );
};

export const CounterWithInitialValue = () => {
  return (
    <CountProvider value={10}>
      <CountDisplay />
      <Controls />
    </CountProvider>
  );
};

export const CounterWithoutInitialValue = () => {
  return (
    <CountProvider>
      <CountDisplay />
      <Controls />
    </CountProvider>
  );
};
