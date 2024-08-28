import { config } from "@/config";
import { Icons } from "@/utils";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
export const Card = ({ item }) => {
  console.log(item);
  const {
    propertyId,
    slug,
    address,
    city,
    country,
    listing_image,
    name,
    state,
    zip,
    apartment_rent_range,
    apartment_type_range,
  } = item;
  return (
    <div className="bg-white shadow-custom-light rounded-lg overflow-hidden transition-all duration-200 hover:-translate-y-2 cursor-pointer md:my-4 my-2">
      <Link to={`/property/${slug && slug}`}>
        <LazyLoadImage
          className="w-full lg:h-[280px] h-[200px] rounded-t-lg border-b object-cover"
          src={`${config.url.ASSET_URL}${listing_image.link}`}
          alt="Sunset in the mountains"
          loading="lazy"
        />
        <div className="py-4 px-4">
          <h3 className="lg:text-2xl pb-2 font-semibold"> {name} </h3>
          <div className="flex justify-start items-start space-x-2 py-2">
            <p className="text-gray-700 text-base pt-0.5">
              <Icons.Location className="text-black" />{" "}
            </p>
            <p className="text-black text-base flex flex-col items-start justify-center">
              <span className="lg:text-base text-xs">{address},</span>
              <span className="md:text-base text-xs">
                {city}, {state}, {zip}{" "}
              </span>
            </p>
          </div>
          {apartment_rent_range && apartment_type_range && (
            <p className="flex items-center space-x-2 text-base">
              <Icons.Bed className="lg:text-lg" />
              <span className="lg:text-base text-xs">
                {apartment_type_range} ({apartment_rent_range})
              </span>
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};
