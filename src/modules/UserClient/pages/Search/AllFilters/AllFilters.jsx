import { Button, Datepicker, Input, Searchbar, Select } from "@/components";
import { useAppDispatch, useSearchSelector } from "@/hooks";
import { getPropertyPublicView } from "@/services/property/property";
import { Form, Formik } from "formik";
import { useEffect } from "react";

const initialValues = {
  query: "",
  bed: "",
  bath: "",
  price: "",
  offer: "",
  date: "",
};

export const AllFilters = () => {
  const dispatch = useAppDispatch();
  const { query, bed, bath, price, offer, date } = useSearchSelector();

  const onSubmit = (values) => {
    console.log(values);
    dispatch(getPropertyPublicView(values));
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ setFieldValue, values, resetForm, setValues }) => {
        useEffect(() => {
          setValues({ query, bed, bath, price, offer, date });
          dispatch(getPropertyPublicView({ query, bed, bath, offer, date }));
        }, [dispatch]);
        return (
          <Form>
            <div className="lg:grid lg:grid-cols-7 gap-4 md:space-y-0 space-y-1 py-6 ">
              <Datepicker
                label={"Move in Search"}
                onChange={(e) => {
                  setFieldValue("date", e);
                }}
                value={values.date}
                className={
                  "border-0 bg-secondary-color p-2.5 md:p-3.5 md:rounded-lg rounded text-xs"
                }
                parentClassName={"px-2 py-1"}
              />
              <Select
                name={"bed"}
                label={"Beds"}
                options={[
                  { value: "", label: "Select" },
                  { value: "Studio", label: "Studio" },
                  { value: "1 Bed", label: "1 Bed" },
                  { value: "2 Beds", label: "2 Beds" },
                  { value: "3 Beds", label: "3 Beds" },
                  { value: "4 Beds", label: "4 Beds" },
                  { value: "5 Beds", label: "5 Beds" },
                ]}
                className={
                  "border-0 bg-secondary-color p-2.5 md:p-3.5 md:rounded-lg rounded  text-xs text-gray-600"
                }
              />
              <Select
                name={"bath"}
                label={"Baths"}
                options={[
                  { value: "", label: "Select" },
                  { value: "1 Bath", label: "1 Bath" },
                  { value: "1.5 Baths", label: "1.5 Baths" },
                  { value: "2 Baths", label: "2 Baths" },
                  { value: "2.5 Baths", label: "2.5 Baths" },
                  { value: "3 Baths", label: "3 Baths" },
                  { value: "3.5 Baths", label: "3.5 Baths" },
                  { value: "4 Baths", label: "4 Baths" },
                  { value: "4.5 Baths", label: "4.5 Baths" },
                  { value: "5 Baths", label: "5 Baths" },
                  { value: "5.5 Baths", label: "5.5 Baths" },
                ]}
                className={
                  "border-0 bg-secondary-color p-2.5 md:p-3.5 md:rounded-lg rounded  text-xs text-gray-600"
                }
              />
              <Select
                name={"price"}
                label={"Price"}
                options={[
                  { value: "", label: "Select" },
                  { value: 600, label: "<600" },
                  { value: 1000, label: "<1000" },
                  { value: 1500, label: "<1500" },
                  { value: 2000, label: "<2000" },
                  { value: 3000, label: "<3000" },
                  { value: 4000, label: "<4000" },
                  { value: 5000, label: "<5000" },
                ]}
                className={
                  "border-0 bg-secondary-color p-2.5 md:p-3.5 md:rounded-lg rounded  text-xs text-gray-600"
                }
              />
              <Input
                name={"offer"}
                label={"Offer Type"}
                placeholder={"Student"}
                className={
                  "border-0 bg-secondary-color p-2.5 md:p-3.5 md:rounded-lg rounded  text-xs text-gray-600"
                }
                parentClassName={"pt-2 md:pt-1 px-2 md:px-0"}
              />
              <div className="md:flex md:px-0 px-2 justify-end items-center pt-7 col-span-2">
                <Searchbar
                  homeSearch={
                    "border-0 bg-secondary-color p-2.5 md:p-3.5 md:rounded-lg rounded text-xs md:text-sm text-gray-600"
                  }
                  buttonClass={
                    "bg-primary-color ml-5 text-base font-semibold py-2 md:py-2.5 px-6 rounded bg-primary-color text-white transition-all duration-300 hover:bg-blue-500 hover:shadow-lg"
                  }
                  isShowButton={true}
                  query={"query"}
                  placeholder={"Search by City or Zip"}
                />
                <Button
                  className={
                    "bg-red-500 md:ml-5 md:mt-0 mt-5 text-base font-semibold py-2 md:py-2.5 px-6 rounded  text-white transition-all duration-300 hover:bg-red-800 hover:shadow-lg"
                  }
                  type="button"
                  onClick={() => resetForm()}
                >
                  Reset
                </Button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
