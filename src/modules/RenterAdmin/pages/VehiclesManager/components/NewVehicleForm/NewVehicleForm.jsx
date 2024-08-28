import { Button, Input, Select } from "@/components";
import { useAppDispatch } from "@/hooks";
import { addVehicle } from "@/services/vehicle/vehicle";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { carCompanies } from "./data";

const initialValues = {
  year: "",
  company: "",
  model: "",
  plate: "",
  vin: "",
  color: "",
  owner: "",
  issuing_state: "",
};

const validationSchema = Yup.object({
  year: Yup.string().required("Required!"),
  company: Yup.string().required("Required!"),
  model: Yup.string().required("Required!"),
  plate: Yup.string().required("Required!"),
  vin: Yup.string().required("Required!"),
  color: Yup.string().required("Required!"),
  owner: Yup.string().required("Required!"),
  issuing_state: Yup.string().required("Required!"),
});

export const NewVehicleForm = () => {
  const dispatch = useAppDispatch();

  const onSubmit = (values, { resetForm }) => {
    console.log(values);
    dispatch(addVehicle(values));
    resetForm();
  };
  return (
    <div className="md:p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Add New Vehicle</h2>
        <button
          onClick={() => setShowUtilityForm(false)}
          className="bg-gray-100 w-8 h-8 rounded-full flex justify-center items-center"
        >
          X
        </button>
      </div>
      <hr className="my-5 border-gray-200" />
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="space-y-5">
          <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
            <Input
              required={true}
              label={"Year"}
              placeholder={"2021"}
              name={"year"}
              className={"py-2 px-2"}
              type={"number"}
            />
            <Select
              name={"company"}
              required={true}
              label={"Making Company"}
              options={carCompanies}
              className={"w-full  px-2 py-2"}
              parentClassName={"w-full px-0 py-0"}
            />
            <Input
              required={true}
              label={"Model"}
              placeholder={"BMW X5"}
              name={"model"}
              className={"py-2 px-2"}
            />
          </div>
          <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
            <Input
              required={true}
              label={"Number Plate"}
              placeholder={"ERS 8579"}
              name={"plate"}
              className={"py-2 px-2 uppercase"}
            />
            <Input
              required={true}
              label={"Number Plate Issuing State"}
              placeholder={"Texas"}
              name={"issuing_state"}
              className={"py-2 px-2"}
            />
            <Input
              required={true}
              label={"VIN Number"}
              placeholder={"4Y1SL65848Z411439"}
              name={"vin"}
              className={"py-2 px-2"}
            />
          </div>
          <div className="w-full grid grid-cols-3 gap-6">
            <Select
              name={"color"}
              required={true}
              label={"Color"}
              options={[
                {
                  label: "Select Color",
                  value: "",
                },
                {
                  label: "White",
                  value: "White",
                },
                {
                  label: "Gray",
                  value: "Gray",
                },
                {
                  label: "Black",
                  value: "Black",
                },
                {
                  label: "Silver",
                  value: "Silver",
                },
                {
                  label: "Blue",
                  value: "Blue",
                },
                {
                  label: "Red",
                  value: "Red",
                },
                {
                  label: "Green",
                  value: "Green",
                },
                {
                  label: "Brown",
                  value: "Brown",
                },
                {
                  label: "Orange",
                  value: "Orange",
                },
                {
                  label: "Yellow",
                  value: "Yellow",
                },
                {
                  label: "Gold",
                  value: "Gold",
                },
                {
                  label: "Purple",
                  value: "Purple",
                },
              ]}
              className={"w-full  px-2 py-2"}
              parentClassName={"w-full px-0 py-0"}
            />
            <Select
              required={true}
              name={"owner"}
              label={"Vehicle Owner"}
              options={[
                {
                  label: "Select Owner",
                  value: "",
                },
                {
                  label: "Resident",
                  value: "Resident",
                },
                {
                  label: "Guest",
                  value: "Guest",
                },
              ]}
              className={"w-full  px-2 py-2"}
              parentClassName={"w-full px-0 py-0"}
            />
          </div>
          <Button type={"submit"}>Add Vehicle</Button>
        </Form>
      </Formik>
    </div>
  );
};
