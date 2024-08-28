import { Datepicker } from "@/components";

export const AllInvoice = () => {
  return (
    <div>
      <div className="md:flex justify-start items-center md:space-x-5">
        <h3 className="font-semibold text-lg min-w-max">All Invoices</h3>
        <Datepicker
          name="date"
          className="py-2 px-1"
          parentClassName="p-0 w-fit"
        />
        <span className="pt-3 md:pt-0">From</span>
        <Datepicker
          name="date"
          className="py-2 px-1"
          parentClassName="p-0 w-fit"
        />
      </div>
      <hr className="mt-5 mb-8 border-gray-500" />
      <div className="space-y-2">
        <p className="md:text-base text-sm">
          #37363 - SamsClub Bill - Paid by John Doe, Total: 23.00 -{" "}
          <span className="text-blue-500 underline underline-offset-2 cursor-pointer">
            Download
          </span>
        </p>
        <p className="md:text-base text-sm">
          #37363 - SamsClub Bill - Paid by John Doe, Total: 23.00 -{" "}
          <span className="text-blue-500 underline underline-offset-2 cursor-pointer">
            Download
          </span>
        </p>
      </div>
    </div>
  );
};
