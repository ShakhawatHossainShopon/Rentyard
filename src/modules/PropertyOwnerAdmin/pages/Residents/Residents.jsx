import { AdminHeader, Searchbar, Select } from "@/components";
import {
  useAppDispatch,
  useGetApplicationListForPOSelector,
  useScrollToTop,
} from "@/hooks";
import { getApplicationListForPO } from "@/services/application/application";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { ApplicantAccordion } from "../Applications/components";

const Residents = () => {
  useScrollToTop();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getApplicationListForPO());
  }, [dispatch]);
  const { loading, data } = useGetApplicationListForPOSelector();

  const showData =
    data &&
    data.filter(
      (item) =>
        item.status === "Resident (Not Moved-In)" ||
        item.status === "Resident" ||
        item.status === "Resident (Renewed)" ||
        item.status === "Resident (Move-Out Accepted)"
    );
  console.log(data);

  const historyData =
    data && data.filter((item) => item.status === "Moved-Out");

  return (
    <div className="w-full">
      <AdminHeader title={"Residents"} />
      <div className="md:p-4 p-2 w-full">
        <div className="lg:flex justify-between items-center gap-0 md:gap-52 w-full">
          <h3 className="min-w-max md:text-lg text-base lg:py-0 py-4 font-medium">
            New Application List
          </h3>
          <Formik>
            <Form className="w-full">
              <Searchbar
                query={"a"}
                placeholder={"Search here.."}
                className={"w-full"}
                isShowButton={true}
              />
            </Form>
          </Formik>
        </div>
        <hr className="my-5" />
        <div className="space-y-10">
          <ApplicantAccordion data={showData} />
          <Formik>
            <Form className="flex justify-start items-center space-x-2 px-4 w-full">
              <h3 className="text-lg font-semibold">Resident History</h3>
              <Select
                name={"a"}
                options={[
                  {
                    label: "3 Months",
                    value: "3 Months",
                  },
                  {
                    label: "6 Months",
                    value: "6 Months",
                  },
                  {
                    label: "12 Months",
                    value: "12 Months",
                  },
                  {
                    label: "15 Months",
                    value: "15 Months",
                  },
                ]}
                className={"w-full border border-blue-500 px-2 py-2"}
                parentClassName={"w-fit px-0 py-0"}
              />
            </Form>
          </Formik>
          <ApplicantAccordion data={historyData} history={true} />
        </div>
      </div>
    </div>
  );
};

export default Residents;
