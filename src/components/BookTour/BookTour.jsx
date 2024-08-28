import { useAppDispatch, useGetUserSelector, useLoginSelector } from "@/hooks";
import { addTour } from "@/services/tour/tour";
import { Icons } from "@/utils";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Select } from "../ui";
import { Datepicker } from "../ui/Datepicker/Datepicker";
import { Button } from "./../ui/Button/Button";

const initialValues = {
  date: "",
  time: "",
};

const validationSchema = Yup.object({
  date: Yup.string().required("Required!"),
  time: Yup.string().required("Required!"),
});

export const BookTour = ({
  tours,
  tourPropertyIds,
  office_working_days,
  tour_accept_hours,
  working_hours,
  onClose,
  name,
  address,
  city,
  state,
  country,
  unit_number,
  type,
  apartmentId,
  propertyId,
}) => {
  const [tourTime, setTourTime] = useState([]);
  const [options, setOptions] = useState([]);
  const res = useLoginSelector();
  const { data } = useGetUserSelector();
  const dispatch = useAppDispatch();

  const isSameDate = (date1, date2) => {
    return (
      date1.getUTCFullYear() === date2.getUTCFullYear() &&
      date1.getUTCMonth() === date2.getUTCMonth() &&
      date1.getUTCDate() === date2.getUTCDate()
    );
  };

  const checkTourDateAndTime = (date) => {
    const isoString = date.toISOString();

    const dateTime = new Set(
      tours
        .filter((item) => {
          const date1 = new Date(item.date);
          const date2 = new Date(isoString);
          if (isSameDate(date1, date2)) {
            return item;
          }
        })
        .map((item) => item.time)
    );

    console.log(dateTime);

    setTourTime(
      tour_accept_hours.filter((item) => {
        return !dateTime.has(item);
      })
    );
  };

  const isTourExistForThisUserInThisProperty =
    tourPropertyIds.length === 0
      ? [false]
      : tourPropertyIds.map((item) => {
          if (item === propertyId) {
            return item;
          }
          return false;
        });

  const onSubmit = (values) => {
    console.log(values);
    onClose();
    dispatch(
      addTour({ ...values, apartmentId: apartmentId, propertyId: propertyId })
    );
  };

  useEffect(() => {
    if (tourTime.length > 0) {
      setOptions([
        {
          label: "Select One",
          value: "",
        },
        ...tourTime.map((item) => {
          return {
            label: item,
            value: item,
          };
        }),
      ]);
    }
  }, [tourTime]);

  return (
    <>
      {res.isRenter ? (
        data && data.profile_completion >= 80 ? (
          tour_accept_hours.length > 0 ? (
            isTourExistForThisUserInThisProperty[0] === false ? (
              <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
              >
                {({ setFieldValue, values, touched, errors }) => {
                  return (
                    <Form className="pb-4 pt-1">
                      <div>
                        <h2 className="md:text-2xl text-lg font-semibold">
                          {name}
                        </h2>
                        <h3 className="md:text-base text-sm md:py-5 py-2 flex md:items-center gap-2">
                          <Icons.Location className="text-blue-700 md:mt-0 mt-1" />
                          {address}, {city}, {state}, {country}
                        </h3>
                        <p className="md:text-base text-sm">
                          <span className="font-semibold">Unit: </span>
                          {unit_number}({type})
                        </p>
                      </div>

                      <div className="mt-5 bg-yellow-500 p-2 md:text-base text-xs">
                        Note: Please Select a date from our working days (
                        {office_working_days.map((item) => (
                          <span> {item}, </span>
                        ))}
                        )
                      </div>

                      <div className="pt-7 md:flex gap-4 lg:gap-10 items-center md:space-y-0 space-y-4 w-full">
                        <Datepicker
                          required={true}
                          parentClassName={"w-full px-0 py-0"}
                          label={"Tour Day"}
                          name={"date"}
                          className={"px-2 border w-full bg-white"}
                          value={values.date}
                          onChange={(e) => {
                            setFieldValue("date", e);
                            checkTourDateAndTime(e);
                          }}
                          touched={touched.date}
                          errors={errors.date}
                        />
                        <Select
                          required={true}
                          disabled={options.length === 0 ? true : false}
                          className={"px-2"}
                          parentClassName={"w-full md:px-2 px-0"}
                          label={"Available Tour Time"}
                          name={"time"}
                          id={"time"}
                          options={
                            options.length > 0
                              ? options
                              : [
                                  {
                                    label: "Select One",
                                    value: "",
                                  },
                                ]
                          }
                        />
                      </div>

                      <Button
                        className="mt-9 md:ml-2 bg-cyan-600 hover:bg-cyan-700 px-7"
                        type={"Submit"}
                      >
                        Book Tour
                      </Button>
                    </Form>
                  );
                }}
              </Formik>
            ) : (
              <div className="w-full h-[40vh] flex justify-center items-center text-lg font-semibold">
                You have Already Applied for a Tour in this Property.
              </div>
            )
          ) : (
            <div className="w-full h-[40vh] flex justify-center items-center text-lg font-semibold">
              No Tour Available for this Apartment.
            </div>
          )
        ) : (
          <div className="w-full h-[40vh] flex justify-center items-center text-lg font-semibold">
            Please complete your profile first.
          </div>
        )
      ) : (
        <div className="w-full h-[40vh] flex justify-center items-center text-lg font-semibold">
          Please Login First.
        </div>
      )}
    </>
  );
};
