import React from "react";

const sizeClasses = {
  txtInterSemiBold24Lightblue800: "font-inter font-semibold",
  txtInterRegular16Gray600: "font-inter font-normal",
  txtInterRegular16Lightblue800: "font-inter font-normal",
  txtInterRegular16Gray700: "font-inter font-normal",
  txtInterRegular20: "font-inter font-normal",
  txtInterRegular16WhiteA700: "font-inter font-normal",
  txtInterBold48: "font-bold font-inter",
  txtInterRegular12Lightblue800: "font-inter font-normal",
  txtInterSemiBold24: "font-inter font-semibold",
  txtInterBold32: "font-bold font-inter",
  txtInterSemiBold16: "font-inter font-semibold",
  txtInterBold64: "font-bold font-inter",
  txtInterSemiBold20: "font-inter font-semibold",
  txtInterRegular12: "font-inter font-normal",
  txtInterSemiBold20Lightblue800: "font-inter font-semibold",
  txtInterRegular16: "font-inter font-normal",
  txtInterRegular20Gray500: "font-inter font-normal",
};

const Text = ({ children, className = "", size, as, ...restProps }) => {
  const Component = as || "p";

  return (
    <Component
      className={`text-left ${className} ${size && sizeClasses[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };
