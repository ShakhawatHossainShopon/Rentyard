import { AdminHeader } from "@/components";
import {
  useAppDispatch,
  useGetAllVehicleSelector,
  useScrollToTop,
} from "@/hooks";
import { getAllVehicle } from "@/services/vehicle/vehicle";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { VehicleManagerCard } from "../../components";
import { NewVehicleForm } from "./components";

const VehiclesManager = () => {
  useScrollToTop();
  const dispatch = useAppDispatch();
  const { loading, data } = useGetAllVehicleSelector();
  console.log(data);
  useEffect(() => {
    dispatch(getAllVehicle());
  }, []);
  return (
    <div className="w-full">
      <AdminHeader renterAdmin={true} title={"Vehicles Manager"} />
      <div className="w-full p-4 space-y-10">
        {!loading && data ? (
          <div className="grid grid-cols-2 gap-6">
            {data.map((item) => {
              return (
                <VehicleManagerCard
                  key={item.vehicleId}
                  isCloseBtn={true}
                  owner={item.owner}
                  item={item}
                />
              );
            })}
          </div>
        ) : (
          <div className="w-full flex justify-center items-center h-[40vh]">
            <ClipLoader size={100} color="blue" />
          </div>
        )}
        <NewVehicleForm />
        <p className="font-medium tracking-wide md:text-base text-xs">
          You are allowed to add and park 3 vehicles for free. Please avoid
          parking in reserved spaces until you have paid. Guest vehicles are
          permitted to park for free for 24 hours. Any guest vehicle exceeding
          this limit will be towed.
        </p>
      </div>
    </div>
  );
};

export default VehiclesManager;
