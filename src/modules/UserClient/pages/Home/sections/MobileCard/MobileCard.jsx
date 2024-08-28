import Appstore from "@/assets/HomeAssets/Appstore.png";
import GooglePlay from "@/assets/HomeAssets/GooglePlay.png";
export const MobileCard = () => {
  return (
    <div className="md:pt-32 pt-96 flex justify-center items-center">
      <div className="px-10 max-w-[1000px] py-6 bg-[#F8F8F8] md:flex space-y-4 md:space-y-0 justify-between gap-10 items-center md:rounded-xl my-8">
        <h2 className="md:text-2xl text-base text-center md:text-start font-bold">
          Get Our App For Android and iOS
        </h2>
        <div className="flex items-center gap-4">
          <img
            className="w-1/2 cursor-pointer  hover:scale-105 transition-all duration-300"
            src={GooglePlay}
            alt=""
          />
          <img
            className="w-1/2 cursor-pointer hover:scale-105 transition-all duration-300"
            src={Appstore}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
