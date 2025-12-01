import React from "react";

const AuthFormStep = ({
  isActive,
  direction = "left",
  children
}) => {
  const slideClass = direction === "left"
    ? isActive
      ? "opacity-100 translate-x-0"
      : "opacity-0 -translate-x-full pointer-events-none"
    : isActive
      ? "opacity-100 translate-x-0"
      : "opacity-0 translate-x-full pointer-events-none";

  return (
    <div
      className={`absolute inset-0 transition-all duration-500 ease-in-out ${slideClass}`}
    >
      {children}
    </div>
  );
};

export default AuthFormStep;
