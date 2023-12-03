import Text from "../Text/index"; 
import Input from "../Input/index"; 
import Button from "../Buttons/Button"; 

const SearchWisata = () => {
  return (
    <div className="bg-gray-50 flex flex-col font-inter gap-16 items-center justify-start mx-auto w-full">
      <div className="flex flex-col gap-10 items-center justify-start w-full">
      
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
          />
          {/* Replace the following line with the correct import for Button component */}
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
    </div>
  );
};

export default SearchWisata;
