import img from "@/assets/HomeAssets/card/BlogCard.png";
import { Button } from "@/components";
export const BlogCard = () => {
  return (
    <div className="overflow-hidden md:my-2 my-2 shadow-md rounded-lg">
      <img
        src={img}
        alt=""
        className="w-full lg:h-[280px] h-[200px] object-cover"
      />
      <div className="px-4 pb-4 pt-2">
        <div className="w-full flex justify-between items-center">
          <h3 className="md:text-lg text-sm font-light pt-2">
            John Doe | June 10, 2024
          </h3>
        </div>

        <h3 className=" md:text-xl tracking-wider text-base font-semibold md:pt-3 md:pb-6 py-3 ">
          We Are Creating Your Dream House that Functional and Visually
        </h3>
        <div className="w-full text-end">
          <Button
            className={
              "bg-transparent text-primary-color md:px-4 md:py-2 mt-2 md:mt-0 md:text-base border-2  hover:text-white hover:bg-primary-color border-primary-color"
            }
          >
            Read More
          </Button>
        </div>
      </div>
    </div>
  );
};
