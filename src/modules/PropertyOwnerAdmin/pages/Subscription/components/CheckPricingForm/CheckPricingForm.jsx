import { Button, Input } from "@/components";
import { Form, Formik } from "formik";

export const CheckPricingForm = () => {
  return (
    <Formik>
      <Form>
        <div className="md:grid md:grid-cols-3 md:gap-6 w-full place-items-end space-y-5 md:space-y-0">
          <Input
            required={true}
            name={"a"}
            label={"Property Name"}
            placeholder={"Rent Village Apartment Complex"}
            className={""}
          />
          <Input
            required={true}
            name={"a"}
            label={"Enter Total Unit Count"}
            placeholder={"100"}
            className={""}
            type="number"
          />
          <Button className={"py-2.5 px-2 w-full h-fit"}>Check Pricing</Button>
        </div>
      </Form>
    </Formik>
  );
};
