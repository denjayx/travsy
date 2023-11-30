import React from "react";

import { Img, Text } from "components";

const HomeGuestStep = (props) => {
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
            className="text-2xl md:text-[22px] text-teal-900 sm:text-xl w-auto"
            size="txtInterSemiBold24"
          >
            {props?.pilihdestinasi}
          </Text>
        </div>
        <div className="flex flex-col items-start justify-center w-full">
          <Text
            className="leading-[24.00px] max-w-[346px] md:max-w-full text-base text-gray-700"
            size="txtInterRegular16Gray700"
          >
            {props?.destinationdescription}
          </Text>
        </div>
      </div>
    </>
  );
};

HomeGuestStep.defaultProps = {
  pilihdestinasi: "Pilih Destinasi",
  destinationdescription:
    "Jelajahi keindahan pulau bali dengan pilihan destinasi menarik dari kami. Setiap tempat memiliki cerita dan keunikan tersendiri yang menunggu untuk Anda temukan.Yuk segera pesan layanan kami.",
};

export default HomeGuestStep;
