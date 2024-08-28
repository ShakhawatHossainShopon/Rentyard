import { Button, Input, Modal } from "@/components";
import { useAppDispatch } from "@/hooks";
import { CostBreakdownInfo } from "@/modules/UserClient/pages/ProjectDetails/sections/FloorPlan/Components";
import { deleteApplication } from "@/services/application/application";
import { AddApplicationApprovalPayment } from "@/services/applicationFee/applicationFee";
import { Icons } from "@/utils";
import { Tooltip } from "@material-tailwind/react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Form, Formik } from "formik";
import { memo, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import * as Yup from "yup";
const initialValues = {
  isAmount: false,
  split_amount: "",
};
const validationSchema = Yup.object({
  isAmount: Yup.boolean().required("Required!"),
  split_amount: Yup.string().test(
    "isAmount-if-true",
    "Required!",
    function (value) {
      const { isAmount } = this.parent;
      if (isAmount === true) {
        return !!value; // Return true if user_email has a value
      }
      return true; // Return true if not "Occupied"
    }
  ),
});
export const ApprovalMessage = memo(({ item }) => {
  const [split, setSplit] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useAppDispatch();
  const onSubmit = async (values, { resetForm }) => {
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
          AddApplicationApprovalPayment({
            split_amount: values.split_amount,
            applicationId: item.applicationId,
            token: token.id,
          })
        );
        resetForm();
        // Clear the card input field
        cardElement.clear();
        setSplit(false);
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
  console.log(item);
  const Address = `${item.property.address && item.property.address}, ${
    item.property.city && item.property.city
  } ${item.property.state && item.property.state} ${
    item.property.zip && item.property.zip
  }`;
  // const Address = "dhaka";
  const [isCopied, setIsCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleCopy = () => {
    navigator.clipboard
      .writeText(Address)
      .then(() => {
        setIsCopied(true);
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ setFieldValue, setValues, values }) => {
        return (
          <Form className="md:p-10 p-5 bg-gray-100">
            <h3 className="text-lg font-semibold py-3">
              Hi {item.name && item.name},{" "}
            </h3>
            <h2 className="md:text-xl text-sm text-blue-700 font-semibold pb-3">
              Congratulations! Your Application is Approved.
            </h2>
            <div className="space-y-2">
              <p className="md:text-base text-sm">
                <span className="font-bold">Name</span> :{" "}
                {item.property.name && item.property.name}
              </p>
              <div className="flex justify-start items-center space-x-2">
                <p className="md:text-base text-sm">
                  <span className="font-bold">Address</span> : {Address}
                </p>
                {isCopied ? (
                  <Tooltip content="Text Copied">
                    <Icons.Tik />
                  </Tooltip>
                ) : (
                  <Tooltip content="Copy">
                    <button onClick={handleCopy}>
                      <Icons.Copy className="text-lg" />
                    </button>
                  </Tooltip>
                )}
              </div>
              <p className="md:text-base text-sm">
                <span className="font-bold">Unit Number</span> : #
                {item.apartment.unit_number}({item.apartment.type}){" "}
                {item.apartment.unit_name && ` - ${item.apartment.unit_name}`}-{" "}
                {item.apartment.space}
                Sqft
              </p>
              <p className="md:text-base text-sm">
                <span className="font-bold">Payment Deadline</span> :{" "}
                {item.deadline_date}{" "}
                <span className="text-xs">(MM-DD-YYYY)</span>
              </p>
              <p className="md:text-base text-sm">
                <span className="font-bold">Move-In Date</span> :{" "}
                {item.move_in_date}{" "}
                <span className="text-xs">(MM-DD-YYYY)</span>
              </p>
            </div>
            <hr className="my-3" />
            <p className="md:text-base text-sm py-3">
              To complete the application process, please pay the move-in total
              of ${item.invoice_total} by {item.deadline_date}
              <span className="text-xs"> (MM-DD-YYYY)</span>. Once you have
              paid, the unit will be assigned to your name, and you will be
              ready to move in on {item.move_in_date}
              <span className="text-xs"> (MM-DD-YYYY)</span>. This is
              non-refundable payment.
            </p>
            <div className="md:flex justify-start items-center md:space-x-2">
              <p className="md:text-xl text-base text-blue-700">
                Move in total:{" "}
                <span className="font-semibold">${item.invoice_total}</span>{" "}
              </p>
              <button
                onClick={() => {
                  setSplit((prev) => !prev);
                  setFieldValue("isAmount", split === false ? true : false);
                }}
                type="button"
                className="underline py-2 md:py-0 text-sm cursor-pointer"
              >
                Split Amount
              </button>
              <button
                onClick={openModal}
                className="underline py-2 md:py-0 text-sm cursor-pointer"
                type="button"
              >
                See Breakdown
              </button>
              <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={"Cost Breakdown"}
                width={"w-6/12"}
              >
                <CostBreakdownInfo
                  fees={item.invoice}
                  total={item.invoice_total}
                />
              </Modal>
            </div>
            <div className="md:flex md:space-y-5 mt-4 w-full md:w-1/2 flex-col">
              {split && (
                <Input
                  className={"py-2 px-4"}
                  type="number"
                  placeholder="Custom Amount"
                  parentClassName={"py-0 px-0 w-full"}
                  name="split_amount"
                />
              )}
              <div className="">
                <label
                  className={`block mb-2 md:text-sm text-xs font-medium text-gray-900 xl:min-w-max "after:content-['*']`}
                >
                  You Will Be Charged{" "}
                  <span className="text-red-600">
                    ${item.invoice_total && item.invoice_total.toFixed(2)}+(Card
                    Fee)
                  </span>
                  . Now, Enter Card Details
                </label>
                <CardElement
                  onChange={(e) => {
                    console.log(e);
                  }}
                  className="border border-blue-500 py-2 px-2 bg-white"
                />
              </div>
            </div>
            <div className="flex gap-4 py-4">
              <Button type={"submit"}>Pay Now</Button>
              <Button
                onClick={() => {
                  Swal.fire({
                    title: "Are You Sure?",
                    showDenyButton: true,
                    confirmButtonText: "Ok",
                    denyButtonText: `Cancel`,
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                      dispatch(
                        deleteApplication({
                          applicationId: item.applicationId,
                          decline: true,
                        })
                      );
                    }
                  });
                }}
                type={"button"}
                className={"bg-red-600 hover:bg-red-700"}
              >
                Decline
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
});
