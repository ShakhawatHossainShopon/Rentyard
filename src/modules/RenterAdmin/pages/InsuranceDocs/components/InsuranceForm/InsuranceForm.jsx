import { Button, Datepicker, FileUpload, Input } from "@/components";
import { config } from "@/config";
import {
  useAppDispatch,
  useGetAllAssetSelector,
  useGetInsuranceSelector,
} from "@/hooks";
import { getAllAsset } from "@/services/asset/asset";
import { getInsurance, updateInsurance } from "@/services/insurance/insurance";
import { Icons } from "@/utils";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ClipLoader } from "react-spinners";
import * as Yup from "yup";

const initialValues = {
  company: "",
  policy_number: "",
  policy_start_date: "",
  policy_expiry_date: "",
  doc_photo: "",
};

const validationSchema = Yup.object({
  company: Yup.string().required("Required!"),
  policy_number: Yup.string().required("Required!"),
  policy_start_date: Yup.string().required("Required!"),
  policy_expiry_date: Yup.string().required("Required!"),
  doc_photo: Yup.string().required("Required!"),
});

export const InsuranceForm = () => {
  const dispatch = useAppDispatch();
  const insurance = useGetInsuranceSelector();

  const {
    company,
    policy_number,
    policy_start_date,
    policy_expiry_date,
    doc_photo,
  } = insurance.data;

  const onSubmit = (values) => {
    console.log(values);
    dispatch(updateInsurance(values));
  };
  const [mapPreview, setMapPreview] = useState(null);
  const { loading, data } = useGetAllAssetSelector();
  useEffect(() => {
    dispatch(getAllAsset());
    dispatch(getInsurance());
  }, [dispatch]);

  if (insurance.loading) {
    <div className="w-full flex justify-center items-center h-[90vh]">
      <ClipLoader size={100} color="blue" />
    </div>;
  } else {
    return (
      <div className="md:border md:p-4">
        <div className="md:flex justify-between items-center">
          <h2 className="md:text-xl text-lg font-bold">Renter Insurance</h2>
        </div>
        <hr className="my-5 border-gray-200" />
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ setFieldValue, setValues, values, errors, touched }) => {
            useEffect(() => {
              setMapPreview(doc_photo);
              setValues({
                company,
                policy_number,
                policy_start_date,
                policy_expiry_date,
                doc_photo: doc_photo && doc_photo.assetId && doc_photo.assetId,
              });
            }, []);
            return (
              <Form className="space-y-5">
                <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
                  <Input
                    required={true}
                    label={"Insurance Company"}
                    placeholder={"StateFarm"}
                    name={"company"}
                    className={"py-2 px-2"}
                  />
                  <Input
                    required={true}
                    label={"Policy Number"}
                    placeholder={"45785"}
                    name={"policy_number"}
                    className={"py-2 px-2"}
                  />
                </div>
                <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
                  <Datepicker
                    required={true}
                    parentClassName={"w-full md:px-0 py-0"}
                    label={"Policy Starting Date"}
                    name={"policy_start_date"}
                    className={"py-2 px-2 border w-full bg-white"}
                    value={values.policy_start_date}
                    onChange={(e) => {
                      setFieldValue("policy_start_date", e);
                    }}
                    touched={touched.policy_start_date}
                    errors={errors.policy_start_date}
                  />
                  <Datepicker
                    required={true}
                    parentClassName={"w-full md:px-0 py-0"}
                    label={"Policy Expiry Date"}
                    name={"policy_expiry_date"}
                    className={"py-2 px-2 border w-full bg-white"}
                    value={values.policy_expiry_date}
                    onChange={(e) => {
                      setFieldValue("policy_expiry_date", e);
                    }}
                    touched={touched.policy_expiry_date}
                    errors={errors.policy_expiry_date}
                  />
                </div>
                <div className="md:flex justify-start items-center md:space-x-4 space-y-5 md:space-y-0">
                  <FileUpload
                    required={true}
                    label={"Upload Policy Doc/Photo"}
                    placeholder={"Upload Policy Doc/Photo"}
                    name="doc_photo"
                    data={data}
                    loading={loading}
                    touched={touched.doc_photo}
                    errors={errors.doc_photo}
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
                          setFieldValue("doc_photo", null);
                        }}
                        className="absolute cursor-pointer right-0 top-0 bg-white "
                      >
                        <Icons.Close />
                      </button>
                    </div>
                  )}
                </div>
                <Button className={"md:text-sm text-xs"}>Add Insurance</Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    );
  }
};
