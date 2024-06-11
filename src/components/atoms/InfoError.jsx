import React from "react";
import { FaInfoCircle } from "react-icons/fa";

const InfoError = ({ className, message }) => {
  return (
    <div className={`flex flex-row gap-1.5 items-center ${className}`}>
      <FaInfoCircle size={16} className="text-danger-main" />
      <span className="text-xs text-danger-main font-medium">{message}</span>
    </div>
  );
};

export default InfoError;
