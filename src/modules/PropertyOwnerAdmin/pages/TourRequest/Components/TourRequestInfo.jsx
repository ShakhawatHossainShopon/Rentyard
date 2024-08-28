import { Button, Input, PopUp, Select } from "@/components";
import { config } from "@/config";
import { useAppDispatch } from "@/hooks";
import { updateTourByPO } from "@/services/tour/tour";
import { Icons } from "@/utils";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

const initialValues = {
  status: "",
  note: "",
};

const validationSchema = Yup.object({
  status: Yup.string().required("Required!"),
});

export const TourRequestInfo = ({
  photo,
  note,
  status,
  time,
  history,
  name,
  contact,
  email,
  title,
  address,
  city,
  state,
  country,
  zip,
  type,
  unit_number,
  date,
  tourId,
  propertyId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const dispatch = useAppDispatch();

  const onSubmit = (values) => {
    console.log(values);
    dispatch(
      updateTourByPO({ ...values, tourId: tourId, propertyId: propertyId })
    );
  };
  return (
    <div>
      {" "}
      <div className="md:p-4">
        <div className="md:flex 2xl:gap-48 md:gap-10 lg:gap-16 xl:gap-24 items-start">
          <div className="space-y-1">
            <p className="md:text-base text-sm">
              <span className="font-semibold">Name: </span>
              {name}
            </p>
            <p>
              <span className="font-semibold">Govt. ID Proof: </span>{" "}
              <span
                onClick={openModal}
                className="underline font-semibold cursor-pointer"
              >
                Click to Preview
              </span>
            </p>
            <PopUp
              isOpen={isModalOpen}
              onClose={closeModal}
              title={"Govt. ID Proof"}
            >
              <div className="flex justify-center items-center w-full md:px-9 px-4">
                <img
                  src={`${config.url.ASSET_URL}${
                    photo && photo.link && photo.link
                  }`}
                  alt=""
                  className="object-cover"
                />
              </div>
            </PopUp>
            <p className="md:text-base text-sm">
              <span className="font-semibold">Contact: </span> {contact}
            </p>
            <p className="md:text-base text-sm">
              <span className="font-semibold">Email: </span> {email}
            </p>
            <p className="md:text-base text-sm">
              <span className="font-semibold">Date: </span> {date}
            </p>
            {time && (
              <p className="md:text-base text-sm">
                <span className="font-semibold">Time: </span> {time}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <p className="md:text-lg text-sm"> {title} </p>
            <div className="flex justify-start items-start space-x-2">
              <p className="text-gray-700 text-base pt-0.5">
                <Icons.Location className="text-blue-700" />{" "}
              </p>
              <p className="text-gray-700 text-base flex flex-col items-start justify-center">
                <span className="text-sm"> {address},</span>
                <span className="text-sm">
                  {" "}
                  {city}, {state}, {country}, {zip}{" "}
                </span>
              </p>
            </div>
            <p className="md:text-base text-sm">
              <span className="font-semibold">Unit : </span> {unit_number}(
              {type})
            </p>
          </div>
        </div>
        {history ? (
          <div>
            <p className="md:text-base text-sm">
              <span className="font-semibold">Status: </span>
              {status}
            </p>
            {note && (
              <p className="md:text-base text-sm">
                <span className="font-semibold">Note: </span> {note}
              </p>
            )}
          </div>
        ) : (
          <div>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              {({ setValues, setFieldValue, touched, errors }) => {
                useEffect(() => {
                  setValues({ status: status, note: note });
                }, []);
                return (
                  <Form className="w-full">
                    <div className="md:flex items-center md:gap-7 pt-5 space-y-4 md:space-y-0">
                      <Select
                        name={"status"}
                        required={true}
                        label={"Status"}
                        options={[
                          {
                            label: "Select One",
                            value: "",
                          },
                          {
                            label: "Pending",
                            value: "Pending",
                          },
                          {
                            label: "Confirmed",
                            value: "Confirmed",
                          },
                          {
                            label: "Cancelled",
                            value: "Cancelled",
                          },
                          {
                            label: "Tour Done",
                            value: "Done",
                          },
                        ]}
                        className={"w-full"}
                        parentClassName={"w-full px-0 py-0"}
                      />

                      <Input
                        label={"Note"}
                        placeholder={"Write your note"}
                        name={"note"}
                        className={"py-2 px-2"}
                      />
                      <div>
                        <Button className={"md:mt-7 mt-3"} type="submit">
                          Update
                        </Button>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        )}
      </div>
    </div>
  );
};
