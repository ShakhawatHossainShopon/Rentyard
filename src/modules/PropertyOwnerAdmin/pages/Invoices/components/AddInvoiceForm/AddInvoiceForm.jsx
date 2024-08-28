import { Button, FileUpload, Input } from "@/components";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { InvoiceDetails } from "./InvoiceDetails";

const initialValues = {
  invoiceName: "",
  invoiceMakerName: "",
  whoPayedForInvoice: "",
  paymentType: "",
  totalInvoiceAmount: "",
  receipt: "",
};

const validationSchema = Yup.object({
  invoiceName: Yup.string().required("Required!"),
  invoiceMakerName: Yup.string().required("Required!"),
  whoPayedForInvoice: Yup.string().required("Required!"),
  paymentType: Yup.string().required("Required!"),
  totalInvoiceAmount: Yup.string().required("Required!"),
  receipt: Yup.string().required("Required!"),
});

const onSubmit = (values) => {
  console.log(values);
};

export const AddInvoiceForm = () => {
  return (
    <div className="space-y-5 md:border md:border-blue-500 p-0 md:p-4">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ setFieldValue, touched, errors }) => {
          return (
            <Form className="w-full space-y-5">
              <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
                <Input
                  required={true}
                  label={"Invoice Name"}
                  placeholder={"Eg. SamsClub bill"}
                  name={"invoiceName"}
                  className={"py-2 px-2"}
                />
                <Input
                  required={true}
                  label={"Invoice maker name"}
                  placeholder={"John Doe(Manager)"}
                  name={"invoiceMakerName"}
                  className={"py-2 px-2"}
                />
                <Input
                  required={true}
                  label={"Who paid for the invoice"}
                  placeholder={"Eg. John Doe"}
                  name={"whoPayedForInvoice"}
                  className={"py-2 px-2"}
                />
              </div>
              <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
                <Input
                  required={true}
                  label={"Payment Type"}
                  placeholder={"Eg. Credit Card"}
                  name={"paymentType"}
                  className={"py-2 px-2"}
                />
                <Input
                  required={true}
                  label={"Total invoice amount"}
                  placeholder={"60"}
                  name={"totalInvoiceAmount"}
                  className={"py-2 px-2"}
                />
                <FileUpload
                  label={"Upload receipt(Optional)"}
                  className={"bg-white"}
                  name={"receipt"}
                  setFieldValue={setFieldValue}
                />
              </div>
              <InvoiceDetails />
              <div className="w-full flex md:justify-end md:pb-0 pb-3">
                <Button type={"submit"}>Save Now</Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
