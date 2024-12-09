import {
  AdminHeader,
  Button,
  Datepicker,
  Input,
  PhoneInput,
  Select,
} from "@/components";
import { useAppDispatch, useGetUserSelector, useScrollToTop } from "@/hooks";
import { formatDate } from "@/utils";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

const initialValues = {
  propertyId: "",
  first_name: "",
  middle_name: "",
  last_name: "",
  date_of_birth: "",
  sex: "",
  starting_date: "",
  contact_number: "",
  email: "",
};

const validationSchema = Yup.object({
  propertyId: Yup.string().required("Required!"),
  first_name: Yup.string().required("Required!"),
  last_name: Yup.string().required("Required!"),
  date_of_birth: Yup.string().required("Required!"),
  sex: Yup.string().required("Required!"),
  starting_date: Yup.string().required("Required!"),
  contact_number: Yup.string().required("Required!"),
  email: Yup.string().required("Required!"),
});

const MaintenanceProvider = () => {
  useScrollToTop();
  const [propertyOptions, setPropertyOptions] = useState([]);
  const dispatch = useAppDispatch();
  const res = useGetUserSelector();

  const onSubmit = (values, { resetForm }) => {
    console.log(values);
    // resetForm();
  };

  useEffect(() => {
    if (res.data.properties) {
      setPropertyOptions(
        res.data.properties.map((item) => {
          return { label: item.name, value: item.propertyId };
        })
      );
    }
  }, [res]);

  return (
    <div>
      <AdminHeader title={"Maintenance Providers"} />
      <div className="w-full md:p-4 p-2 space-y-5">
        <div className="bg-red-500 py-2 w-full text-center text-white text-sm">
          This Page is Under Construction!!
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ setFieldValue, touched, errors, values, setValues }) => (
            <Form className="w-full space-y-5">
              <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
                <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
                  <Select
                    name={"propertyId"}
                    required={true}
                    label={"Select Property"}
                    options={[
                      {
                        label: "Select Property",
                        value: "",
                      },
                      ...propertyOptions,
                    ]}
                    className={"w-full px-2 py-2"}
                    parentClassName={"w-full px-0 py-0"}
                  />
                  <Input
                    required={true}
                    label={"Email"}
                    placeholder={"Example@test.com"}
                    name={"email"}
                    className={"py-2 px-2"}
                  />
                  <PhoneInput
                    required={true}
                    label={"Contact Number"}
                    placeholder={"234345983"}
                    names={"contact_number"}
                    className={"py-2 px-2"}
                    type={"tel"}
                    errors={errors.contact_number}
                    touched={touched.contact_number}
                    setFieldValue={setFieldValue}
                    value={values.contact_number}
                  />
                </div>
              </div>

              <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
                <Input
                  name="first_name"
                  label="First Name"
                  placeholder="John"
                  className="py-2 px-2"
                  required
                />
                <Input
                  name="middle_name"
                  label="Middle Name(Optional)"
                  placeholder="Write your middle name"
                  className="py-2 px-2"
                />
                <Input
                  name="last_name"
                  label="Last Name"
                  placeholder="Doe"
                  className="py-2 px-2"
                  required
                />
              </div>

              <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
                <Select
                  name="sex"
                  required
                  label="Sex"
                  options={[
                    {
                      label: "Choose Gender",
                      value: "",
                    },
                    { label: "Male", value: "Male" },
                    { label: "Female", value: "Female" },
                    { label: "Others", value: "Others" },
                  ]}
                  className="w-full px-2 py-2.5"
                  parentClassName="w-full px-0 py-0"
                />
                <Datepicker
                  required={true}
                  parentClassName={"w-full md:px-0 py-0"}
                  label={"Date of Birth"}
                  name={"date_of_birth"}
                  className={"py-2 px-2 border w-full bg-white"}
                  value={values.date_of_birth}
                  onChange={(e) => {
                    const date = formatDate(e);
                    setFieldValue("date_of_birth", date);
                  }}
                  setFieldValue={setFieldValue}
                  touched={touched.date_of_birth}
                  errors={errors.date_of_birth}
                  maxDate={new Date()}
                />
                <Datepicker
                  required={true}
                  parentClassName={"w-full md:px-0 py-0"}
                  label={"Starting Date"}
                  name={"starting_date"}
                  className={"py-2 px-2 border w-full bg-white"}
                  value={values.starting_date}
                  onChange={(e) => {
                    const date = formatDate(e);
                    setFieldValue("starting_date", date);
                  }}
                  setFieldValue={setFieldValue}
                  touched={touched.starting_date}
                  errors={errors.starting_date}
                  maxDate={new Date()}
                />
              </div>
              <Button type="submit">Save Now</Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default MaintenanceProvider;
