import React from "react";

import { Button, Img, Text } from "components";

const PaketWisataSearchResultNavbar = (props) => {
  return (
    <>
      <div className={props.className}>
        <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between max-w-[1248px] w-full">
          <div className="flex am:flex-1 am:flex-col flex-row gap-12 items-center justify-start w-auto am:w-full">
            <Img
              className="h-12 w-[132px]"
              src="images/img_logo.svg"
              alt="logo"
            />
            <div className="flex flex-row gap-5 items-start justify-start w-auto">
              <div className="flex flex-col items-center justify-center p-2.5 w-auto">
                <Text
                  className="text-base text-blue_gray-900 w-auto"
                  size="txtInterRegular16"
                >
                  {props?.paketwisata}
                </Text>
              </div>
              <div className="flex flex-col items-center justify-center p-2.5 w-auto">
                <Text
                  className="text-base text-blue_gray-900 w-auto"
                  size="txtInterRegular16"
                >
                  {props?.riwayat}
                </Text>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-[9px] items-start justify-start w-auto">
            <Button
              className="border border-light_blue-500 border-solid cursor-pointer font-inter min-w-[98px] text-base text-center"
              shape="round"
              color="white_A700"
              size="md"
              variant="fill"
            >
              {props?.loginlabel}
            </Button>
            <Button
              className="cursor-pointer font-inter min-w-[96px] text-base text-center"
              shape="round"
              color="light_blue_500"
              size="md"
              variant="fill"
            >
              {props?.registerlabel}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

PaketWisataSearchResultNavbar.defaultProps = {
  paketwisata: "Paket Wisata",
  riwayat: "Riwayat",
  loginlabel: "Masuk",
  registerlabel: "Daftar",
};

export default PaketWisataSearchResultNavbar;
