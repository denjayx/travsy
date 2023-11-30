import React from "react";
import PropTypes from "prop-types";

const shapes = { round: "rounded-[12px]" };
const variants = {
  fill: {
    white_A700: "bg-white-A700 shadow-bs text-light_blue-700",
    light_blue_500: "bg-light_blue-500 shadow-bs text-white-A700",
    gray_50: "bg-gray-50",
  },
  outline: {
    light_blue_800: "border border-light_blue-800 border-solid text-white-A700",
  },
};
const sizes = { xs: "p-1", sm: "p-3.5", md: "p-6 sm:px-5" };

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape = "",
  size = "",
  variant = "",
  color = "",
  ...restProps
}) => {
  return (
    <button
      className={`${className} ${(shape && shapes[shape]) || ""} ${
        (size && sizes[size]) || ""
      } ${(variant && variants[variant]?.[color]) || ""}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  shape: PropTypes.oneOf(["round"]),
  size: PropTypes.oneOf(["xs", "sm", "md"]),
  variant: PropTypes.oneOf(["fill", "outline"]),
  color: PropTypes.oneOf([
    "white_A700",
    "light_blue_500",
    "gray_50",
    "light_blue_800",
  ]),
};

export { Button };
