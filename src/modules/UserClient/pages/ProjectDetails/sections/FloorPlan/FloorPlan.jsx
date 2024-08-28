import { useState } from "react";
import { FloorCard } from "./Components";

export const FloorPlan = ({
  apartments,
  name,
  address,
  city,
  state,
  country,
  office_working_days,
  tour_accept_hours,
  working_hours,
  fee,
}) => {
  const filterBtn = ["All", "Studio", "1 Bed", "2 Bed", "3 Bed", "4 Bed"];
  const [id, setId] = useState("All");

  const handleFilter = (id) => {
    filterBtn.map((btn) => {
      if (btn === id) {
        setId(btn);
      }
    });
  };

  return (
    <div className="px-4 space-y-8" id="floor-plan">
      <h2 className="md:text-2xl font-semibold text-xl md:text-start">
        Floor Plan & Pricing
      </h2>
      <div className="flex justify-start items-center space-x-5 bg-gray-300 px-3 py-2 w-fit">
        {filterBtn.map((btn) => (
          <button
            key={btn}
            onClick={() => handleFilter(btn)}
            className={`text-sm md:text-base font-medium ${
              id === btn ? "text-blue-500" : ""
            }`}
          >
            {btn}
          </button>
        ))}
      </div>
      <div className="space-y-7">
        {apartments.map((item) => {
          const {
            pendingApplication,
            residentApplication,
            rent_and_lease,
            amenities,
            apartmentId,
            availability,
            available_date,
            bath_count,
            bed_count,
            building_name,
            creatorId,
            discount,
            fees,
            floor_plans,
            gallery_images,
            lease_term,
            propertyId,
            rent,
            rent_paying,
            space,
            tour_video,
            type,
            unit_image,
            unit_name,
            unit_number,
            userId,
            utilities,
            tours,
          } = item;
          return (
            <FloorCard
              tours={tours}
              fee={fee}
              key={item.apartmentId}
              amenities={amenities}
              apartmentId={apartmentId}
              availability={availability}
              available_date={available_date}
              bath_count={bath_count}
              bed_count={bed_count}
              building_name={building_name}
              creatorId={creatorId}
              discount={discount}
              fees={fees}
              floor_plans={floor_plans}
              gallery_images={gallery_images}
              propertyId={propertyId}
              rent_paying={rent_paying}
              space={space}
              tour_video={tour_video}
              type={type}
              unit_image={unit_image}
              unit_name={unit_name}
              unit_number={unit_number}
              userId={userId}
              utilities={utilities}
              name={name}
              address={address}
              city={city}
              state={state}
              country={country}
              office_working_days={office_working_days}
              tour_accept_hours={tour_accept_hours}
              working_hours={working_hours}
              rent_and_lease={rent_and_lease}
              pendingApplication={pendingApplication}
              residentApplication={residentApplication}
            />
          );
        })}
      </div>
    </div>
  );
};
