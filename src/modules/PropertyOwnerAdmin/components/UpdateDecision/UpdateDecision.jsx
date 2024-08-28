import { Button, Input, Select } from "@/components";
import { useAppDispatch } from "@/hooks";
import { updateApplicationByPO } from "@/services/application/application";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as Yup from "yup";

const initialValues = {
  status: "",
  note: "",
};

const validationSchema = Yup.object({
  status: Yup.string().required("Required!"),
});

const UpdateDecision = ({
  apartmentId,
  applicationId,
  propertyId,
  status,
  note,
}) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const onSubmit = (values) => {
    console.log(values);
    dispatch(
      updateApplicationByPO({
        ...values,
        applicationId: applicationId,
        propertyId: propertyId,
        apartmentId: apartmentId,
      })
    );
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ setValues }) => {
        useEffect(() => {
          setValues({ status: status, note: note });
        }, []);
        return (
          <Form className="px-4 py-4 w-full border-2 border-blue-500">
            <div className="grid grid-cols-4 gap-6 place-items-end">
              <Select
                name={"status"}
                label={"Update Status"}
                required={true}
                options={
                  location.pathname === "/propertyadmin/residents"
                    ? [
                        {
                          label: "Select One",
                          value: "",
                        },
                        {
                          label: "Resident (Not Moved-In)",
                          value: "Resident (Not Moved-In)",
                        },
                        {
                          label: "Resident (Moved-In)",
                          value: "Resident",
                        },
                        {
                          label: "Lease Renewed",
                          value: "Resident (Renewed)",
                        },
                        {
                          label: "Move-Out Request Accepted",
                          value: "Resident (Move-Out Accepted)",
                        },
                        {
                          label: "Move-Out Complete",
                          value: "Moved-Out",
                        },
                      ]
                    : [
                        {
                          label: "Select One",
                          value: "",
                        },
                        {
                          label: "Under Review",
                          value: "Under Review",
                        },
                        {
                          label: "Approved",
                          value: "Approved",
                        },
                        {
                          label: "Declined",
                          value: "Declined",
                        },
                      ]
                }
                className={"px-2"}
                parentClassName={"w-full px-0 py-0"}
              />
              <Input
                name={"note"}
                label={"Note"}
                className={"px-2 py-2"}
                placeholder={"Write Your Note Here"}
                parentClassName={"col-span-2"}
              />
              <div>
                <Button className={"text-sm bg-blue-600"}>
                  Update Decision
                </Button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default UpdateDecision;
