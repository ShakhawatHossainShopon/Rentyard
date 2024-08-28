import {
  Button,
  Datepicker,
  FileUpload,
  Input,
  PhoneInput,
  Select,
} from "@/components";
import { config } from "@/config";
import {
  useAppDispatch,
  useGetAllAssetSelector,
  useGetUserSelector,
  useScrollToTop,
} from "@/hooks";
import { getAllAsset } from "@/services/asset/asset";
import { updateEmployee } from "@/services/employee/employee";
import { Icons } from "@/utils";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useCountries } from "use-react-countries";
import * as Yup from "yup";

const initialValues = {
  propertyId: "",
  first_name: "",
  middle_name: "",
  last_name: "",
  date_of_birth: "",
  sex: "",
  marital_status: "",
  country_of_citizenship: "",
  identity_number_type: "",
  identity_number: "",
  govt_issued_id_type: "",
  govt_issued_id_number: "",
  issuing_city_state: "",
  govt_id_photo: "",
  position: "",
  starting_date: "",
  contact_number: "",
};

const validationSchema = Yup.object({
  propertyId: Yup.string().required("Required!"),
  first_name: Yup.string().required("Required!"),
  last_name: Yup.string().required("Required!"),
  date_of_birth: Yup.string().required("Required!"),
  sex: Yup.string().required("Required!"),
  marital_status: Yup.string().required("Required!"),
  country_of_citizenship: Yup.string().required("Required!"),
  identity_number_type: Yup.string().required("Required!"),
  identity_number: Yup.string().required("Required!"),
  govt_issued_id_type: Yup.string().required("Required!"),
  govt_issued_id_number: Yup.string().required("Required!"),
  position: Yup.string().required("Required!"),
  govt_id_photo: Yup.string().required("Required!"),
  starting_date: Yup.string().required("Required!"),
  contact_number: Yup.string().required("Required!"),
});

export const UpdateEmployee = ({ item }) => {
  const [mapPreview, setMapPreview] = useState(null);
  const [propertyOptions, setPropertyOptions] = useState([]);
  const dispatch = useAppDispatch();
  const {
    propertyId,
    first_name,
    middle_name,
    last_name,
    date_of_birth,
    sex,
    marital_status,
    country_of_citizenship,
    identity_number_type,
    identity_number,
    govt_issued_id_type,
    govt_issued_id_number,
    issuing_city_state,
    govt_id_photo,
    position,
    starting_date,
    contact_number,
  } = item;
  const onSubmit = (values) => {
    console.log(values);
    dispatch(updateEmployee({ ...values, employeeId: item.id }));
    setMapPreview(null);
  };
  useScrollToTop();
  const { loading, data } = useGetAllAssetSelector();
  const res = useGetUserSelector();

  useEffect(() => {
    if (res.data.properties) {
      setPropertyOptions(
        res.data.properties.map((item) => {
          return { label: item.name, value: item.propertyId };
        })
      );
    }
  }, [res]);

  const { countries } = useCountries();

  const countryOptions = countries
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((country) => {
      return { label: country.name, value: country.name };
    });

  useEffect(() => {
    dispatch(getAllAsset());
  }, [dispatch]);
  return (
    <div className="pb-10">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({
          setInputValue,
          touched,
          errors,
          values,
          handleChange,
          handleBlur,
          setFieldValue,
          setValues,
        }) => {
          useEffect(() => {
            setMapPreview(govt_id_photo);
            setValues({
              propertyId,
              first_name,
              middle_name,
              last_name,
              date_of_birth,
              sex,
              marital_status,
              country_of_citizenship,
              identity_number_type,
              identity_number,
              govt_issued_id_type,
              govt_issued_id_number,
              issuing_city_state,
              govt_id_photo: govt_id_photo.assetId,
              position,
              starting_date,
              contact_number,
            });
          }, [dispatch]);
          return (
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
                </div>
              </div>

              <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
                <Input
                  name="last_name"
                  label="Last Name"
                  placeholder="Doe"
                  className="py-2 px-2"
                  required
                />
                <Datepicker
                  required={true}
                  parentClassName={"w-full md:px-0 py-0 bg-gray-100"}
                  label={"Date of Birth"}
                  name={"date_of_birth"}
                  className={"py-2 px-2 border w-full bg-white"}
                  value={values.date_of_birth}
                  onChange={(e) => {
                    setFieldValue("date_of_birth", e);
                  }}
                  touched={touched.date_of_birth}
                  errors={errors.date_of_birth}
                />
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
              </div>

              <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
                <Select
                  name="marital_status"
                  required
                  label="Marital Status"
                  options={[
                    {
                      label: "Choose Status",
                      value: "Male",
                    },
                    {
                      label: "Single",
                      value: "Single",
                    },
                    {
                      label: "Married",
                      value: "Married",
                    },
                    {
                      label: "Divorced",
                      value: "Divorced",
                    },
                    {
                      label: "Widowed",
                      value: "Widowed",
                    },
                  ]}
                  className="w-full px-2 py-2.5"
                  parentClassName="w-full px-0 py-0"
                />
                <Select
                  name="country_of_citizenship"
                  required
                  label="Country of Citizen"
                  options={[
                    {
                      label: "Select Citizen",
                      value: "",
                    },
                    ...countryOptions,
                  ]}
                  className="w-full px-2 py-2.5"
                  parentClassName="w-full px-0 py-0"
                />
                <Select
                  name="identity_number_type"
                  required
                  label="Identification type"
                  options={[
                    {
                      label: "Select Identification type",
                      value: "",
                    },
                    {
                      label: "Social Security Number",
                      value: "Social Security Number",
                    },
                    {
                      label: "Social Insurance Number",
                      value: "Social Insurance Number",
                    },
                    {
                      label: "Tax File Number",
                      value: "Tax File Number",
                    },
                    {
                      label: "National Insurance Number",
                      value: "National Insurance Number",
                    },
                    {
                      label: "National Identity Card",
                      value: "National Identity Card",
                    },
                    {
                      label: "Aadhaar Card",
                      value: "Aadhaar Card",
                    },
                    {
                      label: "Resident Identity Card",
                      value: "Resident Identity Card",
                    },
                    {
                      label: "My Number Card",
                      value: "My Number Card",
                    },
                    {
                      label: "Citizen Service Number",
                      value: "Citizen Service Number",
                    },
                  ]}
                  className="w-full px-2 py-2.5"
                  parentClassName="w-full px-0 py-0"
                />
              </div>

              <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
                <Input
                  name="identity_number"
                  label="Enter Selected Identification Number"
                  className="py-2 px-2"
                  required
                  type="password"
                  placeholder="83645370"
                />
                <Select
                  name="govt_issued_id_type"
                  required
                  label="State/Govt. Issued ID type"
                  options={[
                    {
                      label: "Select ID type",
                      value: "",
                    },
                    {
                      label: "Passport",
                      value: "Passport",
                    },
                    {
                      label: "Driver License",
                      value: "Driver License",
                    },
                    {
                      label: "State ID/Govt ID",
                      value: "State ID",
                    },
                    {
                      label: "Birth Certificate",
                      value: "Birth Certificate",
                    },
                    {
                      label: "Permanent Resident Card",
                      value: "Permanent Resident Card",
                    },
                  ]}
                  className="w-full px-2 py-2.5"
                  parentClassName="w-full px-0 py-0"
                />
                <Input
                  name="govt_issued_id_number"
                  label="Enter Selected State/Govt. ID Number"
                  className="py-2 px-2"
                  required
                  placeholder="4563223566"
                />
              </div>

              <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
                <Input
                  name="issuing_city_state"
                  label="Issuing City/State Name"
                  className="py-2 px-2"
                  placeholder="Texas"
                />
                <Select
                  name="position"
                  required
                  label="Job Designation"
                  options={[
                    {
                      label: "Select One",
                      value: "",
                    },
                    {
                      label: "Property manager",
                      value: "Property manager",
                    },
                    {
                      label: "Assistant manager",
                      value: "Assistant manager",
                    },
                    {
                      label: "Admin Assistant",
                      value: "Admin Assistant",
                    },
                    {
                      label: "Maintenance Provider",
                      value: "Maintenance Provider",
                    },
                    {
                      label: "Marketing Manager",
                      value: "Marketing Manager",
                    },
                    {
                      label: "Finance Manager",
                      value: "Finance Manager",
                    },
                    {
                      label: "Leasing Manager",
                      value: "Leasing Manager",
                    },
                    {
                      label: "Leasing Assistant",
                      value: "Leasing Assistant",
                    },
                  ]}
                  className="w-full px-2 py-2.5"
                  parentClassName="w-full px-0 py-0"
                />
                <Datepicker
                  required={true}
                  parentClassName={"w-full md:px-0 py-0 bg-gray-100"}
                  label={"Starting Date"}
                  name={"starting_date"}
                  className={"py-2 px-2 border w-full bg-white"}
                  value={values.starting_date}
                  onChange={(e) => {
                    setFieldValue("starting_date", e);
                  }}
                  touched={touched.starting_date}
                  errors={errors.starting_date}
                />
              </div>
              <div className="grid grid-cols-3 gap-6">
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
              <div className="md:flex justify-start items-center md:space-x-4 space-y-5 md:space-y-0">
                <FileUpload
                  required={true}
                  label={"Upload State/Govt. ID Photo"}
                  placeholder={"Upload State/Govt. ID Photo"}
                  name="govt_id_photo"
                  data={data}
                  loading={loading}
                  touched={touched.govt_id_photo}
                  errors={errors.govt_id_photo}
                  id={"unit_image"}
                  accept={"image/jpeg, image/png, image/jpg, image/webp"}
                  setPreview={setMapPreview}
                  setFieldValue={setFieldValue}
                  parentClassName={"w-fit"}
                  className={"w-fit pr-5"}
                />
                {mapPreview && (
                  <div className="rounded-lg h-32 w-32 overflow-hidden border relative">
                    <LazyLoadImage
                      className="h-32 w-32 rounded-lg object-cover"
                      src={`${config.url.ASSET_URL}${mapPreview.link}`}
                      alt={`Preview`}
                      loading="lazy"
                    />
                    <button
                      onClick={() => {
                        setMapPreview(null);
                        setFieldValue("govt_id_photo", null);
                      }}
                      className="absolute cursor-pointer right-0 top-0 bg-white "
                    >
                      <Icons.Close />
                    </button>
                  </div>
                )}
              </div>

              <Button type="submit">Update Now</Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
