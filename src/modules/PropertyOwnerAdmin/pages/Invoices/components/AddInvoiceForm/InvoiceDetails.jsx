import { Button, Datepicker } from "@/components";
import { Icons } from "@/utils";
import { useState } from "react";
import { invoiceData } from "../../invoiceData";

export const InvoiceDetails = () => {
  const [infoDetails, setInfoDetails] = useState(invoiceData);
  const [showForm, setShowForm] = useState(false);
  const [itemInfo, setItemInfo] = useState({
    desc: "",
    amount: "",
    date: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setInfoDetails([
      ...infoDetails,
      {
        desc: itemInfo.desc,
        amount: Number(itemInfo.amount),
        date: itemInfo.date,
      },
    ]);
  };

  const handleChangeDate = (value) => {
    const date = new Date(value);
    setItemInfo({ ...itemInfo, date: date });
  };

  const handleChange = (e) => {
    setItemInfo({ ...itemInfo, [e.target.name]: e.target.value });
  };

  const calculateTotalAmount = () => {
    return infoDetails.reduce((total, item) => total + item.amount, 0);
  };

  const totalAmount = calculateTotalAmount();

  return (
    <div className="space-y-5">
      <h3 className="md:text-lg font-semibold">Invoice Details</h3>
      <hr className="mt-1 mb-2" />
      <div className="space-y-3">
        {infoDetails.map((info, index) => {
          return (
            <div
              className="flex justify-between items-center border-b border-b-gray-400 py-1"
              key={index}
            >
              <div className="md:text-base text-sm">
                {" "}
                {index + 1}. {info.desc}{" "}
              </div>
              <div className="flex justify-center items-center space-x-2 ">
                <p className="font-medium md:text-base text-sm">
                  ${info.amount}{" "}
                </p>
                <Icons.Edit className="text-gray-600 md:text-base text-sm" />
                <Icons.Delete className="text-red-500 md:text-base text-sm" />
              </div>
            </div>
          );
        })}
        <div className="flex justify-between items-center px-0">
          <div className="font-medium md:text-base text-sm">Total</div>
          <div className="flex justify-center items-center space-x-2">
            <p className="font-semibold md:text-base text-sm">
              ${Number(totalAmount).toFixed(2)}{" "}
            </p>
          </div>
        </div>
      </div>

      <Button type={"button"} onClick={() => setShowForm((prev) => !prev)}>
        {showForm ? "Close Form" : "Add New Item"}
      </Button>
      {showForm && (
        <form className="w-full space-y-5">
          <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
            <div className={`w-full`}>
              <label
                className={`block mb-2 text-sm font-medium text-gray-900 min-w-max after:content-['*'] after:text-red-400`}
                htmlFor=""
              >
                Items/Service Description
              </label>
              <input
                type={"text"}
                className={`border border-blue-500 text-gray-900 text-sm block w-full p-2 outline-none transition-all duration-200 bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-50`}
                name="desc"
                placeholder={"Eg. Hand Towel, 3CT"}
                value={itemInfo.desc}
                onChange={handleChange}
              />
            </div>
            <div className={`w-full`}>
              <label
                className={`block mb-2 text-sm font-medium text-gray-900 min-w-max after:content-['*'] after:text-red-400`}
                htmlFor=""
              >
                Amount
              </label>
              <input
                type={"number"}
                className={`p-2 border border-blue-500 text-gray-900 text-sm block w-full outline-none transition-all duration-200 bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-50`}
                name="amount"
                placeholder={"$4.00"}
                value={itemInfo.amount}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="w-full md:grid md:grid-cols-3 space-y-5 md:space-y-0">
            <Datepicker
              required={true}
              name="date"
              label="Date"
              className="py-2 px-1 w-full"
              parentClassName="p-0 w-full"
              value={itemInfo.date}
              onChange={handleChangeDate}
            />
          </div>
          <div className="w-full flex justify-start">
            <Button onClick={handleSubmit} type={"submit"}>
              Add Item
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
