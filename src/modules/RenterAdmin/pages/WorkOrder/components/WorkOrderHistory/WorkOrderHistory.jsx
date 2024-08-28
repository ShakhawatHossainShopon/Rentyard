import { Select } from "@/components";
import { useAppDispatch, useGetAllWorkOrderSelector } from "@/hooks";
import { getAllWorkOrder } from "@/services/workOrder/workOrder";
import { Form, Formik } from "formik";
import { useEffect } from "react";

export const WorkOrderHistory = () => {
  const dispatch = useAppDispatch();
  const { data } = useGetAllWorkOrderSelector();

  console.log(data);

  useEffect(() => {
    dispatch(getAllWorkOrder());
  }, []);

  return (
    <Formik>
      <Form>
        <div className="flex justify-start items-center space-x-2">
          <h3 className="font-semibold">Work Order History</h3>
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
            className={"w-full px-2 py-2"}
            parentClassName={"w-fit px-0 py-0"}
          />
        </div>

        <hr className="my-5" />
        <ul className="list-disc pl-5">
          {data && data.length > 0
            ? data.map((item) => {
                return (
                  <li className="md:text-base text-sm" key={item.workOrderId}>
                    Order#{item.requestId} issues in{" "}
                    {item.area.map((elem) => (
                      <span>{elem}, </span>
                    ))}{" "}
                    -{" "}
                    <span
                      className={`text-blue-500  ${
                        item.status === "Resolved"
                          ? "text-green-500"
                          : item.status === "Cancelled"
                          ? "text-red-500"
                          : "text-blue-500"
                      }`}
                    >
                      {item.status}
                      {item.update_date
                        ? ` on ${item.update_date}`
                        : `, order placed on ${item.createdAt}`}
                      , access hour: {item.time}
                    </span>{" "}
                  </li>
                );
              })
            : ""}
        </ul>
      </Form>
    </Formik>
  );
};
