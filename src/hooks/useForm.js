import { useState } from "react";

export const useForm = (initialValue) => {
  const [values, setValues] = useState(initialValue);
  return [
    values,
    (formType, formParams) => {
      if (formType === "reset") return setValues(initialValue);
      if (formType === "all") return setValues(formParams);

      return setValues({ ...values, [formType]: formParams });
    },
  ];
};
