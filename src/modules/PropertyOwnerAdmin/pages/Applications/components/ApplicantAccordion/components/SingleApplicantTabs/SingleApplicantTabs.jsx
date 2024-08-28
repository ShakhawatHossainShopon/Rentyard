import {
  ApplicationInfo,
  InvoiceInfo,
} from "@/modules/PropertyOwnerAdmin/components";
import { Icons } from "@/utils";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { useState } from "react";

function Icon({ id, open }) {
  return <>{id === open ? <Icons.Minus /> : <Icons.Plus />}</>;
}

export const SingleApplicantTabs = ({ item, history }) => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div className="bg-white space-y-2">
      <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
        <AccordionHeader
          className="bg-blue-600 text-white md:px-4 px-2  hover:text-white text-sm"
          onClick={() => handleOpen(1)}
        >
          Primary Applicant- {item.user.first_name}
        </AccordionHeader>
        <AccordionBody>
          <ApplicationInfo
            history={history}
            lease_term={item.lease_term}
            move_in_date={item.move_in_date}
            move_out_date={item.expected_move_out_date}
            apartment={item.apartment}
            user={item.user && item.user}
            isBtn={true}
          />
        </AccordionBody>
      </Accordion>
      {item.user.occupants &&
        item.user.occupants.length > 0 &&
        item.user.occupants.map((elem, index) => {
          return (
            <Accordion
              open={open === index + 2}
              icon={<Icon id={index + 2} open={open} />}
            >
              <AccordionHeader
                className="bg-blue-600 text-white md:px-4 px-2  hover:text-white text-sm"
                onClick={() => handleOpen(index + 2)}
              >
                {elem.type}- {elem.first_name} {elem.last_name}
              </AccordionHeader>
              <AccordionBody>
                <ApplicationInfo
                  user={elem && elem}
                  isBtn={true}
                  history={history}
                />
              </AccordionBody>
            </Accordion>
          );
        })}
      <Accordion
        open={open === (item.user.occupants && item.user.occupants.length + 2)}
        icon={
          <Icon
            id={item.user.occupants && item.user.occupants.length + 2}
            open={open}
          />
        }
      >
        <AccordionHeader
          className="bg-blue-600 text-white md:px-4 px-2  hover:text-white text-sm"
          onClick={() =>
            handleOpen(item.user.occupants && item.user.occupants.length + 2)
          }
        >
          Invoicing - Total: ${item.invoice_total}
        </AccordionHeader>
        <AccordionBody>
          <InvoiceInfo
            history={history}
            applicationId={item.applicationId}
            userId={item.userId}
            invoice={item.invoice}
            first_name={item.user.first_name}
            last_name={item.user.last_name}
            apartment={item.apartment}
            status={item.status}
            move_in_date={item.move_in_date}
            property_name={item.property.name}
            invoiceDetails={item.invoiceDetails}
          />
        </AccordionBody>
      </Accordion>
    </div>
  );
};
