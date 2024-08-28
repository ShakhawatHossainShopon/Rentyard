import { useAppDispatch, useGetAllApartmentSelector } from "@/hooks";
import { getAllApartment } from "@/services/apartment/apartment";
import { useEffect } from "react";
import { ApartmentList, ApartmentListFilter } from "./Components";

export const AllApartment = ({ updatedProperties }) => {
  const { loading, data, properties } = useGetAllApartmentSelector();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      getAllApartment({
        sort: "desc",
      })
    );
  }, [dispatch]);

  return (
    <div className="w-full space-y-5">
      <div>
        <h2 className="text-lg font-semibold">Apartment List</h2>
        <hr className="mb-4 border-gray-300" />
      </div>
      {data && data.length > 0 && (
        <ApartmentListFilter
          loading={loading}
          data={data}
          properties={properties}
        />
      )}
      <ApartmentList
        loading={loading}
        data={data}
        updatedProperties={updatedProperties}
      />
    </div>
  );
};
