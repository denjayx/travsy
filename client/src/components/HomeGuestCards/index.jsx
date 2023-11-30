import React from "react";

import { Button, Img, Text } from "components";

const HomeGuestCards = (props) => {
  return (
    <>
      <div className={props.className}>
        <div className="flex flex-col items-center justify-start rounded-lg w-full">
          <Img
            className="h-[216px] md:h-auto object-cover rounded-lg w-full"
            alt="pexelsphotoby"
            src={props?.userimage}
          />
        </div>
        <div className="flex flex-row gap-2 items-center justify-start w-auto">
          <Img
            className="h-6 md:h-auto rounded-[50%] w-6"
            src="images/img_rectangle4.png"
            alt="rectangleFour"
          />
          <Text
            className="text-teal-900 text-xs w-auto"
            size="txtInterRegular12"
          >
            {props?.username}
          </Text>
        </div>
        <Text
          className="leading-[24.00px] max-w-[246px] md:max-w-full text-base text-teal-900"
          size="txtInterSemiBold16"
        >
          {props?.userdescription}
        </Text>
        <div className="flex flex-row gap-1 items-start justify-start w-auto">
          <Button
            className="!text-light_blue-900 cursor-pointer font-inter min-w-[54px] rounded-[9px] text-[8px] text-center"
            color="gray_50"
            size="xs"
            variant="fill"
          >
            {props?.malioborolabel}
          </Button>
          <Button
            className="!text-light_blue-900 cursor-pointer font-inter min-w-[69px] rounded-[9px] text-[8px] text-center"
            color="gray_50"
            size="xs"
            variant="fill"
          >
            {props?.gembiralokalabel}
          </Button>
          <Button
            className="!text-light_blue-900 cursor-pointer font-inter min-w-[59px] rounded-[9px] text-[8px] text-center"
            color="gray_50"
            size="xs"
            variant="fill"
          >
            {props?.prambananlabel}
          </Button>
        </div>
      </div>
    </>
  );
};

HomeGuestCards.defaultProps = {
  userimage: "images/img_pexelsphotoby_216x246.png",
  username: "Abram Saris",
  userdescription: "Pura Tanah Lot - Pura Uluwatu - Pantai Kuta",
  malioborolabel: "Malioboro",
  gembiralokalabel: "Gembira Loka",
  prambananlabel: "Prambanan",
};

export default HomeGuestCards;
