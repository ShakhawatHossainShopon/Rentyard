import { Searchbar } from "@/components/Searchbar";
import { Datepicker, Select } from "@/components/ui";
import {
  setBath,
  setBed,
  setDate,
  setPrice,
  setQuery,
} from "@/features/search/searchSlice/searchSlice";
import { useAppDispatch } from "@/hooks";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Define the initial values for Formik
const initialValues = {
  query: "",
  bed: "",
  bath: "",
  price: "",
  date: "",
};

export const Filters = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setBed(""));
    dispatch(setBath(""));
    dispatch(setPrice(""));
    dispatch(setQuery(""));
    dispatch(setDate(""));
  }, []);

  const onSubmit = (values) => {
    console.log(values);
    navigate("/search");
  };
  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ setFieldValue, values }) => (
          <Form>
            <div className="md:grid md:grid-cols-4 px-4 md:px-10 md:py-2 space-y-4 md:space-y-0">
              <Datepicker
                label={"Move-in Date"}
                onChange={(e) => {
                  setFieldValue("date", e);
                  dispatch(setDate(e));
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
                  { value: "", label: "Select Beds" },
                  { value: "Studio", label: "Studio" },
                  { value: "1 Bed", label: "1 Bed" },
                  { value: "2 Beds", label: "2 Beds" },
                  { value: "3 Beds", label: "3 Beds" },
                  { value: "4 Beds", label: "4 Beds" },
                  { value: "5 Beds", label: "5 Beds" },
                ]}
                onChange={(e) => {
                  setFieldValue("bed", e.target.value);
                  dispatch(setBed(e.target.value));
                }}
                className={
                  "border-0 bg-secondary-color p-2.5 md:p-3.5 md:rounded-lg rounded  text-xs text-gray-600"
                }
              />
              <Select
                name={"bath"}
                label={"Baths"}
                options={[
                  { value: "", label: "Select Baths" },
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
                onChange={(e) => {
                  setFieldValue("bath", e.target.value);
                  dispatch(setBath(e.target.value));
                }}
                className={
                  "border-0 bg-secondary-color p-2.5 md:p-3.5 md:rounded-lg rounded text-xs text-gray-600"
                }
              />
              <Select
                name={"price"}
                label={"Budget"}
                options={[
                  { value: "", label: "Select Price" },
                  { value: 600, label: "<600" },
                  { value: 1000, label: "<1000" },
                  { value: 1500, label: "<1500" },
                  { value: 2000, label: "<2000" },
                  { value: 3000, label: "<3000" },
                  { value: 4000, label: "<4000" },
                  { value: 5000, label: "<5000" },
                ]}
                onChange={(e) => {
                  setFieldValue("price", e.target.value);
                  dispatch(setPrice(e.target.value));
                }}
                className={
                  "border-0 bg-secondary-color p-2.5 md:p-3.5 md:rounded-lg rounded text-xs text-gray-600"
                }
              />
            </div>
            <div className="md:px-12 px-6 pt-5 md:py-3">
              <Searchbar
                homeSearch={
                  "border-0 bg-secondary-color p-2.5 md:p-3.5 md:rounded-lg rounded text-xs md:text-sm text-gray-600"
                }
                query={"query"}
                isShowButton={true}
                onChange={(e) => {
                  setFieldValue("query", e.target.value);
                  dispatch(setQuery(e.target.value));
                }}
                buttonClass={
                  "bg-primary-color ml-5 text-base font-semibold py-2.5 md:py-3 px-6 md:rounded-lg rounded bg-primary-color text-white transition-all duration-300 hover:bg-blue-500 hover:shadow-lg"
                }
                placeholder={"Search by City or Zip"}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
