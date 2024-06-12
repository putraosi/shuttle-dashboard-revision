import React from "react";
import { Navigate } from "react-router-dom";
import { LoginForm } from "../components";
import { USER_LS } from "../constants";
import { getData } from "../utils";

const Login = () => {
  const user = getData(USER_LS);

  if (user) return <Navigate to={"/user-list"} />;

  return (
    <div className="flex justify-center w-full min-h-screen items-center">
      <LoginForm />
    </div>
  );
};

export default Login;
