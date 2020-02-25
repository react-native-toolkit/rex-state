import React from "react";
import { useFormFieldStore } from "./store/useFormField";

export default function App() {
  const {
    values,
    updateName,
    updateEmail,
    updateAge,
    updatePhone
  } = useFormFieldStore();
  return (
    <div>
      <input
        type="text"
        value={values.name}
        onChange={e => updateName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="text"
        value={values.email}
        onChange={e => updateEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="text"
        value={values.phone || ""}
        onChange={e => updatePhone(e.target.value)}
        placeholder="Phone"
      />
      <input
        type="number"
        value={values.age || ""}
        onChange={e => updateAge(parseInt(e.target.value))}
        placeholder="Age"
      />
    </div>
  );
}
