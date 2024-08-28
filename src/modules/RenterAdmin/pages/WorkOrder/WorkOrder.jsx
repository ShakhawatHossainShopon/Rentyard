import {
  AdminHeader,
  Button,
  Modal,
  MultipleFileUpload,
  MultipleSelectParent,
  PhoneInput,
  Select,
  TextArea,
} from "@/components";
import { config } from "@/config";
import {
  useAppDispatch,
  useGetAllAssetSelector,
  useGetUserSelector,
  useScrollToTop,
} from "@/hooks";
import { getAllAsset } from "@/services/asset/asset";
import { addWorkOrder } from "@/services/workOrder/workOrder";
import { Icons } from "@/utils";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ClipLoader } from "react-spinners";
import * as Yup from "yup";
import { WorkOrderHistory } from "./components";

const initialValues = {
  contact_number: "",
  area: "",
  pet: "",
  permission: "",
  time: "",
  description: "",
  images: "",
};

const validationSchema = Yup.object({
  contact_number: Yup.string().required("Required!"),
  area: Yup.array().of(Yup.string()).required("required!").min(1, "required!"),
  pet: Yup.string().required("Required!"),
  permission: Yup.string().required("Required!"),
  time: Yup.string().required("Required!"),
  description: Yup.string().required("Required!"),
  images: Yup.array()
    .of(Yup.string())
    .required("Image required!")
    .min(1, "Image required!"),
});

const WorkOrder = () => {
  useScrollToTop();
  const [previewUrls, setPreviewUrls] = useState([]);
  const dispatch = useAppDispatch();
  const user = useGetUserSelector();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const onSubmit = (values, { resetForm }) => {
    console.log({ ...values, propertyId: user.residentOf });
    dispatch(addWorkOrder({ ...values, apartmentId: user.data.residentOfApt }));
    resetForm();
    setPreviewUrls([]);
  };

  const { loading, data } = useGetAllAssetSelector();
  useEffect(() => {
    dispatch(getAllAsset());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-[90vh]">
        <ClipLoader size={100} color="blue" />
      </div>
    );
  }
  return (
    <div className="w-full">
      <AdminHeader renterAdmin={true} title={"Maintenance Request"} />
      <div className="p-4">
        <div>
          <h2 className="text-lg font-semibold">New Work Order</h2>
          <p className="text-red-600 font-medium md:text-base text-sm">
            If this is emergency please call 911
          </p>
        </div>
        <hr className="my-5" />
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ setFieldValue, setValues, values, errors, touched }) => {
            useEffect(() => {
              setValues({
                contact_number: user.data.contact_number,
              });
            }, []);
            const handleRemoveImage = (index) => {
              const newPreviews = [...previewUrls];
              newPreviews.splice(index, 1);
              setPreviewUrls(newPreviews);
              if (newPreviews.length === 0) {
                setFieldValue("images", []);
              }
              setFieldValue(
                "images",
                newPreviews.map((item) => item.assetId)
              );
            };
            return (
              <Form className="space-y-5">
                <div className="md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
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
                  <MultipleSelectParent
                    label={"Problem Area"}
                    required={true}
                    name={"area"}
                    errors={errors.area}
                    touched={touched.area}
                    setFieldValue={setFieldValue}
                    options={[
                      {
                        label: "Bedroom",
                        value: "Bedroom",
                      },
                      {
                        label: "Bathroom",
                        value: "Bathroom",
                      },
                      {
                        label: "Living Room",
                        value: "Living Room",
                      },
                      {
                        label: "Kitchen",
                        value: "Kitchen",
                      },
                      {
                        label: "Balcony",
                        value: "Balcony",
                      },
                    ]}
                  />
                  <Select
                    name={"pet"}
                    required={true}
                    label={"Do you have Pet?"}
                    options={[
                      {
                        label: "Select One",
                        value: "",
                      },
                      {
                        value: "Dog",
                        label: "Dog",
                      },
                      {
                        value: "Cat",
                        label: "Cat",
                      },
                      {
                        value: "Both",
                        label: "Both",
                      },
                      {
                        value: "No Pet",
                        label: "No Pet",
                      },
                    ]}
                    className={"w-full border  px-2 py-2"}
                    parentClassName={"w-full px-0 py-0"}
                  />
                </div>
                <div className="md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
                  <Select
                    name={"permission"}
                    required={true}
                    label={"Entry Permission"}
                    options={[
                      {
                        label: "Select One",
                        value: "",
                      },
                      {
                        value: "Permission to enter given",
                        label: "Permission to enter given",
                      },
                      {
                        value: "Enter in My Available Time.",
                        label: "Enter in My Available Time.",
                      },
                    ]}
                    className={"w-full border  px-2 py-2"}
                    parentClassName={"w-full px-0 py-0"}
                  />
                  <Select
                    name={"time"}
                    required={true}
                    label={"Preferred Entry Time"}
                    options={[
                      {
                        label: "Select One",
                        value: "",
                      },
                      {
                        value: "Anytime",
                        label: "Anytime",
                      },
                      {
                        value: "06:00AM - 07:00AM",
                        label: "06:00AM - 07:00AM",
                      },
                      {
                        value: "07:00AM - 08:00AM",
                        label: "07:00AM - 08:00AM",
                      },
                      {
                        value: "08:00AM - 09:00AM",
                        label: "08:00AM - 09:00AM",
                      },
                      {
                        value: "09:00AM - 10:00AM",
                        label: "09:00AM - 10:00AM",
                      },
                      {
                        value: "10:00AM - 11:00AM",
                        label: "10:00AM - 11:00AM",
                      },
                      {
                        value: "11:00AM - 12:00PM",
                        label: "11:00AM - 12:00PM",
                      },
                      {
                        value: "12:00PM - 01:00PM",
                        label: "12:00PM - 01:00PM",
                      },
                      {
                        value: "01:00PM - 02:00PM",
                        label: "01:00PM - 02:00PM",
                      },
                      {
                        value: "02:00PM - 03:00PM",
                        label: "02:00PM - 03:00PM",
                      },
                      {
                        value: "03:00PM - 04:00PM",
                        label: "03:00PM - 04:00PM",
                      },
                      {
                        value: "04:00PM - 05:00PM",
                        label: "04:00PM - 05:00PM",
                      },
                      {
                        value: "05:00PM - 06:00PM",
                        label: "05:00PM - 06:00PM",
                      },
                      {
                        value: "06:00PM - 07:00PM",
                        label: "06:00PM - 07:00PM",
                      },
                      {
                        value: "07:00PM - 08:00PM",
                        label: "07:00PM - 08:00PM",
                      },
                      {
                        value: "08:00PM - 09:00PM",
                        label: "08:00PM - 09:00PM",
                      },
                      {
                        value: "09:00PM - 10:00PM",
                        label: "09:00PM - 10:00PM",
                      },
                      {
                        value: "10:00PM - 11:00PM",
                        label: "10:00PM - 11:00PM",
                      },
                      {
                        value: "11:00PM - 12:00AM",
                        label: "11:00PM - 12:00AM",
                      },
                    ]}
                    className={"w-full border  px-2 py-2"}
                    parentClassName={"w-full px-0 py-0"}
                  />
                </div>
                <div>
                  <TextArea
                    required={true}
                    label={"Brief Description"}
                    placeholder={
                      "Example: Kitchen Tap is not working, Bathroom Flash is not working"
                    }
                    row={5}
                    className={" bg-white"}
                    name={"description"}
                  />
                </div>
                <div className="md:flex justify-start items-end md:space-x-4 space-y-4 md:space-y-0">
                  <MultipleFileUpload
                    touched={touched.images}
                    errors={errors.images}
                    id={"images"}
                    name={"images"}
                    placeholder={"Upload Multiple Image"}
                    label={
                      "Upload single or multiple picture(.JPG/PNG) of the problem"
                    }
                    required={true}
                    parentClassName={"w-fit"}
                    className={"w-fit pr-5"}
                    setFieldValue={setFieldValue}
                    data={data}
                    loading={loading}
                    preview={previewUrls}
                    setPreview={setPreviewUrls}
                    accept={"image/jpeg, image/png, image/jpg, image/webp"}
                  />
                  {previewUrls.length > 0 && (
                    <div>
                      {previewUrls.length > 0 && (
                        <div className="flex flex-wrap md:grid  md:grid-cols-2 gap-4 xl:grid-cols-4">
                          {previewUrls.slice(0, 4).map((url, index) => (
                            <div
                              key={index}
                              className="h-32 w-32 overflow-hidden border relative rounded-lg"
                            >
                              <LazyLoadImage
                                className="h-32 w-32 rounded-lg object-cover"
                                src={`${config.url.ASSET_URL}${url.link}`}
                                alt={`Preview ${index}`}
                                loading="lazy"
                              />
                              <button
                                type="button"
                                className="absolute right-2 top-2 bg-white rounded-full p-1 text-black"
                                onClick={() => handleRemoveImage(index)}
                                aria-label={`Remove image ${index}`}
                              >
                                <Icons.Close />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      {previewUrls.length > 4 && (
                        <div className="mt-4">
                          <Button type={"button"} onClick={openModal}>
                            View All
                          </Button>
                        </div>
                      )}
                      {isModalOpen && (
                        <Modal
                          title="All Images"
                          isOpen={isModalOpen}
                          onClose={closeModal}
                          width="w-full"
                          height="md:h-screen"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
                            {previewUrls.map((url, index) => (
                              <div
                                key={index + 4}
                                className="relative overflow-hidden"
                              >
                                <LazyLoadImage
                                  className="w-full object-cover"
                                  src={`${config.url.ASSET_URL}${url.link}`}
                                  alt={`Preview ${index + 4}`}
                                  loading="lazy"
                                />
                                <button
                                  type="button"
                                  className="absolute right-2 top-2 bg-white rounded-full p-1 text-black"
                                  onClick={() => handleRemoveImage(index)}
                                  aria-label={`Remove image ${index}`}
                                >
                                  <Icons.Close />
                                </button>
                              </div>
                            ))}
                          </div>
                        </Modal>
                      )}
                    </div>
                  )}
                </div>

                <Button type={"submit"}>Submit Work Order</Button>
              </Form>
            );
          }}
        </Formik>
        <div className="my-10">
          <WorkOrderHistory />
        </div>
      </div>
    </div>
  );
};

export default WorkOrder;
