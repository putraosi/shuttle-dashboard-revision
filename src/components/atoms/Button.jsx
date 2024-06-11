import React from "react";
import { IcLoading } from "../../assets";

const Button = ({ className, loading, disable, label, onClick }) => {
  const getStyle = () => {
    // PRIMARY
    let styleButton =
      "bg-primary-main border-primary-main hover:bg-primary-hover hover:border-primary-hover active:bg-primary-pressed active:border-primary-pressed";
    let styleLabel = "text-neutral-10";

    return {
      button: styleButton,
      label: styleLabel,
    };
  };

  const onPress = (e) => {
    if (!onClick || loading) return null;

    onClick(e);
  };

  const style = getStyle();

  return (
    <button
      type="button"
      disabled={disable}
      className={`px-4 py-2.5 bg-primary-main border border-primary-main rounded-lg flex flex-row items-center justify-center cursor-pointer ${style.button} ${className}`}
      onClick={(e) => onPress(e)}
    >
      {loading ? (
        <IcLoading className="animate-spin"/>
      ) : (
        <label className={`font-bold ${style.label}`}>{label}</label>
      )}
    </button>
  );
};

export default Button;
