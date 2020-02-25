import useRex, { createRexStore } from "rex-state";

type formFields = {
  name: string;
  email: string;
  gender?: "male" | "female";
  phone?: string;
  age?: number;
};

const useFormField = () => {
  const defaultState: formFields = {
    name: "",
    email: ""
  };

  const [state, setState] = useRex(defaultState);

  return {
    get values() {
      return state;
    },
    updateName(name: formFields["name"]) {
      setState({ name });
    },
    updateEmail(email: formFields["email"]) {
      setState({ email });
    },
    updatePhone(phone: formFields["phone"]) {
      setState({ phone });
    },
    updateGender(gender: formFields["gender"]) {
      setState({ gender });
    },
    updateAge(age: formFields["age"]) {
      setState({ age });
    }
  };
};

const { RexProvider, useStore } = createRexStore(useFormField);

export const FormFieldProvider = RexProvider;
export const useFormFieldStore = useStore;
