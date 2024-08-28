import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { useState } from "react";
import { TourRequestInfo } from "./TourRequestInfo";

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

export const TourRequestHistory = ({ loading, data }) => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  return (
    <div className="space-y-2">
      {data &&
        data.map((item, index) => {
          return (
            <Accordion
              key={item.tourId}
              open={open === index + 1}
              icon={<Icon id={index + 1} open={open} />}
            >
              <AccordionHeader
                className="bg-blue-700 text-white md:px-4 px-2 hover:text-white md:text-[1.25rem] text-sm"
                onClick={() => handleOpen(index + 1)}
              >
                {item &&
                  item.property &&
                  item.property.name &&
                  item.property.name}{" "}
                - Apt{" "}
                {item &&
                  item.apartment &&
                  item.apartment.unit_number &&
                  item.apartment.unit_number}{" "}
                - Contact -{" "}
                {item &&
                  item.user &&
                  item.user.contact_number &&
                  item.user.contact_number}{" "}
                - Status: {item && item.status && item.status}
              </AccordionHeader>
              <AccordionBody
                className={
                  "p-4 w-full border border-blue-500 bg-gray-50 border-t-0"
                }
              >
                <TourRequestInfo
                  history={true}
                  photo={
                    item &&
                    item.user &&
                    item.user.govt_id_photo &&
                    item.user.govt_id_photo
                  }
                  name={item && item.user && item.user.name && item.user.name}
                  contact={
                    item &&
                    item.user &&
                    item.user.contact_number &&
                    item.user.contact_number
                  }
                  email={
                    item && item.user && item.user.email && item.user.email
                  }
                  title={
                    item &&
                    item.property &&
                    item.property.name &&
                    item.property.name
                  }
                  address={
                    item &&
                    item.property &&
                    item.property.address &&
                    item.property.address
                  }
                  city={
                    item &&
                    item.property &&
                    item.property.city &&
                    item.property.city
                  }
                  state={
                    item &&
                    item.property &&
                    item.property.state &&
                    item.property.state
                  }
                  country={
                    item &&
                    item.property &&
                    item.property.country &&
                    item.property.country
                  }
                  zip={
                    item &&
                    item.property &&
                    item.property.zip &&
                    item.property.zip
                  }
                  type={
                    item &&
                    item.apartment &&
                    item.apartment.type &&
                    item.apartment.type
                  }
                  unit_number={
                    item &&
                    item.apartment &&
                    item.apartment.unit_number &&
                    item.apartment.unit_number
                  }
                  date={item && item.date && item.date}
                  tourId={item && item.tourId && item.tourId}
                  propertyId={item && item.propertyId && item.propertyId}
                  time={item && item.time && item.time}
                  status={item && item.status && item.status}
                  note={item && item.note && item.note}
                />
                {/* <TourRequestInfo history={true} /> */}
              </AccordionBody>
            </Accordion>
          );
        })}
    </div>
  );
};
