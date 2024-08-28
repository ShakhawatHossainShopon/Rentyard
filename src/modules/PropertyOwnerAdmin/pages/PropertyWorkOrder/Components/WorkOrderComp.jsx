import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { WorkOrderInfo } from "./WorkOrderInfo";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

export const WorkOrderComp = ({ loading, data }) => {
  const [open, setOpen] = useState(0);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  return (
    <>
      {loading ? (
        <div className="w-full flex justify-center items-center h-[40vh]">
          <ClipLoader size={100} color="blue" />
        </div>
      ) : (
        data &&
        data.map((item, index) => {
          return (
            <Accordion
              key={item.workOrderId}
              open={open === index + 1}
              icon={<Icon id={index + 1} open={open} />}
            >
              <AccordionHeader
                className="bg-blue-700 text-white md:px-4 px-2 hover:text-white md:text-[1.25rem] text-sm"
                onClick={() => handleOpen(index + 1)}
              >
                ID#{item.requestId} - Unit:{" "}
                {item && item.apartment && item.apartment.unit_number}(
                {item && item.apartment && item.apartment.type}) - Contact:{" "}
                {item.contact_number} - Status: {item.status}
              </AccordionHeader>
              <AccordionBody
                className={
                  "md:p-4 p-2 w-full md:border  md:border-blue-500 bg-gray-50 border-t-0 dark:bg-[#354C7C]"
                }
              >
                <WorkOrderInfo item={item} history={false} />
              </AccordionBody>
            </Accordion>
          );
        })
      )}
    </>
  );
};
