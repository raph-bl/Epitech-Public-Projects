import React from "react";

const AuthButton = ({
  children,
  onClick,
  type = "submit",
  disabled = false
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full bg-[#0077ED] hover:bg-[#0066CC] dark:text-white text-white py-3.5 px-4 rounded-[12px] font-medium text-[17px] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#0077ED]"
    >
      {children}
    </button>
  );
};

export default AuthButton;
