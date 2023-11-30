import React from "react";

import { Img, Text } from "components";

const HomeGuestStep2 = (props) => {
  return (
    <>
      <div className={props.className}>
        <div className="flex flex-col h-20 items-center justify-start w-20">
          <Img
            className="h-20 md:h-auto object-cover w-20"
            src="images/img_beach1.png"
            alt="beachOne"
          />
        </div>
        <div className="flex flex-col items-start justify-center w-auto">
          <Text
            className="text-2xl md:text-[22px] text-light_blue-800 sm:text-xl w-auto"
            size="txtInterSemiBold24Lightblue800"
          >
            {props?.mulaiperjalananOne}
          </Text>
        </div>
        <div className="flex flex-col items-start justify-center w-full">
          <Text
            className="leading-[24.00px] max-w-[346px] md:max-w-full text-base text-gray-700"
            size="txtInterRegular16Gray700"
          >
            {props?.userdescription}
          </Text>
        </div>
      </div>
    </>
  );
};

HomeGuestStep2.defaultProps = {
  mulaiperjalananOne: "Mulai Perjalanan",
  userdescription:
    "Nikmati perjalanan tanpa kerumitan dengan layanan travel kami. Kami hadir untuk membuat setiap perjalanan Anda menjadi pengalaman yang mudah dan menyenangkan",
};

export default HomeGuestStep2;
