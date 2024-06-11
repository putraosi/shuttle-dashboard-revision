import { isEmpty } from "lodash";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { USER_LS } from "../../constants";
import { useForm } from "../../hooks";
import { resetDataLogin } from "../../redux";
import { fetchLogin } from "../../services/request";
import { storeData } from "../../utils";
import { Button, InfoError } from "../atoms";
import { Input } from "../molecules";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useSelector((state) => state.login);

  const [form, setForm] = useForm({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useForm({});

  useEffect(() => {
    if (login?.data) {
      storeData(USER_LS, login?.data);
      dispatch(resetDataLogin());

      navigate("/user-list", { replace: true });
    }
  }, [login]);

  console.log("cek login", login);

  const validation = () => {
    let error = {};

    if (isEmpty(form?.email)) error.email = "Please input your email.";
    if (isEmpty(form?.password)) error.password = "Please input your password.";

    setFormError(error);

    console.log("cek error", isEmpty(error));

    if (isEmpty(error)) onLogin();
  };

  const onLogin = () => {
    const body = {
      email: form?.email,
      password: form?.password,
    };

    console.log("cek b", body);

    dispatch(fetchLogin(body));
  };

  const isError = useMemo(() => (login?.error ? true : false), [login.error]);

  return (
    <form className="flex flex-col gap-4 max-w-[300px] items-center">
      <h1 className="font-bold text-4xl mb-4">{"Login"}</h1>
      <Input
        className={"min-w-[300px]"}
        label={"Email"}
        placeholder={"Enter email"}
        value={form?.email}
        error={formError?.email}
        onChangeText={(value) => {
          if (value) setFormError("email", "");
          setForm("email", value);
        }}
      />

      <Input
        className={"min-w-[300px]"}
        type="password"
        label={"Password"}
        placeholder={"Enter password"}
        value={form?.password}
        error={formError?.password}
        onChangeText={(value) => {
          if (value) setFormError("password", "");
          setForm("password", value);
        }}
      />

      {isError && <InfoError message={login.error} />}

      <Button
        className={"min-w-[300px] mt-2"}
        label={"Login"}
        loading={login?.isLoading}
        onClick={() => validation()}
      />
    </form>
  );
};

export default LoginForm;
