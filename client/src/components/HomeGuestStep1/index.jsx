import React from "react";

import { Img, Text } from "components";

const HomeGuestStep1 = (props) => {
  return (
    <>
      <div className={props.className}>
        <div className="flex flex-col items-center justify-start w-[81px] md:w-full">
          <Img
            className="h-20 md:h-auto object-cover w-[81px] sm:w-full"
            src="images/img_payment1.png"
            alt="paymentOne"
          />
        </div>
        <div className="flex flex-col items-start justify-center w-auto">
          <Text
            className="text-2xl md:text-[22px] text-light_blue-800 sm:text-xl w-auto"
            size="txtInterSemiBold24Lightblue800"
          >
            {props?.pembayaranonlinOne}
          </Text>
        </div>
        <div className="flex flex-col items-start justify-center w-full">
          <Text
            className="leading-[24.00px] max-w-[346px] md:max-w-full text-base text-gray-700"
            size="txtInterRegular16Gray700"
          >
            {props?.paymentdescription}
          </Text>
        </div>
      </div>
    </>
  );
};

HomeGuestStep1.defaultProps = {
  pembayaranonlinOne: "Pembayaran Online",
  paymentdescription:
    "Dengan pembayaran online, Anda dapat mengelola semua transaksi keuangan Anda dengan mudah. Hemat waktu, tanpa perlu membawa uang tunai, dan dapat diakses 24/7.",
};

export default HomeGuestStep1;
