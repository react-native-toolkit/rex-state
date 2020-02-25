import React from "react";
import useRex from "rex-state";

const useInput = () => {
  const [state, setState] = useRex({ value: "" });

  return {
    get value() {
      return state.value;
    },
    updateValue(value: string) {
      setState({ value });
    }
  };
};

const SimpleApp = () => {
  const { value, updateValue } = useInput();

  return (
    <input
      type="text"
      value={value}
      placeholder="Add Text here..."
      onChange={event => updateValue(event.target.value)}
    />
  );
};

export default SimpleApp;
