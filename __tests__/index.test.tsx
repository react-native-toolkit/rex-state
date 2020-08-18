import React, { useState } from "react";
// @ts-ignore
import { render, cleanup, act } from "@testing-library/react";
import { createRexStore } from "../src/index";

const useInput = (defaultValue: string = "") => {
  const [title] = useState("Sample Input");
  const [value, setValue] = useState(defaultValue);

  const updateValue = (value: string) => {
    setValue(value);
  };

  return {
    title,
    value,
    updateValue,
  };
};

type useInputReturnType = ReturnType<typeof useInput>;

const InputField = ({
  children,
  defaultValue,
}: {
  children: (hook: useInputReturnType) => any;
  defaultValue?: string;
}) => children(useInput(defaultValue));

const setupInputField = (props: { defaultValue?: string } = {}) => {
  const returnValue = {} as useInputReturnType;
  render(
    <InputField {...props}>
      {(val) => {
        Object.assign(returnValue, val);
        return null;
      }}
    </InputField>
  );
  return returnValue;
};

const { RexProvider, useStore } = createRexStore(useInput);

const InputFieldWithStore = ({
  children,
}: {
  children: (hook: useInputReturnType) => any;
}) => children(useStore());

const setupInputFieldWithStore = (props: { defaultValue?: string } = {}) => {
  const returnValue = {} as useInputReturnType;
  render(
    <RexProvider value={props.defaultValue}>
      <InputFieldWithStore>
        {(val) => {
          Object.assign(returnValue, val);
          return null;
        }}
      </InputFieldWithStore>
    </RexProvider>
  );
  return returnValue;
};

const setupInputFieldWithError = (props: { defaultValue?: string } = {}) => {
  const returnValue = {} as useInputReturnType;
  render(
    <InputFieldWithStore>
      {(val) => {
        Object.assign(returnValue, val);
        return null;
      }}
    </InputFieldWithStore>
  );
  return returnValue;
};

afterEach(cleanup);

describe("Testing Rex State", () => {
  it("useInput - no default value - without rex state", () => {
    const inputData = setupInputField();
    expect(inputData.title).toBe("Sample Input");
    expect(inputData.value).toBe("");
    act(() => {
      inputData.updateValue("New Text");
    });
    expect(inputData.value).toBe("New Text");
  });

  it("useInput - with default value - without rex state", () => {
    const inputData = setupInputField({ defaultValue: "Default Text" });
    expect(inputData.title).toBe("Sample Input");
    expect(inputData.value).toBe("Default Text");
    act(() => {
      inputData.updateValue("New Text");
    });
    expect(inputData.value).toBe("New Text");
  });

  it("useInput - no default value - with rex state", () => {
    const inputData = setupInputFieldWithStore();
    expect(inputData.title).toBe("Sample Input");
    expect(inputData.value).toBe("");
    act(() => {
      inputData.updateValue("New Text");
    });
    expect(inputData.value).toBe("New Text");
  });

  it("useInput - with default value - with rex state", () => {
    const inputData = setupInputFieldWithStore({
      defaultValue: "Default Text",
    });
    expect(inputData.title).toBe("Sample Input");
    expect(inputData.value).toBe("Default Text");
    act(() => {
      inputData.updateValue("New Text");
    });
    expect(inputData.value).toBe("New Text");
  });

  it("useStore without provider - should throw error", () => {
    const renderModule = () => {
      const result = setupInputFieldWithError();
      return result;
    };
    expect(renderModule).toThrow();
  });
});
