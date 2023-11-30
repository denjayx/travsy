import React from "react";

import { Button, Img, List, Text } from "components";
import HomeGuestCards from "components/HomeGuestCards";
import HomeGuestCardtestimoni from "components/HomeGuestCardtestimoni";
import HomeGuestScale from "components/HomeGuestScale";
import HomeGuestStep from "components/HomeGuestStep";
import HomeGuestStep1 from "components/HomeGuestStep1";
import HomeGuestStep2 from "components/HomeGuestStep2";

const HomeguestPage = () => {
  const homeGuestCardsPropList = [
    {},
    { userimage: "images/img_pexelsphotoby_1.png" },
    { userimage: "images/img_pexelsphotoby_1.png" },
    {},
  ];

  return (
    <>
      <div className="bg-gray-50 flex flex-col font-inter items-center justify-start mx-auto w-full">
        <div className="flex flex-col md:gap-10 gap-[120px] items-center justify-start overflow-auto w-auto md:w-full">
          <div className="flex flex-col items-center justify-start w-auto md:w-full">
            <header className="bg-gray-50 flex h-[95px] md:h-auto items-center justify-center md:px-5 w-full">
              <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between max-w-[1248px] w-full">
                <div className="flex sm:flex-1 sm:flex-col flex-row gap-12 items-center justify-start w-auto sm:w-full">
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
                        Paket Wisata
                      </Text>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2.5 w-auto">
                      <Text
                        className="text-base text-blue_gray-900 w-auto"
                        size="txtInterRegular16"
                      >
                        Riwayat
                      </Text>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-[9px] items-start justify-start w-auto">
                  <Button
                    className="border border-light_blue-500 border-solid cursor-pointer min-w-[98px] rounded-[24px] text-base text-center"
                    color="white_A700"
                    size="sm"
                    variant="fill"
                  >
                    Masuk
                  </Button>
                  <Button
                    className="cursor-pointer min-w-[96px] rounded-[24px] text-base text-center"
                    color="light_blue_500"
                    size="sm"
                    variant="fill"
                  >
                    Daftar
                  </Button>
                </div>
              </div>
            </header>
            <div className="flex flex-col h-[531px] md:h-auto items-center justify-center max-w-[1440px] w-full">
              <div className="flex flex-col h-[531px] md:h-auto items-end justify-start max-w-[1248px] mx-auto md:px-5 w-full">
                <div className="flex md:flex-col flex-row md:gap-10 gap-[69px] items-end justify-start w-auto">
                  <div className="flex flex-col md:gap-10 gap-[92px] h-[454px] md:h-auto items-start justify-center">
                    <div className="flex flex-col gap-8 items-start justify-start w-auto md:w-full">
                      <Text
                        className="leading-[120.00%] max-w-[652px] md:max-w-full md:text-5xl text-[64px] text-light_blue-800 tracking-[-2.00px]"
                        size="txtInterBold64"
                      >
                        <span className="text-teal-900 font-inter text-left font-bold">
                          Solusi healing
                        </span>
                        <span className="text-light_blue-800 font-inter text-left font-bold">
                          {" "}
                        </span>
                        <span className="text-light_blue-800 font-inter text-left font-bold">
                          tanpa pusing.
                        </span>
                      </Text>
                      <Text
                        className="leading-[24.00px] max-w-[652px] md:max-w-full text-base text-gray-600"
                        size="txtInterRegular16Gray600"
                      >
                        Jelajahi keindahan pulau Bali dengan pilihan destinasi
                        menarik dari kami. Setiap tempat memiliki cerita dan
                        keunikan tersendiri yang menunggu untuk Anda temukan.Yuk
                        segera pesan layanan kami.
                      </Text>
                      <div className="flex flex-row gap-[9px] items-start justify-start w-auto">
                        <Button
                          className="!text-light_blue-800 border border-light_blue-500 border-solid cursor-pointer min-w-[122px] rounded-[24px] text-base text-center"
                          color="white_A700"
                          size="sm"
                          variant="fill"
                        >
                          Mulai Trip
                        </Button>
                        <Button
                          className="cursor-pointer min-w-[176px] rounded-[24px] text-base text-center"
                          color="light_blue_500"
                          size="sm"
                          variant="fill"
                        >
                          Daftar Tourguide
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-row gap-2 items-center justify-center rounded-[12px] w-auto">
                      <Img
                        className="h-5 w-5"
                        src="images/img_arrowdown.svg"
                        alt="arrowdown"
                      />
                      <Text
                        className="text-base text-light_blue-800 w-auto"
                        size="txtInterRegular16Lightblue800"
                      >
                        Jelajahi
                      </Text>
                    </div>
                  </div>
                  <div className="relative w-[527px] sm:w-full">
                    <div className="flex flex-col items-center justify-start m-auto w-full">
                      <div className="flex flex-col gap-2.5 items-end justify-start w-full">
                        <div className="flex flex-col items-center justify-start w-[63%] md:w-full">
                          <Img
                            className="h-[211px] md:h-auto object-cover rounded-bl-[32px] rounded-br-[32px] w-full"
                            src="images/img_pexelsphotoby.png"
                            alt="pexelsphotoby"
                          />
                        </div>
                        <div className="flex flex-col items-center justify-start w-full">
                          <Img
                            className="h-[211px] md:h-auto object-cover rounded-bl-[32px] rounded-br-[32px] w-full"
                            src="images/img_rectangle8.png"
                            alt="rectangleEight"
                          />
                        </div>
                      </div>
                    </div>
                    <Img
                      className="absolute h-[156px] left-[0] object-cover top-[0] w-[156px]"
                      src="images/img_airplanetours1.png"
                      alt="airplanetoursOne"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8 items-start justify-start max-w-[1248px] mx-auto md:px-5 w-full">
            <div className="flex flex-col gap-8 items-start justify-start max-w-[930px] w-full">
              <Text
                className="md:text-3xl sm:text-[28px] text-[32px] text-teal-900 w-full"
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
              className="sm:flex-col flex-row gap-6 grid sm:grid-cols-1 md:grid-cols-2 grid-cols-4 justify-center max-w-[1248px] w-full"
              orientation="horizontal"
            >
              {homeGuestCardsPropList.map((props, index) => (
                <React.Fragment key={`HomeGuestCards${index}`}>
                  <HomeGuestCards
                    className="bg-white-A700 flex flex-col gap-4 items-start justify-start p-6 sm:px-5 rounded-[16px] w-[294px]"
                    {...props}
                  />
                </React.Fragment>
              ))}
            </List>
          </div>
          <div className="flex flex-col h-[152px] md:h-auto items-start justify-start max-w-[1246px] mx-auto md:px-5 w-full">
            <div className="flex flex-col gap-8 items-start justify-start w-auto md:w-full">
              <Text
                className="md:text-3xl sm:text-[28px] text-[32px] text-teal-900 w-auto"
                size="txtInterBold32"
              >
                Skala
              </Text>
              <div className="flex md:flex-col flex-row gap-6 items-start justify-start w-auto md:w-full">
                <HomeGuestScale
                  className="bg-white-A700 border border-light_blue-A100 border-solid flex flex-row gap-2 items-center justify-start pl-3 sm:pr-5 pr-[35px] py-2 rounded-[41px] w-auto"
                  userimage="images/img_users.png"
                />
                <HomeGuestScale
                  className="bg-white-A700 border border-light_blue-A100 border-solid flex flex-row gap-2 items-center justify-start pl-3 sm:pr-5 pr-[35px] py-2 rounded-[41px] w-auto"
                  activeusers="48"
                  activeuserstext="Tempat Wisata"
                />
                <HomeGuestScale
                  className="bg-white-A700 border border-light_blue-A100 border-solid flex flex-row gap-2 items-center justify-start pl-3 sm:pr-5 pr-[35px] py-2 rounded-[41px] w-auto"
                  userimage="images/img_userjourney1.png"
                  activeusers="24"
                  activeuserstext="Pemandu Wisata"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8 items-start justify-start max-w-[1248px] mx-auto md:px-5 w-full">
            <div className="flex flex-col gap-8 items-start justify-start max-w-[818px] w-full">
              <Text
                className="md:text-3xl sm:text-[28px] text-[32px] text-teal-900 w-full"
                size="txtInterBold32"
              >
                Kenapa Harus Travsy?
              </Text>
              <Text
                className="leading-[120.00%] max-w-[818px] md:max-w-full text-gray-600 text-xl"
                size="txtInterRegular20"
              >
                Kami berkomitmen untuk memberikan layanan yang berkualitas dan
                membuat setiap momen liburan Anda menjadi berkesan.
              </Text>
            </div>
            <div className="flex sm:flex-col flex-row gap-4 items-start justify-start w-full">
              <Button
                className="bg-cover bg-no-repeat cursor-pointer h-[72px] min-w-[246px] text-center text-xl"
                style={{ backgroundImage: "url('images/img_label.png')" }}
                shape="round"
                color="light_blue_800"
                size="md"
                variant="outline"
              >
                Perjalanan Nyaman
              </Button>
              <Button
                className="bg-cover bg-no-repeat cursor-pointer h-[72px] min-w-[189px] text-center text-xl"
                style={{
                  backgroundImage: "url('images/img_label_72x189.png')",
                }}
                shape="round"
                color="light_blue_800"
                size="md"
                variant="outline"
              >
                Hotel Terpilih
              </Button>
              <Button
                className="bg-cover bg-no-repeat cursor-pointer h-[72px] min-w-[264px] text-center text-xl"
                style={{
                  backgroundImage: "url('images/img_label_72x264.png')",
                }}
                shape="round"
                color="light_blue_800"
                size="md"
                variant="outline"
              >
                Akomodasi Bintang 5
              </Button>
              <Button
                className="bg-cover bg-no-repeat cursor-pointer h-[72px] min-w-[243px] text-center text-xl"
                style={{
                  backgroundImage: "url('images/img_label_72x243.png')",
                }}
                shape="round"
                color="light_blue_800"
                size="md"
                variant="outline"
              >
                Tour Kota Premium
              </Button>
              <Button
                className="bg-cover bg-no-repeat cursor-pointer h-[72px] min-w-[219px] text-center text-xl"
                style={{
                  backgroundImage: "url('images/img_label_72x219.png')",
                }}
                shape="round"
                color="light_blue_800"
                size="md"
                variant="outline"
              >
                Layanan 24 Jam
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-8 items-center justify-start max-w-[1248px] mx-auto md:px-5 w-full">
            <div className="flex flex-col gap-8 items-start justify-start max-w-[804px] w-full">
              <Text
                className="md:text-3xl sm:text-[28px] text-[32px] text-center text-teal-900 w-full"
                size="txtInterBold32"
              >
                3 Langkah Mudah
              </Text>
              <Text
                className="leading-[120.00%] max-w-[804px] md:max-w-full text-center text-gray-600 text-xl"
                size="txtInterRegular20"
              >
                Kesulitan dalam memesan paket liburan sudah tidak jaman! Hanya
                dengan tiga langkah mudah Anda bisa memulai liburan.
              </Text>
            </div>
            <List
              className="sm:flex-col flex-row gap-8 grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 justify-center w-auto md:w-full"
              orientation="horizontal"
            >
              <HomeGuestStep className="bg-white-A700 flex flex-col gap-2 h-[293px] md:h-auto items-start justify-start p-6 sm:px-5 rounded-[18px] w-[394px] sm:w-full" />
              <HomeGuestStep1 className="bg-white-A700 flex flex-col gap-2 h-[293px] md:h-auto items-start justify-start p-6 sm:px-5 rounded-[18px] w-[394px] sm:w-full" />
              <HomeGuestStep2 className="bg-white-A700 flex flex-col gap-2 h-[293px] md:h-auto items-start justify-start p-6 sm:px-5 rounded-[18px] w-[394px] sm:w-full" />
            </List>
          </div>
          <div className="flex flex-col gap-8 items-start justify-start left-px max-w-[1397px] md:px-5 w-full">
            <div className="flex flex-col gap-8 items-start justify-start max-w-[818px] w-full">
              <Text
                className="md:text-3xl sm:text-[28px] text-[32px] text-teal-900 w-full"
                size="txtInterBold32"
              >
                Testimoni
              </Text>
              <Text
                className="left-2.5 text-gray-500 text-xl w-full"
                size="txtInterRegular20Gray500"
              >
                Ulasan dari mereka yang telah merasakan kemudahan liburan.
              </Text>
            </div>
            <List
              className="sm:flex-col flex-row md:gap-10 gap-[63px] grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 justify-start sm:pl-5 pl-[38px] w-full"
              orientation="horizontal"
            >
              {new Array(3).fill({}).map((props, index) => (
                <React.Fragment key={`HomeGuestCardtestimoni${index}`}>
                  <HomeGuestCardtestimoni
                    className="md:pl-10 pl-14 pr-8 sm:px-5 py-8 relative w-[427px] sm:w-full"
                    {...props}
                  />
                </React.Fragment>
              ))}
            </List>
          </div>
          <div className="bg-light_blue-500 flex flex-col items-center justify-start py-16 w-full">
            <div className="flex md:flex-col flex-row md:gap-10 gap-16 items-start justify-start max-w-[1248px] mx-auto md:px-5 w-full">
              <div className="flex sm:flex-1 flex-col gap-2.5 items-start justify-start w-[583px] sm:w-full">
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
                  dari kami. Setiap tempat memiliki cerita dan keunikan
                  tersendiri yang menunggu untuk Anda temukan.Yuk segera pesan
                  layanan kami.
                </Text>
              </div>
              <List
                className="md:flex-1 sm:flex-col flex-row md:gap-10 gap-16 grid sm:grid-cols-1 grid-cols-3 w-[39%] md:w-full"
                orientation="horizontal"
              >
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
              </List>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeguestPage;
