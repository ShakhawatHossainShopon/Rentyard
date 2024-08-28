import { useAppDispatch } from "@/hooks";
import { deleteVehicle } from "@/services/vehicle/vehicle";
import { useEffect, useState } from "react";

export const VehicleManagerCard = ({ owner, isCloseBtn, item }) => {
  const dispatch = useAppDispatch();
  const headerClass = owner === "guest" ? "bg-red-700" : "bg-black";

  const [timeRemaining, setTimeRemaining] = useState(60 * 60 * 60); // 60 hours in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="bg-[#F7F7F7] w-full">
      <h2
        className={`w-full text-white py-2 px-6 text-lg relative ${headerClass}`}
      >
        {item.company}
        {isCloseBtn && (
          <button
            onClick={() => dispatch(deleteVehicle(item.vehicleId))}
            className="bg-white px-1 absolute right-1 top-2 text-black w-7 h-7 rounded-full flex justify-center items-center text-lg"
          >
            X
          </button>
        )}
      </h2>
      <div className="flex justify-between items-start w-full md:p-6 p-3">
        <div className="">
          <p className="md:text-lg text-base">{item.model}</p>
          <p className="text-xs md:text-base">Plate- {item.plate}</p>
          <p className="text-xs md:text-base">Vin- {item.vin} </p>
          Vehicle Owner :
          {owner === "Guest" && (
            <span className="font-semibold pt-2 text-red-700"> Guest</span>
          )}
          {owner === "Resident" && (
            <span className="font-semibold pt-2"> Resident</span>
          )}
        </div>
        {owner === "guest" && (
          <div className=" flex flex-col justify-center items-center">
            <div className="bg-red-600 text-white px-2 py-1 text-center">
              <h4 className="md:text-base text-xs">Permit: 60 Hours </h4>
              <hr className="my-3" />
              <p className="md:text-base text-sm">
                {formatTime(timeRemaining)}{" "}
              </p>
              <p className="md:text-base text-xs">Stay Hours</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
