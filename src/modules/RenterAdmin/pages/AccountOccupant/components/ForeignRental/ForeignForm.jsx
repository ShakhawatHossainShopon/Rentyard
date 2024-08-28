import { Datepicker, FileUpload, Select } from "@/components";
import { config } from "@/config";
import { useAppDispatch, useGetAllAssetSelector } from "@/hooks";
import { getAllAsset } from "@/services/asset/asset";
import { Icons } from "@/utils";
import { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useCountries } from "use-react-countries";

export const ForeignForm = ({
  mapPreview,
  mapPreview2,
  setMapPreview,
  setMapPreview2,
  errors,
  touched,
  setFieldValue,
  values,
}) => {
  const dispatch = useAppDispatch();
  const { countries } = useCountries();
  const { loading, data } = useGetAllAssetSelector();
  useEffect(() => {
    dispatch(getAllAsset());
  }, [dispatch]);

  const countryOptions = countries
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((country) => {
      return { label: country.name, value: country.name };
    });
  return (
    <div className="space-y-5">
      <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
        <Select
          name={"destination_country"}
          required={"true"}
          label={
            values.living_country === "Planning for Abroad"
              ? "Destination Country for Rent"
              : "Residence Country"
          }
          options={[
            {
              label: "Select Country",
              value: "",
            },
            ...countryOptions,
          ]}
          className={"w-full px-2 py-2"}
          parentClassName={"w-full px-0 py-0"}
        />
        <Select
          name={"moving_reason"}
          required={true}
          label={"Moving Reason"}
          options={[
            {
              label: "Select Reason",
              value: "",
            },
            {
              label: "Work",
              value: "Work",
            },
            {
              label: "Study",
              value: "Study",
            },
            {
              label: "Immigration",
              value: "Immigration",
            },
          ]}
          className={"w-full px-2 py-2"}
          parentClassName={"w-full px-0 py-0"}
        />
        <Datepicker
          required={true}
          parentClassName={"w-full px-0 py-0 bg-gray-100"}
          label={"Estimated Arrival Date"}
          name={"estimate_arrival_date"}
          className={"py-2 px-2 border w-full bg-white"}
          value={values.estimate_arrival_date}
          onChange={(e) => {
            setFieldValue("estimate_arrival_date", e);
          }}
          touched={touched.estimate_arrival_date}
          errors={errors.estimate_arrival_date}
        />
      </div>
      <div className="md:flex justify-start items-center md:space-x-4 space-y-5 md:space-y-0">
        <FileUpload
          required={true}
          label={"Upload Passport Bio/Info Page"}
          placeholder={"Upload File"}
          name="passport_bio_page"
          data={data}
          loading={loading}
          touched={touched.passport_bio_page}
          errors={errors.passport_bio_page}
          id={"passport_bio_page"}
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
                setFieldValue("passport_bio_page", null);
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
          required={true}
          label={"Upload Study/Work/immigration Proof"}
          placeholder={"Upload File"}
          name="study_work_proof"
          data={data}
          loading={loading}
          touched={touched.study_work_proof}
          errors={errors.study_work_proof}
          id={"study_work_proof"}
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
                setFieldValue("study_work_proof", null);
              }}
              className="absolute cursor-pointer right-0 top-0 bg-white "
            >
              <Icons.Close />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
