import { AdminHeader, Button } from "@/components";
import { useScrollToTop } from "@/hooks";
import { useState } from "react";
import { AddInvoiceForm, AllInvoice } from "./components";

const Invoices = () => {
  useScrollToTop();
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="w-full">
      <AdminHeader title={"Invoices"} />
      <div className="w-full md:p-4 p-2 md:space-y-10 space-y-5">
        <Button
          className={"mt-3 md:mt-0"}
          onClick={() => setShowForm((prev) => !prev)}
        >
          {showForm ? "Close Form" : "Create Invoice"}
        </Button>
        {showForm ? <AddInvoiceForm /> : null}

        <AllInvoice />
      </div>
    </div>
  );
};

export default Invoices;
