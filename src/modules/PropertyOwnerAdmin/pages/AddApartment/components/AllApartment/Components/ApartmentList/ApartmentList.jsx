import { useAppDispatch } from "@/hooks";
import { deleteApartment } from "@/services/apartment/apartment";
import { Icons } from "@/utils";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { memo, useState } from "react";
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";
import { UpdateApartment } from "../UpdateApartment";

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

export const ApartmentList = memo(({ loading, data, updatedProperties }) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(0);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const handleDeleteApartment = (id) => {
    Swal.fire({
      title: "Are You Sure?",
      showDenyButton: true,
      confirmButtonText: "Ok",
      denyButtonText: `Cancel`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(deleteApartment(id));
      }
    });
  };

  return (
    <div className="space-y-2">
      {loading ? (
        <div className="w-full flex justify-center items-center h-[40vh]">
          <ClipLoader size={100} color="blue" />
        </div>
      ) : data.length === 0 ? (
        <div className="flex justify-center items-center w-full h-[40vh]">
          {" "}
          No Apartment Available...{" "}
        </div>
      ) : (
        data.map((item, index) => {
          return (
            <>
              <Accordion key={index} open={open === index + 1}>
                <AccordionHeader className="bg-blue-700 text-white py-0 hover:text-white text-sm">
                  <div className="flex justify-start items-center w-full">
                    <div
                      onClick={() => handleOpen(index + 1)}
                      className="flex-1 py-4 bg-red flex justify-between items-center px-2"
                    >
                      <div>
                        {item.property_name} - Unit#{item.unit_number} -{" "}
                        {item.availability}-{" "}
                        {item.published ? `(Published)` : `(Unpublished)`}
                      </div>
                      <div className="flex justify-start items-center space-x-3 mt-3 md:mt-0">
                        <Icon
                          onClick={() => handleOpen(index + 1)}
                          id={index + 1}
                          open={open}
                        />
                      </div>
                    </div>
                    <div className="flex justify-start items-center space-x-3 md:mt-0 mt-3">
                      <Icons.Delete
                        className=""
                        onClick={() => handleDeleteApartment(item.apartmentId)}
                      />
                    </div>
                  </div>
                </AccordionHeader>
                <AccordionBody
                  className={
                    "md:p-4 p-2 w-full md:border md:border-blue-500 bg-gray-50 border-t-0"
                  }
                >
                  <UpdateApartment
                    item={item}
                    updatedProperties={updatedProperties}
                  />
                </AccordionBody>
              </Accordion>
            </>
          );
        })
      )}
    </div>
  );
});
