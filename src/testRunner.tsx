import React from "react";
import { render, cleanup, act } from "@testing-library/react";

const testRunner = (title: string, useRex: any, createRexStore: any) => {
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

  const { RexProvider, useStore, injectStore } = createRexStore(useInput);

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

  const InputFieldWithInject = injectStore(["value", "updateValue"])(
    (fieldProps: {
      children: ({
        value,
        updateValue
      }: {
        value: useInputReturnType["value"];
        updateValue: useInputReturnType["updateValue"];
      }) => null;
      value: useInputReturnType["value"];
      updateValue: useInputReturnType["updateValue"];
    }) =>
      fieldProps.children({
        value: fieldProps.value,
        updateValue: fieldProps.updateValue
      })
  );

  const setupInputFieldWithInject = () => {
    const returnValue = {} as {
      value: useInputReturnType["value"];
      updateValue: useInputReturnType["updateValue"];
    };

    const TitleComponent = injectStore("title")(
      (titleProps: { title: useInputReturnType["title"] }) => {
        return (
          <>
            <h1>{titleProps.title}</h1>
            <p>{Math.random()}</p>
          </>
        );
      }
    );

    const InputFieldComponent = () => {
      return (
        <InputFieldWithInject>
          {(val: object) => {
            Object.assign(returnValue, val);
            return null;
          }}
        </InputFieldWithInject>
      );
    };

    const tree = render(
      <RexProvider>
        <TitleComponent />
        <InputFieldComponent />
      </RexProvider>
    );

    return {
      returnValue,
      tree
    };
  };

  const setupErrorComponent = () => {
    const TitleComponent = injectStore("title")(
      (titleProps: { title: useInputReturnType["title"] }) => {
        return (
          <>
            <h1>{titleProps.title}</h1>
            <p>{Math.random()}</p>
          </>
        );
      }
    );

    const tree = render(<TitleComponent />);

    return tree;
  };

  afterEach(cleanup);

  describe(title, () => {
    test("useInput", () => {
      const inputData = setupInputField();
      expect(inputData.value).toBe("");
      act(() => {
        inputData.updateValue("Foo Bar!");
      });
      expect(inputData.value).toBe("Foo Bar!");
      expect(inputData.title).toBe("Sample Input");
    });

    test("useInput with default value", () => {
      const inputData = setupInputField({ defaultValue: "Text goes here..." });
      expect(inputData.value).toBe("Text goes here...");
      act(() => {
        inputData.updateValue("Foo Bar!");
      });
      expect(inputData.value).toBe("Foo Bar!");
      expect(inputData.title).toBe("Sample Input");
    });

    test("useInput as store", () => {
      const inputData = setupInputFieldWithStore();
      expect(inputData.value).toBe("");
      act(() => {
        inputData.updateValue("Foo Bar!");
      });
      expect(inputData.value).toBe("Foo Bar!");
      expect(inputData.title).toBe("Sample Input");
    });

    test("useInput with injectStore", () => {
      const { returnValue: inputData, tree } = setupInputFieldWithInject();
      expect(inputData.value).toBe("");

      /**
       * The tree contains a `TitleComponent` which should not
       * re-render when the input data is updated.
       *
       * To ensure that, a random number is generated in the dom tree
       * and is compared before & after the update of the input data.
       */
      const { container } = tree;
      const pTagText = container.querySelector("p");
      const titleComponentStats = pTagText?.innerHTML;

      act(() => {
        inputData.updateValue("Foo Bar!");
      });
      expect(inputData.value).toBe("Foo Bar!");

      const { container: updatedContainer } = tree;
      const updatedPTagText = updatedContainer.querySelector("p");
      const updatedTitleComponentStats = updatedPTagText?.innerHTML;

      expect(titleComponentStats).toBe(updatedTitleComponentStats);
    });

    test("Component throws the right error message if Provider is missing", () => {
      const renderModule = () => {
        const result = setupErrorComponent();
        return result;
      };
      expect(renderModule).toThrow();
    });
  });
};

export default testRunner;
