import { AdminHeader } from "@/components";
import { useScrollToTop } from "@/hooks";
import { InsuranceForm, MonthlyStatement } from "./components";

const InsuranceDocs = () => {
  useScrollToTop();
  return (
    <div className="w-full">
      <AdminHeader renterAdmin={true} title={"Insurance Docs"} />
      <div className="w-full p-4 space-y-10">
        <p className="tracking-wider md:text-base text-sm">
          For any accidental damage to the apartment's amenities or other items,
          you will be charged. To ensure your safety, consider enrolling in
          renter's insurance.
        </p>
        <InsuranceForm />
        <div>
          <div>
            <h2 className="md:text-xl font-bold text-lg">Documents Center</h2>
          </div>
          <hr className="my-5 border-gray-200" />
          <ul className="list-disc px-5">
            <li className="md:text-base text-sm">
              Address Proof-
              <span className="text-blue-500 underline underline-offset-2">
                Download
              </span>
            </li>
            <li className="md:text-base text-sm">
              PropertyName-Lease Document-
              <span className="text-blue-500 underline underline-offset-2">
                Download
              </span>
            </li>
          </ul>
        </div>
        <MonthlyStatement />
      </div>
    </div>
  );
};

export default InsuranceDocs;
