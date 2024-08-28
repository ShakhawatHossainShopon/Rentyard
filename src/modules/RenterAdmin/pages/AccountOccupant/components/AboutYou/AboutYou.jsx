import {
  Button,
  Datepicker,
  FileUpload,
  Input,
  PhoneInput,
  Select,
} from "@/components";
import { config } from "@/config";
import { useAppDispatch, useGetAllAssetSelector } from "@/hooks";
import { getAllAsset } from "@/services/asset/asset";
import { addUser } from "@/services/user/user";
import { Icons } from "@/utils";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useCountries } from "use-react-countries";
import * as Yup from "yup";

const initialValues = {
  first_name: "",
  former_name: "",
  middle_name: "",
  last_name: "",
  date_of_birth: "",
  identity_number: "",
  do_you_smoke: "",
  identity_number_type: "",
  identity_issue_place: "",
  issuing_city_state: "",
  govt_issued_id_number: "",
  govt_issued_id_type: "",
  contact_number: "",
  govt_id_photo: "",
  sex: "",
  marital_status: "",
  country_of_citizenship: "",
};

const validationSchema = Yup.object({
  first_name: Yup.string().required("Required!"),
  last_name: Yup.string().required("Required!"),
  date_of_birth: Yup.string().required("Required!"),
  identity_number_type: Yup.string().required("Required!"),
  do_you_smoke: Yup.string().required("Required!"),
  identity_number: Yup.string().required("Required!"),
  govt_issued_id_number: Yup.string().required("Required!"),
  govt_issued_id_type: Yup.string().required("Required!"),
  contact_number: Yup.string().required("Required!"),
  govt_id_photo: Yup.string().required("Required!"),
  sex: Yup.string().required("Required!"),
  marital_status: Yup.string().required("Required!"),
  country_of_citizenship: Yup.string().required("Required!"),
});

export const AboutYou = ({ res }) => {
  const dispatch = useAppDispatch();
  const { countries } = useCountries();
  const [mapPreview, setMapPreview] = useState(null);

  const countryOptions = countries
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((country) => {
      return { label: country.name, value: country.name };
    });

  console.log(res);

  const {
    first_name,
    former_name,
    middle_name,
    last_name,
    date_of_birth,
    identity_number,
    do_you_smoke,
    identity_number_type,
    identity_issue_place,
    issuing_city_state,
    govt_issued_id_number,
    govt_issued_id_type,
    contact_number,
    govt_id_photo,
    sex,
    marital_status,
    country_of_citizenship,
  } = res;

  const onSubmit = (values) => {
    console.log(values);
    dispatch(addUser(values));
  };

  const { loading, data } = useGetAllAssetSelector();
  useEffect(() => {
    dispatch(getAllAsset());
  }, [dispatch]);
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ setFieldValue, errors, touched, values, setValues }) => {
        useEffect(() => {
          setMapPreview(govt_id_photo);
          setValues({
            first_name,
            former_name,
            middle_name,
            last_name,
            date_of_birth,
            identity_number,
            do_you_smoke,
            identity_number_type,
            identity_issue_place,
            issuing_city_state,
            govt_issued_id_number,
            govt_issued_id_type,
            contact_number,
            govt_id_photo: govt_id_photo && govt_id_photo.assetId,
            sex,
            marital_status,
            country_of_citizenship,
          });
        }, [dispatch]);
        return (
          <Form className="space-y-5">
            <div className="w-full md:flex justify-center items-center space-y-5 md:space-y-0 md:space-x-6">
              <Input
                required={true}
                label={"First Name"}
                placeholder={"John"}
                name={"first_name"}
                className={"py-2 px-2"}
              />
              <Input
                label={"Middle Name(Optional)"}
                placeholder={"middle name"}
                name={"middle_name"}
                className={"py-2 px-2"}
              />
              <Input
                required={true}
                label={"Last Name"}
                placeholder={"Doe"}
                name={"last_name"}
                className={"py-2 px-2"}
              />
            </div>

            <div className="w-full md:flex justify-center items-center space-y-5 md:space-y-0 md:space-x-6">
              <Input
                label={"Former name(Optional)"}
                placeholder={"Write if you had one"}
                name={"former_name"}
                className={"py-2 px-2"}
              />

              <Datepicker
                required={true}
                parentClassName={"w-full px-0 py-0 bg-gray-100"}
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
                name={"sex"}
                required={true}
                label={"Gender Identity"}
                options={[
                  {
                    label: "Choose Gender",
                    value: "",
                  },
                  {
                    label: "Male",
                    value: "Male",
                  },
                  {
                    label: "Female",
                    value: "Female",
                  },
                  {
                    label: "Others",
                    value: "Others",
                  },
                ]}
                className={"w-full border px-2 py-2"}
                parentClassName={"w-full px-0 py-0"}
              />
            </div>
            <div className="w-full md:flex justify-center items-center space-y-5 md:space-y-0 md:space-x-6">
              <Select
                name={"marital_status"}
                required={true}
                label={"Marital Status"}
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
                className={"w-full border px-2 py-2"}
                parentClassName={"w-full px-0 py-0"}
              />
              <Select
                name={"country_of_citizenship"}
                required={true}
                label={"Country of Citizen"}
                options={[
                  {
                    label: "Select Citizen",
                    value: "",
                  },
                  ...countryOptions,
                ]}
                className={"w-full border px-2 py-2"}
                parentClassName={"w-full px-0 py-0"}
              />

              <Select
                name={"do_you_smoke"}
                required={true}
                label={"Do you Smoke"}
                options={[
                  {
                    label: "Select One",
                    value: "",
                  },
                  {
                    label: "Yes",
                    value: "Yes",
                  },
                  {
                    label: "No",
                    value: "No",
                  },
                  {
                    label: "Occasionally",
                    value: "Occasionally",
                  },
                ]}
                className={"w-full border px-2 py-2"}
                parentClassName={"w-full px-0 py-0"}
              />
            </div>
            <div className="w-full md:flex justify-center items-center space-y-5 md:space-y-0 md:space-x-6">
              <Select
                name={"identity_number_type"}
                required={true}
                label={"Identification type"}
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
                className={"w-full border px-2 py-2"}
                parentClassName={"w-full px-0 py-0"}
              />

              <Input
                required={true}
                label={"Enter Selected Identification Number"}
                placeholder={"223566"}
                name={"identity_number"}
                className={"py-2 px-2"}
                type={"text"}
              />
              <Input
                label={"Issuing Place Name(Optional)"}
                placeholder={"Texas City"}
                name={"identity_issue_place"}
                className={"py-2 px-2"}
              />
            </div>
            <div className="w-full md:flex justify-center items-center space-y-5 md:space-y-0 md:space-x-6">
              <Select
                name={"govt_issued_id_type"}
                required={true}
                label={"State/Govt. Issued ID type"}
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
                className={"w-full border px-2 py-2"}
                parentClassName={"w-full px-0 py-0"}
              />
              <Input
                required={true}
                label={"Enter Selected State/Govt. ID Number"}
                placeholder={"4563223566"}
                name={"govt_issued_id_number"}
                className={"py-2 px-2"}
                type={"text"}
              />

              <Input
                label={"Issuing Place Name(Optional)"}
                placeholder={"Texas"}
                name={"issuing_city_state"}
                className={"py-2 px-2"}
              />
            </div>
            <div className="w-full md:w-1/3 md:flex justify-center items-center space-y-5 md:space-y-0 md:space-x-6">
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

            <Button className={"md:text-sm text-xs"} type={"submit"}>
              Save Now
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};
