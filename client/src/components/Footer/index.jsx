import React from "react";

import { Img, Text } from "components";

const Footer = (props) => {
  return (
    <>
      <footer className={props.className}>
        <div className="flex md:flex-col flex-row md:gap-10 gap-16 items-start justify-start max-w-[1248px] w-full">
          <div className="flex am:flex-1 flex-col gap-2.5 items-start justify-start w-[583px] am:w-full">
            <Img
              className="h-[46px] w-[125px]"
              src="images/img_logo_white_a700.svg"
              alt="logo_One"
            />
            <Text
              className="leading-[24.00px] max-w-[583px] md:max-w-full text-base text-white-A700"
              size="txtInterRegular16WhiteA700"
            >
              Jelajahi keindahan pulau Bali dengan pilihan destinasi menarik
              dari kami. Setiap tempat memiliki cerita dan keunikan tersendiri
              yang menunggu untuk Anda temukan.Yuk segera pesan layanan kami.
            </Text>
          </div>
          <div className="flex flex-col gap-4 items-start justify-start w-auto">
            <Text
              className="text-white-A700 text-xl w-auto"
              size="txtInterSemiBold20"
            >
              Tautan
            </Text>
            <div className="flex flex-col gap-[5px] items-start justify-start w-auto">
              <Text
                className="text-base text-white-A700 w-auto"
                size="txtInterRegular16WhiteA700"
              >
                Paket Wisata
              </Text>
              <Text
                className="text-base text-white-A700 w-auto"
                size="txtInterRegular16WhiteA700"
              >
                Riwayat
              </Text>
            </div>
          </div>
          <div className="flex flex-col gap-4 items-start justify-start w-auto">
            <Text
              className="text-white-A700 text-xl w-auto"
              size="txtInterSemiBold20"
            >
              Layanan
            </Text>
            <div className="flex flex-col items-start justify-start w-auto">
              <Text
                className="text-base text-white-A700 w-auto"
                size="txtInterRegular16WhiteA700"
              >
                Tour Guide
              </Text>
              <Text
                className="text-base text-white-A700 w-auto"
                size="txtInterRegular16WhiteA700"
              >
                Paket Wisata
              </Text>
            </div>
          </div>
          <div className="flex flex-col gap-4 items-start justify-start w-auto">
            <Text
              className="text-white-A700 text-xl w-auto"
              size="txtInterSemiBold20"
            >
              Kontak
            </Text>
            <div className="flex flex-col items-start justify-start w-auto">
              <Text
                className="text-base text-white-A700 w-auto"
                size="txtInterRegular16WhiteA700"
              >
                official@travsy.id
              </Text>
              <Text
                className="text-base text-white-A700 w-auto"
                size="txtInterRegular16WhiteA700"
              >
                Sleman, Yogyakarta
              </Text>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

Footer.defaultProps = {};

export default Footer;
