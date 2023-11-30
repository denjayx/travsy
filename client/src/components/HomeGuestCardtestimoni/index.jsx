import React from "react";

import { Img, Text } from "components";

const HomeGuestCardtestimoni = (props) => {
  return (
    <>
      <div className={props.className}>
        <div className="bg-white-A700 border border-light_blue-50 border-solid flex flex-col items-start justify-center ml-auto my-auto md:pl-10 pl-14 pr-8 sm:px-5 py-8 rounded-[12px] shadow-bs1 w-[422px] sm:w-full">
          <Text
            className="text-light_blue-800 text-xl w-auto"
            size="txtInterSemiBold20Lightblue800"
          >
            {props?.username}
          </Text>
          <Text
            className="leading-[24.00px] max-w-[334px] md:max-w-full text-base text-gray-600"
            size="txtInterRegular16Gray600"
          >
            {props?.userdescription}
          </Text>
        </div>
        <Img
          className="absolute bottom-[60px] h-[74px] left-px mr-px my-auto rounded-[50%] w-[74px]"
          src="images/img_rectangle6.png"
          alt="rectangleSix"
        />
      </div>
    </>
  );
};

HomeGuestCardtestimoni.defaultProps = {
  username: "Corey Ekstrom Bothman",
  userdescription:
    "Lorem ipsum dolor sit amet consectetur. Sit fusce nulla imperdiet a a.",
};

export default HomeGuestCardtestimoni;
