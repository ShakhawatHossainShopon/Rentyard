import img from "@/assets/HomeAssets/BannerImage/BannerImage.png";
import { Icons } from "@/utils";
export const RenterBanner = () => {
  return (
    <div className="flex justify-center items-center px-2 md:px-0 pt-16 pb-20 md:py-24">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-10 md:gap-24 items-center justify-center">
        <img
          src={img}
          className="w-10/12 xl:justify-self-end"
          alt="Renterbanner"
        />
        <div className="space-y-2">
          <h4 className="md:text-xl text-base tracking-wider">
            RENTER BENEFITS
          </h4>
          <div className="space-y-5">
            <h3 className="md:text-4xl text-2xl font-semibold leading-tight">
              WHY RENTER LOVE <br /> RENTYARD
            </h3>
            <p className="md:text-base sm:text-sm text-xs md:leading-7">
              RentYard simplifies apartment hunting with its intuitive interface
              and extensive filter options, ensuring users find the perfect
              rental quickly. Its real-time updates and comprehensive property
              details enhance the search experience, making it a favorite among
              renters.
            </p>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <Icons.Check className="text-blue-700 text-lg md:text-2xl" />{" "}
                <span className="md:text-base sm:text-sm text-xs">
                  Apply anytime anywhere
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Icons.Check className="text-blue-700 text-lg md:text-2xl" />{" "}
                <span className="md:text-base sm:text-sm text-xs">
                  Update Information & Book Tour{" "}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Icons.Check className="text-blue-700 text-lg md:text-2xl" />{" "}
                <span className="md:text-base sm:text-sm text-xs">
                  Available Web & Mobile App
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Icons.Check className="text-blue-700 text-lg md:text-2xl" />{" "}
                <span className="md:text-base sm:text-sm text-xs">
                  Rent Perfect Place You Like
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Icons.Check className="text-blue-700 text-lg md:text-2xl" />{" "}
                <span className="md:text-base sm:text-sm text-xs">
                  Pay Rent and Utilities in One Place{" "}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Icons.Check className="text-blue-700 text-lg md:text-2xl" />{" "}
                <span className="md:text-base sm:text-sm text-xs">
                  Make Work Order and Get It Done Quickly{" "}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
