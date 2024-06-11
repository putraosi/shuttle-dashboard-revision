import { USER_LS } from "../constants";

export const storeData = (key, value) => {
  try {
    return localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {}
};

export const getData = (key) => {
  try {
    const value = localStorage.getItem(key);
    if (value !== null) return JSON.parse(value);
  } catch (e) {}
};

export const getToken = () => {
  const user = getData(USER_LS);
  return user.token;
};
