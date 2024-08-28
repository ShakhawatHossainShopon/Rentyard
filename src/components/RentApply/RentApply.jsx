import { useAppDispatch, useGetUserSelector, useLoginSelector } from "@/hooks";
import { addApplication } from "@/services/application/application";
import { Icons } from "@/utils";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Form, Formik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Button, Datepicker, Select } from "../ui";

const initialValues = {
  move_in_date: "",
  lease_term: "",
};

const validationSchema = Yup.object({
  move_in_date: Yup.string().required("Required!"),
  lease_term: Yup.string().required("Required!"),
});

export const RentApply = ({
  pendingApartmentIds,
  residentApartmentIds,
  pendingApplication,
  residentApplication,
  fee,
  options,
  name,
  address,
  city,
  state,
  country,
  unit_number,
  type,
  apartmentId,
  propertyId,
  onClose,
}) => {
  const isUserResident =
    residentApartmentIds.length === 0
      ? [false]
      : residentApartmentIds.map((item) => {
          if (item === apartmentId) {
            return item;
          }
          return false;
        });

  const isUserApplied =
    pendingApartmentIds.length === 0
      ? [false]
      : pendingApartmentIds.map((item) => {
          if (item === apartmentId) {
            return item;
          }
          return false;
        });

  const res = useLoginSelector();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useAppDispatch();
  const { data } = useGetUserSelector();
  const [isChecked, setIsChecked] = useState(false);
  const convertedOptions = [
    { value: "", label: "Select One" },
    ...options.map((option) => {
      return {
        value: option.lease_term,
        label: `${option.lease_term} Term - $${option.rent}/month`,
      };
    }),
  ];

  const onSubmit = async (values) => {
    console.log(values);
    // onClose();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      // Create a token using Stripe's API
      const { token, error } = await stripe.createToken(cardElement);

      if (token) {
        console.log(token);
        dispatch(
          addApplication({
            ...values,
            apartmentId: apartmentId,
            propertyId: propertyId,
            token: token.id,
          })
        );
        onClose();
      }

      if (error) {
        toast.error(error.message);
        return;
      }

      // Send the token to your backend
      // await axios.post("/your-backend-endpoint", {
      // token: token.id,
      // Optionally include other details like the cardholder name if needed
      // });

      // Handle successful submission
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      {res.isRenter ? (
        data && data.profile_completion >= 80 ? (
          isUserApplied[0] === false ? (
            isUserResident[0] === false ? (
              pendingApplication ? (
                <div className="w-full h-[40vh] flex justify-center items-center text-lg font-semibold">
                  Someone Already Applied for this Apartment
                </div>
              ) : residentApplication ? (
                <div className="w-full h-[40vh] flex justify-center items-center text-lg font-semibold">
                  Resident Already exists in this Apartment
                </div>
              ) : (
                <div className="flex flex-col-reverse xl:flex-row justify-center items-start xl:space-x-5 w-full pb-6">
                  <Formik
                    className={"flex-1"}
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                  >
                    {({ setFieldValue, values, touched, errors }) => {
                      return (
                        <Form className="space-y-5 md:px-0 px-2 pt-6 xl:pt-0">
                          <div>
                            <h2 className="md:text-2xl text-lg font-semibold md:mt-2">
                              {name}
                            </h2>
                            <h3 className="md:text-base text-sm md:py-5 py-2 flex md:items-center gap-2">
                              <Icons.Location className="text-blue-700 md:mt-0 mt-1" />
                              {address}, {city}, {state}, {country}
                            </h3>
                            <p className="md:text-base text-sm">
                              <span className="font-semibold">Unit: </span>
                              {unit_number}({type})
                            </p>
                          </div>
                          <div className="flex flex-col justify-center w-full space-y-3">
                            <Datepicker
                              required={true}
                              parentClassName={"w-full px-2 py-0"}
                              label={"Move-In Date"}
                              name={"move_in_date"}
                              className={"py-2 px-2 border w-full bg-white"}
                              value={values.move_in_date}
                              onChange={(e) => {
                                console.log(e);
                                setFieldValue("move_in_date", e);
                              }}
                              touched={touched.move_in_date}
                              errors={errors.move_in_date}
                            />
                            <Select
                              name={"lease_term"}
                              className="px-2"
                              label={"Select Lease Term"}
                              options={convertedOptions}
                              parentClassName={"w-full"}
                            />
                            <div className="mx-2">
                              <label
                                className={`block mb-2 md:text-sm text-xs font-medium text-gray-900 xl:min-w-max "after:content-['*']`}
                              >
                                You Will Be Charged{" "}
                                <span className="text-red-600">
                                  ${fee.data.amount && fee.data.amount}+(Card
                                  Fee)
                                </span>
                                . Now, Enter Card Details
                              </label>
                              <CardElement
                                onChange={(e) => {
                                  console.log(e);
                                }}
                                className="border border-blue-500 py-2.5 px-2"
                              />
                            </div>
                          </div>
                          <div className="flex items-center xl:px-0 px-2">
                            <input
                              type="checkbox"
                              id="agreement"
                              checked={isChecked}
                              onChange={(e) => setIsChecked(e.target.checked)}
                              className="rounded border-gray-300 text-blue-500 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            />
                            <label
                              htmlFor="agreement"
                              className="md:text-sm text-xs font-semibold text-gray-700 ml-2"
                            >
                              Give Permission to check background. Accept Terms
                              & Condition
                            </label>
                          </div>

                          <Button
                            className={`px-7 xl:mx-0 mx-2 ${
                              isChecked
                                ? ""
                                : "bg-gray-400 cursor-not-allowed hover:bg-gray-400"
                            }`}
                            type={"Submit"}
                            disabled={!isChecked}
                          >
                            Apply for Rent
                          </Button>
                        </Form>
                      );
                    }}
                  </Formik>
                  <div className="flex-1 xl:space-y-5 space-y-3 px-4 md:px-0">
                    <h3 className="underline md:text-xl text-base">
                      Rental Requirement
                    </h3>
                    <ul className="list-disc px-4 md:text-base text-sm">
                      <li>Identity Proof</li>
                      <li>Background Check</li>
                      <li>Income Proof</li>
                      {/* <li>Income must be ${rent * 2.5}+ </li> */}
                    </ul>
                    <div>
                      <p className="md:text-base text-sm">
                        Application Fee - $
                        {fee.data.amount && fee.data.amount - 1.99}
                      </p>
                      <p className="md:text-base text-sm">
                        App Processing Fee - $1.99{" "}
                      </p>
                      <p className="md:text-base text-sm">
                        Total Application Fee - $
                        {fee.data.amount && fee.data.amount}{" "}
                      </p>
                      <hr className="my-1" />
                      <p className="xl:text-xl md:text-base text-sm font-semibold">
                        Total Fee - ${fee.data.amount && fee.data.amount}{" "}
                      </p>
                    </div>
                  </div>
                </div>
              )
            ) : (
              <div className="w-full h-[40vh] flex justify-center items-center text-lg font-semibold">
                You are Already a Resident of this Apartment.
              </div>
            )
          ) : (
            <div className="w-full h-[40vh] flex justify-center items-center text-lg font-semibold">
              You have Already Applied for this Apartment.
            </div>
          )
        ) : (
          <div className="w-full h-[40vh] flex justify-center items-center text-lg font-semibold">
            Please complete your profile first.
          </div>
        )
      ) : (
        <div className="w-full h-[40vh] flex justify-center items-center text-lg font-semibold">
          Please Login First.
        </div>
      )}
    </>
  );
};
