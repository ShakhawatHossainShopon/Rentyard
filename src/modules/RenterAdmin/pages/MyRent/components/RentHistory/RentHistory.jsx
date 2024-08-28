import { Select } from "@/components";
import { RentApplicationStatusCard } from "@/modules/RenterAdmin/components";
import { Form, Formik } from "formik";

export const RentHistory = ({ historyData }) => {
  return (
    <Formik>
      <Form>
        <div className="flex justify-start items-center space-x-2">
          <h3 className="text-xl font-bold">Rent History</h3>
          <Select
            name={"a"}
            options={[
              {
                label: "3 Years",
                value: "3 Years",
              },
              {
                label: "6 Years",
                value: "6 Years",
              },
              {
                label: "12 Years",
                value: "12 Years",
              },
              {
                label: "15 Years",
                value: "15 Years",
              },
            ]}
            className={"w-full border border-blue-500 px-2 py-2"}
            parentClassName={"w-fit px-0 py-0"}
          />
        </div>

        <hr className="my-5" />
        <div className="md:flex space-y-5 md:space-y-0 gap-7">
          <>
            {historyData.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
                {historyData.map((item) => {
                  return (
                    <RentApplicationStatusCard
                      key={item.apartmentId && item.apartmentId}
                      applicationId={item.applicationId && item.applicationId}
                      title={
                        item.property &&
                        item.property.name &&
                        item.property.name
                      }
                      status={item.status && item.status}
                      address={
                        item.property &&
                        item.property.address &&
                        item.property.address
                      }
                      city={
                        item.property &&
                        item.property.city &&
                        item.property.city
                      }
                      state={
                        item.property &&
                        item.property.state &&
                        item.property.state
                      }
                      country={
                        item.property &&
                        item.property.country &&
                        item.property.country
                      }
                      zip={
                        item.property && item.property.zip && item.property.zip
                      }
                      type={
                        item.apartment &&
                        item.apartment.type &&
                        item.apartment.type
                      }
                      lease_term={item.lease_term && item.lease_term}
                      unit_number={
                        item.apartment &&
                        item.apartment.unit_number &&
                        item.apartment.unit_number
                      }
                      date={item.move_in_date && item.move_in_date}
                      isBtn={false}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="w-full flex justify-center items-center h-[40vh]">
                {" "}
                No History Available...{" "}
              </div>
            )}
          </>
        </div>
      </Form>
    </Formik>
  );
};
