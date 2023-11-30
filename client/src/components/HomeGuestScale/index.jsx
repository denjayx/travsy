import React from "react";

import { Img, Text } from "components";

const HomeGuestScale = (props) => {
  return (
    <>
      <div className={props.className}>
        <div className="bg-light_blue-50 flex flex-col h-[66px] md:h-auto items-center justify-center rounded-[50%] w-[66px]">
          <div className="flex flex-col h-12 items-center justify-start rounded-[50%] w-12">
            {!!props?.userimage ? (
              <Img
                className="h-12 md:h-auto rounded-[50%] w-12"
                alt="users"
                src={props?.userimage}
              />
            ) : null}
          </div>
        </div>
        <div className="flex flex-col items-start justify-center w-auto">
          <Text
            className="text-5xl sm:text-[38px] md:text-[44px] text-light_blue-800 w-full"
            size="txtInterBold48"
          >
            {props?.activeusers}
          </Text>
          <Text
            className="text-light_blue-800 text-xs w-[87px]"
            size="txtInterRegular12Lightblue800"
          >
            {props?.activeuserstext}
          </Text>
        </div>
      </div>
    </>
  );
};

HomeGuestScale.defaultProps = {
  activeusers: "130",
  activeuserstext: "Pengguna Aktif",
};

export default HomeGuestScale;
