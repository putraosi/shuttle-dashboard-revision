import React, { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { InfoError } from "../atoms";

const Input = ({
  className,
  type = "text",
  label,
  value,
  placeholder,
  onChangeText,
  error,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(true);

  let isShowIconRight = false;
  const isShowError = error ? true : false;

  if (type === "password") {
    isShowIconRight = true;

    if (isShowPassword) type = "text";
  }

  return (
    <div className={` bg-white flex flex-col gap-1 ${className} `}>
      <label>{label}</label>

      <div
        className={`flex flex-1 flex-row items-center gap-2  border  rounded-lg  ${
          isFocused ? "border-primary-main" : "border-neutral-50"
        }`}
      >
        <input
          type={type}
          className="pl-4 py-2.5 flex-1 outline-none bg-transparent rounded-lg border-transparent"
          placeholder={placeholder}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(event) => onChangeText(event.target.value)}
        />

        {isShowIconRight && (
          <span
            className="pr-4 cursor-pointer"
            onClick={() => setIsShowPassword((prev) => !prev)}
          >
            {isShowPassword ? <BiShow size={24} /> : <BiHide size={24} />}
          </span>
        )}
      </div>

      {isShowError && <InfoError message={error} />}
    </div>
  );
};

export default Input;
