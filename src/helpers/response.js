export const setErrorResponse = (data) => {
  let message = data.message;
  
  if (
    data?.response?.data &&
    data?.response?.data?.errors &&
    data?.response?.data?.errors.length
  )
    message = data?.response?.data?.errors[0].message;

  return message;
};
