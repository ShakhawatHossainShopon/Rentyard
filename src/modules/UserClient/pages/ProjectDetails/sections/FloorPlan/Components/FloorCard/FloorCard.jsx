import FloorIamge from "@/assets/Floorimage.png";
import {
  BookTour,
  Button,
  Imageslider,
  Modal,
  RentApply,
  SingleImage,
  VideoSlider,
} from "@/components";
import { useGetUserSelector } from "@/hooks";
import { useState } from "react";
import { AmenitiesPopUp } from "../AmenitiesPopUp";
import { CostBreakdownInfo } from "../CostBreakdownPopUp";
import { LeaseTermPopUp } from "../LeaseTermPopUp";

export const FloorCard = ({
  pendingApplication,
  residentApplication,
  tours,
  rent_and_lease,
  fee,
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
  propertyId,
  rent_paying,
  space,
  tour_video,
  type,
  unit_image,
  unit_name,
  unit_number,
  userId,
  utilities,
  name,
  address,
  city,
  state,
  country,
  office_working_days,
  tour_accept_hours,
  working_hours,
}) => {
  const { data } = useGetUserSelector();

  const [isModalOpenAmenities, setIsModalOpenAmenities] = useState(false);
  const [isModalOpenLeaseTerm, setIsModalOpenLeaseTerm] = useState(false);
  const [isModalOpenCostBreak, setIsModalOpenCostBreak] = useState(false);
  const [isModalOpenBookTour, setIsModalOpenBookTour] = useState(false);
  const [isModalOpenApplyRent, setIsModalOpenApplyRent] = useState(false);
  const [isModalOpenUnitMap, setIsModalOpenUnitMap] = useState(false);
  const [isModalOpenVirtualTour, setIsModalOpenVirtualTour] = useState(false);
  const [isModalOpenImageSlider, setIsModalOpenImageSlider] = useState(false);

  const OpenAmenities = () => {
    setIsModalOpenAmenities(true);
  };
  const OpenLeaseTerm = () => {
    setIsModalOpenLeaseTerm(true);
  };
  const OpenCostBreak = () => {
    setIsModalOpenCostBreak(true);
  };
  const OpenBookTour = () => {
    setIsModalOpenBookTour(true);
  };
  const OpenRentApply = () => {
    setIsModalOpenApplyRent(true);
  };
  const OpenUnitMap = () => {
    setIsModalOpenUnitMap(true);
  };
  const OpenVirtualTour = () => {
    setIsModalOpenVirtualTour(true);
  };
  const OpenImageSlider = () => {
    setIsModalOpenImageSlider(true);
  };

  const closeModal = () => {
    setIsModalOpenAmenities(false);
    setIsModalOpenLeaseTerm(false);
    setIsModalOpenCostBreak(false);
    setIsModalOpenBookTour(false);
    setIsModalOpenApplyRent(false);
    setIsModalOpenUnitMap(false);
    setIsModalOpenVirtualTour(false);
    setIsModalOpenImageSlider(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 divide-x-0 md:divide-x-2 px-4 md:py-0 py-8">
        <div className="flex flex-col sm:flex-row md:items-center col-span-2">
          <img src={FloorIamge} onClick={OpenImageSlider} alt="Floor Image" />
          <div className="pt-3 sm:ml-7 md:mt-0 mt-4">
            <p className="text-base md:text-base font-semibold">
              {building_name && `${building_name}-`}
              {space} sqft
            </p>
            <p className="text-base md:text-base font-semibold">
              {bed_count}, {bath_count}
            </p>
            <p className="text-lg md:text-base font-semibold">
              #{unit_number}({type})
            </p>
          </div>
        </div>

        <div className="flex flex-col md:text-center space-y-1 col-span-2 sm:col-span-1">
          <button
            onClick={OpenAmenities}
            className="bg-white text-blue-600 hover:bg-blue-600 hover:text-white py-1 w-full"
          >
            <h2 className="text-base md:text-lg font-semibold cursor-pointer">
              Amenities
            </h2>
          </button>
          <button
            onClick={OpenVirtualTour}
            className="bg-white text-black hover:bg-blue-600 hover:text-white py-1 w-full"
          >
            <p className="text-base md:text-base font-semibold cursor-pointer">
              Virtual Tour
            </p>
          </button>
          <button
            onClick={OpenUnitMap}
            className="bg-white text-black hover:bg-blue-600 hover:text-white py-1 w-full"
          >
            <p className="text-base md:text-base font-semibold cursor-pointer">
              See Unit Map
            </p>
          </button>
        </div>

        <div className="flex flex-col md:text-center space-y-1 col-span-2 sm:col-span-1">
          <h2 className="text-base md:text-lg font-semibold">Availability</h2>
          <p className="text-base md:text-base text-green-700 font-semibold">
            {availability === "Vacant" ? "Available" : availability}
          </p>
          {available_date && <p className="">{available_date}</p>}
          <button
            onClick={OpenLeaseTerm}
            className="bg-white text-black hover:bg-blue-600 hover:text-white py-1 w-full"
          >
            <p className="text-base md:text-base font-semibold cursor-pointer">
              Available Lease Term
            </p>
          </button>
        </div>

        <div className="flex flex-col md:text-center space-y-1 col-span-2 sm:col-span-1">
          <h2 className="text-base md:text-lg font-semibold">
            Rent- ${null}/
            {rent_paying === "15th of Every Month" ? "Half Month" : "Month"}
          </h2>
          <button
            onClick={OpenCostBreak}
            className="bg-white text-black hover:bg-blue-600 hover:text-white md:py-1 md:px-1.5"
          >
            <p className="text-base md:text-base font-semibold cursor-pointer">
              Cost Breakdown
            </p>
          </button>
        </div>

        <div className="flex flex-col md:items-center space-y-1 col-span-2 sm:col-span-1">
          <h2 className="text-base md:text-lg font-bold text-red-700">
            Special Offer
          </h2>
          {discount > 0 ? (
            <p className="text-base md:text-base font-semibold">
              {discount.map((item) => {
                return (
                  <p>
                    {`${item.title} - `}
                    {`$${item.amount}`}
                  </p>
                );
              })}
            </p>
          ) : (
            <div>No offer..</div>
          )}
        </div>

        <div className="flex flex-col justify-center items-center space-y-4 col-span-2">
          <Button
            className="md:w-9/12 w-full bg-cyan-500 hover:bg-cyan-600"
            onClick={OpenBookTour}
          >
            Book Tour
          </Button>
          <Button className="md:w-9/12 w-full" onClick={OpenRentApply}>
            Apply for Rent
          </Button>
        </div>
      </div>

      {/* Amenities Pop Up */}
      <Modal
        title={"Amenities"}
        isOpen={isModalOpenAmenities}
        onClose={closeModal}
        width={"md:w-4/6 w-full"}
      >
        <AmenitiesPopUp amenities={amenities} />
      </Modal>

      {/* Lease Term Pop Up */}
      <Modal
        title={"Available Lease Term"}
        isOpen={isModalOpenLeaseTerm}
        onClose={closeModal}
        width={"lg:w-2/6 w-full"}
        closeOnOutsideClick={true}
      >
        <LeaseTermPopUp rent_and_lease={rent_and_lease} />
      </Modal>

      {/* Cost Breakdown Pop Up */}
      <Modal
        title={"Cost Breakdown"}
        isOpen={isModalOpenCostBreak}
        onClose={closeModal}
        width={"md:w-4/6 w-full"}
      >
        <CostBreakdownInfo fees={fees} />
      </Modal>

      {/* BookTour Pop Up */}
      <Modal
        title={"Book Tour"}
        isOpen={isModalOpenBookTour}
        onClose={closeModal}
        width={"md:w-4/6 w-full"}
      >
        <BookTour
          name={name}
          address={address}
          city={city}
          state={state}
          country={country}
          unit_number={unit_number}
          type={type}
          apartmentId={apartmentId}
          propertyId={propertyId}
          onClose={closeModal}
          office_working_days={office_working_days}
          tour_accept_hours={tour_accept_hours}
          working_hours={working_hours}
          tourPropertyIds={data && data.tourPropertyIds && data.tourPropertyIds}
          tours={tours}
        />
      </Modal>

      {/* Rent Apply Pop Up */}
      <Modal
        title={"Apply For Rent"}
        isOpen={isModalOpenApplyRent}
        onClose={closeModal}
        width={"md:w-4/6 w-full"}
      >
        <RentApply
          fee={fee}
          name={name}
          address={address}
          city={city}
          state={state}
          country={country}
          unit_number={unit_number}
          type={type}
          options={rent_and_lease}
          apartmentId={apartmentId}
          propertyId={propertyId}
          onClose={closeModal}
          pendingApplication={pendingApplication}
          residentApplication={residentApplication}
          pendingApartmentIds={
            data && data.pendingApartmentIds && data.pendingApartmentIds
          }
          residentApartmentIds={
            data && data.residentApartmentIds && data.residentApartmentIds
          }
        />
      </Modal>

      {/* Unit Map Pop Up */}
      <Modal
        title={"Unit Map"}
        isOpen={isModalOpenUnitMap}
        onClose={closeModal}
        width={"md:w-4/6 w-full"}
      >
        <SingleImage src={unit_image ? unit_image : ""} />
      </Modal>

      {/* Virtual Tour Pop Up */}
      <Modal
        title={"Virtual Tour"}
        isOpen={isModalOpenVirtualTour}
        onClose={closeModal}
        width={"md:w-4/6 w-full"}
      >
        <VideoSlider videos={tour_video ? tour_video : []} />
      </Modal>

      {/* Image Slider Pop Up */}
      <Modal
        title={"Floor Gallery"}
        isOpen={isModalOpenImageSlider}
        onClose={closeModal}
        height={"h-screen"}
        width={"w-full"}
      >
        <Imageslider images={gallery_images} />
      </Modal>
    </>
  );
};
