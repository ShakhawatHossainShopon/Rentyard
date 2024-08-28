import { Button, Datepicker } from "@/components";
import { useAppDispatch } from "@/hooks";
import { addRenewOrMoveOut } from "@/services/renewOrMoveOut/renewOrMoveOut";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const initialValues = {
  date: "",
};

const validationSchema = Yup.object({
  date: Yup.string().required("Required!"),
});

export const MoveOut = ({ applicationId }) => {
  const dispatch = useAppDispatch();
  const onSubmit = (values, { resetForm }) => {
    console.log(values);
    dispatch(
      addRenewOrMoveOut({
        ...values,
        type: "Move Out",
        applicationId: applicationId,
      })
    );
    resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ values, setFieldValue, touched, errors }) => {
        return (
          <Form className="space-y-5">
            <Datepicker
              required={true}
              parentClassName={"w-full px-0 py-0 relative bg-gray-100 z-50"}
              label={"Move-Out Date"}
              name={"date"}
              className={"py-2 px-2 w-full z-50 bg-white"}
              value={values.date}
              onChange={(e) => {
                setFieldValue("date", e);
              }}
              touched={touched.date}
              errors={errors.date}
            />
            <Button type={"submit"} className={"min-w-max md:text-sm text-xs"}>
              Submit Request
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};
