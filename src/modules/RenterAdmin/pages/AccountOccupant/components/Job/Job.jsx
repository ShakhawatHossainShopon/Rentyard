import {
  Button,
  Datepicker,
  FileUpload,
  Input,
  PhoneInput,
} from "@/components";
import { config } from "@/config";
import { useAppDispatch, useGetAllAssetSelector } from "@/hooks";
import { getAllAsset } from "@/services/asset/asset";
import { addUser } from "@/services/user/user";
import { Icons } from "@/utils";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import * as Yup from "yup";

const initialValues = {
  current_employer: "",
  starting_date: "",
  sponsor_guardian: "",
  supervisor_number: "",
  supervisor_name: "",
  gross_monthly_income: "",
  position: "",
  bank_statement: "",
  office_institute_address: "",
};

const validationSchema = Yup.object({
  current_employer: Yup.string().required("Required!"),
  supervisor_name: Yup.string().required("Required!"),
  starting_date: Yup.string().required("Required!"),
  bank_statement: Yup.number().required("Required!"),
  supervisor_number: Yup.string().required("Required!"),
  position: Yup.string().required("Required!"),
  office_institute_address: Yup.string().required("Required!"),
});

export const Job = ({ res }) => {
  const dispatch = useAppDispatch();
  const onSubmit = (values) => {
    console.log(values);
    dispatch(addUser(values));
  };
  const [mapPreview, setMapPreview] = useState(null);
  const [mapPreview2, setMapPreview2] = useState(null);
  const { loading, data } = useGetAllAssetSelector();

  const {
    current_employer,
    starting_date,
    sponsor_guardian,
    supervisor_number,
    supervisor_name,
    gross_monthly_income,
    position,
    bank_statement,
    office_institute_address,
  } = res;

  useEffect(() => {
    dispatch(getAllAsset());
  }, [dispatch]);
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ setFieldValue, touched, errors, values, setValues }) => {
        useEffect(() => {
          setMapPreview(bank_statement);
          setMapPreview2(sponsor_guardian && sponsor_guardian);
          setValues({
            current_employer,
            starting_date,
            sponsor_guardian: sponsor_guardian && sponsor_guardian.assetId,
            supervisor_number,
            supervisor_name,
            gross_monthly_income,
            position,
            bank_statement: bank_statement && bank_statement.assetId,
            office_institute_address,
          });
        }, []);
        return (
          <Form className="space-y-5">
            <div className="w-full md:grid md:grid-cols-3 md:space-x-6 space-y-5 md:space-y-0">
              <div className="col-span-2">
                <Input
                  required={true}
                  label={"Your Current Employer Name"}
                  placeholder={"Microsoft Corporation or University of Texas"}
                  name={"current_employer"}
                  className={"py-2 px-2 "}
                />
              </div>
              <div>
                <Input
                  required={true}
                  label={"Your Position"}
                  placeholder={"Manager or Student"}
                  name={"position"}
                  className={"py-2 px-2"}
                />
              </div>
            </div>
            <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
              <Input
                label={"Gross monthly income"}
                placeholder={"$500"}
                name={"gross_monthly_income"}
                className={"py-2 px-2"}
                type={"number"}
              />
              <Datepicker
                required={true}
                parentClassName={"w-full px-0 py-0 bg-gray-100"}
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

              <Input
                required={true}
                label={"Supervisor Name"}
                placeholder={"John Doe"}
                name={"supervisor_name"}
                className={"py-2 px-2"}
              />
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
              <PhoneInput
                required={true}
                label={"Supervisor Contact Number"}
                placeholder={"234345983"}
                names={"supervisor_number"}
                className={"py-2 px-2"}
                type={"tel"}
                errors={errors.supervisor_number}
                touched={touched.supervisor_number}
                value={values.supervisor_number}
                setFieldValue={setFieldValue}
              />
              <div className="md:col-span-2">
                <Input
                  required={true}
                  label={"Office/Institute Address"}
                  placeholder={"2171 Sugar Camp Road"}
                  name={"office_institute_address"}
                  className={"py-2 px-2"}
                />
              </div>
            </div>
            <div className="md:flex justify-start items-center md:space-x-4 space-y-5 md:space-y-0">
              <FileUpload
                required={true}
                label={"Bank Statement/PayStub(Last 3 month)"}
                placeholder={"Upload File"}
                name="bank_statement"
                data={data}
                loading={loading}
                touched={touched.bank_statement}
                errors={errors.bank_statement}
                id={"bank_statement"}
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
                      setFieldValue("bank_statement", null);
                    }}
                    className="absolute cursor-pointer right-0 top-0 bg-white "
                  >
                    <Icons.Close />
                  </button>
                </div>
              )}
            </div>
            <div className="md:flex justify-start items-center md:space-x-4 space-y-5 md:space-y-0">
              <FileUpload
                label={"Sponsor/Guarantor if you have(Optional)"}
                placeholder={"Upload File"}
                name="sponsor_guardian"
                data={data}
                loading={loading}
                touched={touched.sponsor_guardian}
                errors={errors.sponsor_guardian}
                id={"sponsor_guardian"}
                accept={"image/jpeg, image/png, image/jpg, image/webp"}
                setPreview={setMapPreview2}
                setFieldValue={setFieldValue}
                parentClassName={"w-fit"}
                className={"w-fit pr-5"}
              />
              {mapPreview2 && (
                <div className="rounded-lg h-32 w-32 overflow-hidden border relative">
                  <LazyLoadImage
                    className="h-32 w-32 rounded-lg object-cover"
                    src={`${config.url.ASSET_URL}${mapPreview2.link}`}
                    alt={`Preview`}
                    loading="lazy"
                  />
                  <button
                    onClick={() => {
                      setMapPreview2(null);
                      setFieldValue("sponsor_guardian", null);
                    }}
                    className="absolute cursor-pointer right-0 top-0 bg-white "
                  >
                    <Icons.Close />
                  </button>
                </div>
              )}
            </div>
            <Button type={"submit"} className={"md:text-sm text-xs"}>
              Save Now
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};
