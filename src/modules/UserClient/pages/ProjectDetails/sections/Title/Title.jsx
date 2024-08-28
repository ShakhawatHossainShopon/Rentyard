import { RatingStars } from "@/components";
import { Icons } from "@/utils";

export const Title = ({
  name,
  rating,
  address,
  contact_email,
  city,
  state,
  country,
  contact_number,
  website,
}) => {
  return (
    <div className="py-5 xl:flex xl:justify-between px-4">
      <div className="space-y-4">
        <h2 className="md:text-3xl sm:text-xl font-bold text-base">{name}</h2>
        <p className="text-gray-700 md:text-lg text-sm flex items-center gap-x-1.5">
          <Icons.Location className="text-blue-700" /> {address}, {city},{" "}
          {state}, {country}
        </p>
      </div>
      <div className="space-y-2 flex flex-col xl:items-end md:pt-5 pt-3">
        <div className="flex justify-start items-center space-x-1 text-yellow-400">
          <RatingStars rating={rating ? rating : 0} />
        </div>
        <p className="sm:text-sm text-xs">
          {" "}
          {contact_number} | {contact_email}{" "}
        </p>
        {website && <p className="sm:text-sm text-xs">Website: {website} </p>}
      </div>
    </div>
  );
};
