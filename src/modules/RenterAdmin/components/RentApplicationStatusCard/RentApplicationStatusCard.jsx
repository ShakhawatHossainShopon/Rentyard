import { Button } from "@/components";
import { useAppDispatch } from "@/hooks";
import { deleteApplication } from "@/services/application/application";
import { Icons } from "@/utils";
import Swal from "sweetalert2";

export const RentApplicationStatusCard = ({
  applicationId,
  isActive,
  status,
  title,
  duration,
  apartmentId,
  address,
  city,
  state,
  country,
  zip,
  type,
  unit_number,
  lease_term,
  date,
  isBtn,
}) => {
  const dispatch = useAppDispatch();

  const handleCancelApplication = (id) => {
    Swal.fire({
      title: "Are You Sure?",
      showDenyButton: true,
      confirmButtonText: "Ok",
      denyButtonText: `Cancel`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(deleteApplication({ applicationId: id }));
      }
    });
  };

  return (
    <div className="bg-gray-100 p-4 space-y-1 w-full">
      {isActive && (
        <div className="bg-blue-700 p-1 w-fit text-center my-2">
          <p className="text-white w-full text-xs">Your Active Rent</p>
        </div>
      )}
      <h2 className="md:text-2xl text-base sm:text-lg pb-1 font-semibold">
        {" "}
        {title}{" "}
      </h2>
      <h3 className="md:text-lg text-xs sm:text-lg pb-1 flex items-center">
        <Icons.Location className="text-black me-1" /> {address}, {city},{" "}
        {state}, {country}, {zip}
      </h3>
      <p className="md:text-base text-sm">
        <span className="font-semibold ">Unit</span> : {unit_number}({type})
      </p>

      <p className="md:text-base text-sm">
        <span className="font-semibold">Duration</span> : {lease_term}
      </p>
      <p className="md:text-base text-sm">
        <span className="font-semibold ">Date</span> : {date}{" "}
        <span className="text-xs">(MM-DD-YYYY)</span>
      </p>

      <p className="text-blue-700 mt-1 font-semibold md:text-base text-sm md:pb-0 pb-2">
        Status: {status}
      </p>
      {isBtn && (
        <Button
          onClick={() => handleCancelApplication(applicationId)}
          className={"bg-red-700 mt-4 hover:bg-red-800"}
        >
          Cancel
        </Button>
      )}
    </div>
  );
};
