import { AdminHeader, Button } from "@/components";
import {
  useAppDispatch,
  useGetAllPropertySelector,
  useScrollToTop,
} from "@/hooks";
import { getAllProperty } from "@/services/property/property";
import { useEffect, useState } from "react";
import { AddForm, AllApartment } from "./components";

const AddApartment = () => {
  useScrollToTop();
  const dispatch = useAppDispatch();
  const [showForm, setShowForm] = useState(false);
  const { updatedProperties } = useGetAllPropertySelector();
  useEffect(() => {
    dispatch(
      getAllProperty({
        sort: "desc",
      })
    );
  }, [dispatch]);

  return (
    <div className="w-full">
      <AdminHeader title={"All Apartment"} />
      <div className="w-full md:p-4 p-2 space-y-5">
        <p className="bg-pink-50 md:text-base text-sm px-2 py-1">
          Note: Firstly, Add Property, then{" "}
          <span className="font-semibold">Add Apartment.</span>
        </p>
        <div className="space-y-4">
          <Button onClick={() => setShowForm((prev) => !prev)}>
            {showForm ? "Close Form" : "Add New Apartment"}
          </Button>
          {showForm && (
            <AddForm
              setShowForm={setShowForm}
              updatedProperties={updatedProperties}
            />
          )}
        </div>

        <AllApartment updatedProperties={updatedProperties} />
      </div>
    </div>
  );
};

export default AddApartment;
