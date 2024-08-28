import { Button, Input, Select } from "@/components";
import { Checkbox } from "@material-tailwind/react";
import { Form, Formik } from "formik";

export const SubscriptionCard = ({ active }) => {
  return (
    <div className="rounded-lg  w-fit border border-blue-500 overflow-hidden space-y-3 pb-5 bg-gray-50">
      <h4 className="bg-blue-600 text-white py-2 px-4 md:text-lg text-base">
        Priority Package(Monthly)-Active
      </h4>
      <div className="flex flex-col justify-center items-center px-4 md:space-y-5 space-y-3">
        <div className="flex flex-col justify-center items-center w-full">
          <p className="text-blue-600 md:text-base text-sm">
            Rent Village Apartment Complex
          </p>
          <p className="md:text-base text-sm">
            2612 Southwest Rd Dallas, TX 765446
          </p>
        </div>
        <h2 className="md:text-xl text-base">Total Unit: 200</h2>
        <div className="flex flex-col justify-center items-center w-full space-y-2">
          <h4 className="underline text-base underline-offset-2">Benefits</h4>
          <ul className="list-disc md:text-base text-sm">
            <li>Property Listing</li>
            <li>Management</li>
          </ul>
        </div>
        {active ? (
          <div className="flex flex-col justify-center md:text-base text-sm items-center text-blue-600">
            <p>Price: $199/Month</p>
            <p>Paid Till: July 2024</p>
            <p className="text-red-600 pt-2 md:pt-0">
              Payment Deadline: 5th Aug 2024{" "}
            </p>
            <Checkbox label="Active Auto Payment" />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <h4 className="underline underline-offset-2 text-blue-600">
              Select Price
            </h4>
            <div className="flex justify-center items-center md:text-base text-sm">
              <Checkbox label="$199/Month" />
              <Checkbox label="$1200/Year" />
            </div>
            <Formik
              initialValues={{}}
              onSubmit={() => {}}
              validationSchema={{}}
            >
              <Form className="flex flex-col justify-center items-center space-y-3">
                <div className="md:flex justify-center items-center md:space-x-2 space-y-3 md:space-y-0">
                  <Input
                    name={"a"}
                    placeholder={"Coupon code"}
                    className={"mt-2 md:mt-0"}
                  />
                  <p className="min-w-max text-center py-1 md:py-0">
                    Total: $266555
                  </p>
                </div>
                <div className="flex justify-center items-center w-full">
                  <Select
                    name={"b"}
                    options={[
                      {
                        label: "Select Bank/Card",
                        value: "Select Bank/Card",
                      },
                    ]}
                    className={"py-2 md:py-2.5 px-2"}
                    parentClassName={"w-full px-0 py-0"}
                  />
                  <Button className={"w-full min-w-max"}>Buy Now</Button>
                </div>
              </Form>
            </Formik>
          </div>
        )}
      </div>
    </div>
  );
};
