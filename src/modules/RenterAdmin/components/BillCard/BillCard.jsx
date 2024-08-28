import { Button, Select } from "@/components";
import { Form, Formik } from "formik";
import { useState } from "react";

export const BillCard = ({ isCloseBtn, title }) => {
  const [isSplit, setIsSplit] = useState(false);
  const [bill] = useState(4090.8);
  const [splitedBill, setSplitedBill] = useState();

  const handleSplit = (spliter) => {
    if (spliter === "half") {
      setSplitedBill((bill / 2).toFixed(2));
    } else if (spliter === "oneThird") {
      setSplitedBill((bill / 3).toFixed(2));
    } else if (spliter === "custom") {
      setSplitedBill("");
    }
  };

  const handleInputChange = (value) => {
    setSplitedBill(value);
  };

  return (
    <Formik>
      <Form className="w-full flex flex-col justify-center items-center max-w-[400px] bg-gray-100 space-y-2">
        <h2 className="w-full bg-black text-white font-bold py-2 text-center relative">
          {title}
          {isCloseBtn && (
            <button className="bg-white px-1 absolute right-1 top-1 text-black w-fit h-fit">
              x
            </button>
          )}
        </h2>
        <p>Due Date: 01 June 2024</p>
        <h4 className="text-xl font-bold text-blue-600"> ${bill} </h4>
        <div className="flex justify-center items-center space-x-2">
          <button className="bg-gray-300 border focus:border-blue-500 py-1 px-2">
            View Invoice
          </button>
          <button
            onClick={() => setIsSplit((prev) => !prev)}
            className="bg-gray-300 border focus:border-blue-500 py-1 px-2"
          >
            Split Bill
          </button>
        </div>
        {isSplit && (
          <div className="flex justify-center items-center space-x-2 overflow-hidden">
            <div className="flex justify-center items-center space-x-1">
              <button
                onClick={() => handleSplit("half")}
                className="bg-gray-300 border focus:border-blue-500 py-1 px-2 text-xs"
              >
                1/2
              </button>
              <button
                onClick={() => handleSplit("oneThird")}
                className="bg-gray-300 border focus:border-blue-500 py-1 px-2 text-xs"
              >
                1/3
              </button>
              <button
                onClick={() => handleSplit("custom")}
                className="bg-gray-300 border focus:border-blue-500 py-1 px-2 text-xs"
              >
                Custom
              </button>
            </div>
            <div className="max-w-24">
              <input
                value={splitedBill}
                onChange={(e) => handleInputChange(e.target.value)}
                className="border px-1 border-blue-500 outline-none max-w-24"
                type="number"
                placeholder="$2000"
              />
            </div>
          </div>
        )}
        <div className="flex items-center w-full">
          <Select
            name={"a"}
            options={[
              {
                value: "Select Bank/Card",
                label: "Select Bank/Card",
              },
            ]}
            className={"py-2.5 px-1"}
            parentClassName={"px-0 py-0 w-full"}
          />
          <Button className={"w-full text-xs"}>Pay Now</Button>
        </div>
      </Form>
    </Formik>
  );
};
