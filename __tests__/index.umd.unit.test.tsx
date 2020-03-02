import React from "react";
import { render, cleanup } from "@testing-library/react";
import Rex from "../lib/index.umd";

const { default: useRex, createRexStore } = Rex;

afterEach(cleanup);

const useInput = (defaultValue: string = "") => {
  const [state, setState] = useRex({
    title: "Sample Input",
    value: defaultValue
  });

  return {
    get title() {
      return state.title;
    },
    get value() {
      return state.value;
    },
    updateValue(value: string) {
      setState({ value });
    }
  };
};

type useInputReturnType = ReturnType<typeof useInput>;

const InputField = ({
  children,
  defaultValue
}: {
  children: (hook: useInputReturnType) => any;
  defaultValue?: string;
}) => children(useInput(defaultValue));

const setupInputField = (props: { defaultValue?: string } = {}) => {
  const returnValue = {} as useInputReturnType;
  render(
    <InputField {...props}>
      {val => {
        Object.assign(returnValue, val);
        return null;
      }}
    </InputField>
  );
  return returnValue;
};

const { RexProvider, useStore } = createRexStore(useInput);

const InputFieldWithStore = ({
  children
}: {
  children: (hook: useInputReturnType) => any;
}) => children(useStore());

const setupInputFieldWithStore = () => {
  const returnValue = {} as useInputReturnType;
  render(
    <RexProvider>
      <InputFieldWithStore>
        {val => {
          Object.assign(returnValue, val);
          return null;
        }}
      </InputFieldWithStore>
    </RexProvider>
  );
  return returnValue;
};

describe("Testing CJS build", () => {
  test("useInput", () => {
    const inputData = setupInputField();
    expect(inputData.value).toBe("");
    inputData.updateValue("Foo Bar!");
    expect(inputData.value).toBe("Foo Bar!");
    expect(inputData.title).toBe("Sample Input");
  });

  test("useInput with default value", () => {
    const inputData = setupInputField({ defaultValue: "Text goes here..." });
    expect(inputData.value).toBe("Text goes here...");
    inputData.updateValue("Foo Bar!");
    expect(inputData.value).toBe("Foo Bar!");
    expect(inputData.title).toBe("Sample Input");
  });

  test("useInput as store", () => {
    const inputData = setupInputFieldWithStore();
    expect(inputData.value).toBe("");
    inputData.updateValue("Foo Bar!");
    expect(inputData.value).toBe("Foo Bar!");
    expect(inputData.title).toBe("Sample Input");
  });
});
