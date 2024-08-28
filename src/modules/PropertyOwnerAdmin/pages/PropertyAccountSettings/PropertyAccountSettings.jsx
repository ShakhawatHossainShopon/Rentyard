import { AdminHeader, UpdateLoginInfo } from "@/components";
import { useScrollToTop } from "@/hooks";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { useState } from "react";
import * as Yup from "yup";
import { AboutYou } from "./components";

const initialValues = {
  firstName: "", // Corrected typo here
  middleName: "",
  lastName: "",
  DoB: "",
  gender: "",
  maritalStatus: "",
  countryCitizen: "",
  idNumberType: "",
  idNumber: "",
  govtIssuedId: "",
  govtIssuedIdNumber: "",
  issuingCity: "",
  idPicture: "",
  creditScrore: "",
  company: "",
  companyYear: "",
  EIN: "",
  companyLocation: "",
};

const validationSchema = Yup.object({
  firstName: Yup.string().required("Required!"), // Corrected typo here
  lastName: Yup.string().required("Required!"),
  DoB: Yup.string().required("Required!"),
  gender: Yup.string().required("Required!"),
  maritalStatus: Yup.string().required("Required!"),
  countryCitizen: Yup.string().required("Required!"),
  idNumberType: Yup.string().required("Required!"),
  idNumber: Yup.string().required("Required!"),
  govtIssuedId: Yup.string().required("Required!"),
  govtIssuedIdNumber: Yup.string().required("Required!"),
  issuingCity: Yup.string().required("Required!"),
  creditScrore: Yup.string().required("Required!"),
  company: Yup.string().required("Required!"),
  companyYear: Yup.string().required("Required!"),
  EIN: Yup.string().required("Required!"),
  companyLocation: Yup.string().required("Required!"),
});

const onSubmit = (values) => {
  console.log(values);
};

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

const PropertyAccountSettings = () => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  useScrollToTop();
  return (
    <div className="w-full">
      <AdminHeader title={"Account Setting"} />
      <div className="w-full md:p-4 p-2 space-y-5">
        <p className="bg-pink-50 px-2 py-1 md:text-base text-sm">
          Note: Please provide accurate information. Incorrect information may
          result in account suspension.
        </p>
        <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
          <AccordionHeader
            className="bg-blue-700 text-white md:px-4 px-2 hover:text-white md:text-[1.25rem] text-sm"
            onClick={() => handleOpen(1)}
          >
            Update Login Details
          </AccordionHeader>
          <AccordionBody
            className={
              "md:px-4 px-2 w-full md:border md:border-blue-500 border-t-0 bg-gray-50"
            }
          >
            <UpdateLoginInfo />
          </AccordionBody>
        </Accordion>
        <Accordion
          className="overflow-y-visible"
          open={open === 2}
          icon={<Icon id={2} open={open} />}
        >
          <AccordionHeader
            className="bg-blue-700 text-white md:px-4 px-2 hover:text-white md:text-[1.25rem] text-sm"
            onClick={() => handleOpen(2)}
          >
            About You
          </AccordionHeader>
          <AccordionBody
            className={
              "px-4 w-full md:border md:border-blue-500 border-t-0 bg-gray-50"
            }
          >
            <AboutYou />
          </AccordionBody>
        </Accordion>
      </div>
    </div>
  );
};

export default PropertyAccountSettings;
