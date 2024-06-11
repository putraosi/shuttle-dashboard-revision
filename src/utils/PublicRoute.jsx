import React from "react";
import { Navigate } from "react-router-dom";
import { USER_LS } from "../constants";
import { getData } from "./localStorage";

const PublicRoute = () => {
  const user = getData(USER_LS);

  return user?.token ? (
    <Navigate to={"/user-list"} />
  ) : (
    <Navigate to={"/login"} />
  );
};

export default PublicRoute;
