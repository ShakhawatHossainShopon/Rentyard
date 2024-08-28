import { Button, Input, TextArea } from "@/components";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
const initialValues = {
  name: "",
  subject: "",
  email: "",
  message: "",
};
const validationSchema = Yup.object({
  name: Yup.string().required("Required!"),
  subject: Yup.string().required("Required!"),
  email: Yup.string().required("Required!"),
  message: Yup.string().required("Required!"),
});
const onSubmit = (values, { resetForm }) => {
  console.log(values);
  resetForm();
  toast.success("Thank you for your feedback");
};
const Help = () => {
  return (
    <div className="w-full">
      <div className="p-2 md:p-4">
        <h2 className="md:text-3xl text-lg font-semibold pb-4 pt-2">
          Contact Us
        </h2>
        <hr className="pb-4" />
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ setFieldValue, touched, errors, values }) => (
            <Form className="w-full space-y-5">
              <div>
                <Input
                  required={true}
                  placeholder={"Enter Your Name"}
                  name={"name"}
                  className={"py-3 px-4 border rounded-sm"}
                  label={"Name"}
                />
              </div>
              <div>
                <Input
                  required={true}
                  placeholder={"Write Your Email"}
                  name={"email"}
                  type={"email"}
                  className={"py-3 px-4 border rounded-sm"}
                  label={"Email"}
                />
              </div>
              <div>
                <Input
                  required={true}
                  placeholder={"Write Your Subject"}
                  name={"subject"}
                  className={"py-3 px-4 border rounded-sm"}
                  label={"Subject"}
                />
              </div>

              <div>
                <TextArea
                  row={10}
                  placeholder="Write your subject"
                  name="message"
                  required
                  label={"Your Message"}
                />
              </div>
              <Button
                type="submit"
                className={"md:px-8 md:py-3 md:md:text-lg text-sm"}
              >
                Send Now
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Help;
