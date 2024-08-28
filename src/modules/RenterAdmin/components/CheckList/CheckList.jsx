import { useState } from "react";
import { SingleCheckList } from "./Components/SingleCheckList";

export const CheckList = ({ property, apartment }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="py-4 px-6 bg-gray-50 border border-red-500">
      <h2 className="text-xl font-semibold">
        Pre move-in check list<span className="text-red-500">(Important)</span>
      </h2>

      <h3 className="md:text-base text-sm py-2">
        You have successfully made move-in payment. Now are you are ready to
        move-in on{" "}
        {apartment && apartment.move_in_date && apartment.move_in_date}
        <span className="text-xs"> (MM-DD-YYYY)</span>.
      </h3>
      <SingleCheckList property={property && property} />

      <div className={`pb-5 bg-[#F3F3F3] mt-6`}>
        <h2 className="md:text-lg text-base w-full py-2 px-6 bg-[#E7E7E7] font-bold">
          Required/Optional Utilities while Move-in Day.
        </h2>
        <ul className="px-10 py-3 list-disc">
          {apartment &&
            apartment.utilities &&
            apartment.utilities.map((item, index) => {
              return (
                <li key={index} className="">
                  {" "}
                  <span className="font-medium">
                    {item && item.type && item.type}{" "}
                    <span
                      className={`${
                        item && item.required && item.required === "Optional"
                          ? "text-blue-600"
                          : "text-red-500"
                      }`}
                    >
                      ({item && item.required && item.required})
                    </span>
                    :{" "}
                  </span>
                  <span>
                    {item && item.additional_note && item.additional_note}{" "}
                  </span>
                </li>
              );
            })}
        </ul>
      </div>
      <div className="flex items-center mt-9">
        <input
          type="checkbox"
          id="agreement"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          className="rounded border-gray-300 text-blue-500 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
        <label
          htmlFor="agreement"
          className="md:text-lg text-base text-black-700 ml-3 "
        >
          All checklist done and Close
        </label>
      </div>
    </div>
  );
};
