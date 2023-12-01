import React from "react";
import { Button, Input, List, Text,img } from "components";
import Footer from "components/Footer";
import HomeGuestCards from "components/HomeGuestCards";
import PaketWisataSearchResultNavbar from "components/PaketWisataSearchResultNavbar";

const PaketwisatasearchPage = () => {
  const homeGuestCardsPropList = [
    { userimage: "images/img_pexelsphotoby_2.png" },
    { userimage: "images/img_pexelsphotoby_1.png" },
    { userimage: "images/img_pexelsphotoby_1.png" },
    { userimage: "images/img_pexelsphotoby_2.png" },
  ];

  return (
    <>
      <div className="bg-gray-50 flex flex-col font-inter am:gap-10 md:gap-10 gap-16 items-center justify-start mx-auto w-full">
        <div className="flex flex-col md:gap-10 gap-[78px] items-center justify-start w-auto md:w-full">
          <PaketWisataSearchResultNavbar className="flex flex-col items-center justify-center md:px-5 w-full" />
          <div className="flex flex-col md:gap-10 gap-16 items-center justify-start max-w-[1248px] mx-auto md:px-5 w-full">
            <div className="flex flex-col gap-8 items-center justify-start w-auto md:w-full">
              <Text
                className="text-5xl am:text-[38px] md:text-[44px] text-light_blue-800 w-auto"
                size="txtInterBold48"
              >
                <span className="text-light_blue-800 font-inter text-left font-bold">
                  Destinasi mana yang ingin{" "}
                </span>
                <span className="text-teal-900 font-inter text-left font-bold">
                  kamu kunjungi?
                </span>
              </Text>
              <div className="flex md:flex-col flex-row gap-2 items-center justify-start max-w-[1248px] w-full">
                <Input
                  name="inputfields"
                  placeholder="Cari paket, destinasi atau tourguide wisata disini."
                  className="!placeholder:text-gray-500_01 !text-gray-500_01 p-0 text-base text-left w-full"
                  wrapClassName="border-2 border-light_blue-A100 border-solid md:flex-1 w-[87%] md:w-full"
                  shape="round"
                  color="white_A700"
                  size="xs"
                  variant="fill"
                ></Input>
                <Button
                  className="cursor-pointer h-14 rounded-[12px] text-base text-center w-40"
                  color="light_blue_500"
                  size="lg"
                  variant="fill"
                >
                  Cari
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-8 items-start justify-start w-auto md:w-full">
              <div className="flex flex-col gap-8 items-start justify-start max-w-[930px] w-full">
                <Text
                  className="md:text-3xl am:text-[28px] text-[32px] text-light_blue-800 w-full"
                  size="txtInterBold32"
                >
                  Paket Terpopuler
                </Text>
                <Text
                  className="leading-[120.00%] max-w-[818px] md:max-w-full text-gray-600 text-xl"
                  size="txtInterRegular20"
                >
                  Kami menyajikan beberapa paket wisata menarik yang sering
                  dikunjungi oleh wisatawan lokal maupun mancanegara.
                </Text>
              </div>
              <List
                className="am:flex-col flex-row gap-6 grid am:grid-cols-1 md:grid-cols-2 grid-cols-4 justify-center max-w-[1248px] w-full"
                orientation="horizontal"
              >
                {homeGuestCardsPropList.map((props, index) => (
                  <React.Fragment key={`HomeGuestCards${index}`}>
                    <HomeGuestCards
                      className="bg-white-A700 flex flex-col gap-4 items-start justify-start p-6 am:px-5 rounded-[16px] w-[294px]"
                      {...props}
                    />
                  </React.Fragment>
                ))}
              </List>
            </div>
          </div>
        </div>
        <Footer className="bg-light_blue-500 flex gap-2.5 items-center justify-center md:px-5 py-16 w-full" />
      </div>
    </>
  );
};

export default PaketwisatasearchPage;
