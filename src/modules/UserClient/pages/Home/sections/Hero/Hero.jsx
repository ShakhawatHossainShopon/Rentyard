import React from "react";
import { Filters } from "../../Components";
import shape from "@/assets/HomeAssets/Shape.png";

export const Hero = () => {
  return (
    <div className="relative">
      <div className="md:max-h-[320px] max-h-[200px] w-full Home-background-div mx-auto relative">
        <h1 className="md:text-5xl text-2xl pt-8 md:pt-16 font-semibold text-white text-center">
          Search Your Next Home
          <img
            className="absolute top-0 max-h-[320px] md:block hidden z-10"
            src={shape}
            alt="Shape"
          />
        </h1>
        <div className="xl:max-w-[1100px] md:max-w-[700px] lg:max-w-[800px] py-8 shadow-custom-light bg-white mx-auto md:rounded-lg absolute top-8 md:top-20">
          <div>
            <Filters className={"flex-col items-center space-y-5"} />
          </div>
        </div>
      </div>
    </div>
  );
};
