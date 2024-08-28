import { AdminHeader, Select } from "@/components";
import {
  useAppDispatch,
  useGetTourForRenterSelector,
  useScrollToTop,
} from "@/hooks";
import { getTourForRenter } from "@/services/tour/tour";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { TourSceduleCard } from "../../components";

const TourSchedule = () => {
  useScrollToTop();
  const dispatch = useAppDispatch();
  const { loading, data } = useGetTourForRenterSelector();
  console.log(data);

  const showData =
    data &&
    data.filter(
      (tour) => tour.status === "Pending" || tour.status === "Confirmed"
    );

  const historyData =
    data &&
    data.filter(
      (tour) =>
        tour.status === "Done" ||
        tour.status === "Cancelled" ||
        tour.status === "Cancelled by Requester"
    );

  useEffect(() => {
    dispatch(getTourForRenter());
  }, [dispatch]);

  return (
    <div className="w-full">
      <AdminHeader renterAdmin={true} title={"Tour Schedule"} />
      <div className="w-full p-4 space-y-5">
        <div className="md:flex justify-start items-center space-y-5 md:space-y-0 md:space-x-10">
          {loading ? (
            <div className="w-full flex justify-center items-center h-[40vh]">
              <ClipLoader size={100} color="blue" />
            </div>
          ) : !loading && showData.length > 0 ? (
            showData.map((item) => {
              return (
                <TourSceduleCard
                  key={item.tourId && item.tourId}
                  title={item.property.name && item.property.name}
                  status={item.status && item.status}
                  isButton={true}
                  tourId={item.tourId && item.tourId}
                  address={item.property.address && item.property.address}
                  city={item.property.city && item.property.city}
                  state={item.property.state && item.property.state}
                  country={item.property.country && item.property.country}
                  zip={item.property.zip && item.property.zip}
                  type={item.apartment.type && item.apartment.type}
                  unit_number={
                    item.apartment.unit_number && item.apartment.unit_number
                  }
                  date={item.date && item.date}
                  time={item.time && item.time}
                />
              );
            })
          ) : (
            <div className="w-full flex justify-center items-center h-[40vh]">
              {" "}
              No Tour Available...{" "}
            </div>
          )}
        </div>
        <Formik>
          <Form className="flex justify-start items-center space-x-2 px-4 w-full">
            <h3 className="text-lg font-semibold">Tour History</h3>
            <Select
              name={"a"}
              options={[
                {
                  label: "3 Months",
                  value: "3 Months",
                },
                {
                  label: "6 Months",
                  value: "6 Months",
                },
                {
                  label: "12 Months",
                  value: "12 Months",
                },
                {
                  label: "15 Months",
                  value: "15 Months",
                },
              ]}
              className={"w-full border border-blue-500 px-2 py-2"}
              parentClassName={"w-fit px-0 py-0"}
            />
          </Form>
        </Formik>
        {!loading && historyData.length > 0 ? (
          <div className="grid grid-cols-2 gap-6">
            {historyData.map((item) => {
              return (
                <TourSceduleCard
                  key={item.tourId && item.tourId}
                  title={item.property.name && item.property.name}
                  status={item.status && item.status}
                  isButton={false}
                  tourId={item.tourId && item.tourId}
                  address={item.property.address && item.property.address}
                  city={item.property.city && item.property.city}
                  state={item.property.state && item.property.state}
                  country={item.property.country && item.property.country}
                  zip={item.property.zip && item.property.zip}
                  type={item.apartment.type && item.apartment.type}
                  unit_number={
                    item.apartment.unit_number && item.apartment.unit_number
                  }
                  date={item.date && item.date}
                  time={item.time && item.time}
                />
              );
            })}
          </div>
        ) : (
          <div className="w-full flex justify-center items-center h-[40vh]">
            {" "}
            No History Available...{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default TourSchedule;
