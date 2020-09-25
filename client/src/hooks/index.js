import { useState } from "react";

export const useForm = (initialState, validateField) => {
  const [values, setValues] = useState(initialState);

  return [
    values,
    (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
      validateField(e.target.name, e.target.value);
    },
  ];
};
