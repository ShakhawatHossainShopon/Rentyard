import { AdminHeader, Select } from "@/components";
import {
  useAppDispatch,
  useGetApplicationForRenterSelector,
  useScrollToTop,
} from "@/hooks";
import { getApplicationForRenter } from "@/services/application/application";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { RentApplicationStatusCard } from "../../components";

const ApplicationCenter = () => {
  useScrollToTop();
  const dispatch = useAppDispatch();
  const { loading, data } = useGetApplicationForRenterSelector();
  console.log(data);

  const showData = data.filter(
    (item) => item.status === "Under Review" || item.status === "Approved"
  );

  const historyData = data.filter(
    (item) =>
      item.status === "Cancelled by Renter" ||
      item.status === "Declined by Renter" ||
      item.status === "Declined" ||
      item.status === "Moved-Out" ||
      item.status === "Expired"
  );

  const resident =
    data.length > 0 &&
    data.find(
      (item) =>
        item.status === "Resident" ||
        item.status === "Resident (Move-Out Accepted)" ||
        item.status === "Resident (Not Moved-In)" ||
        item.status === "Resident (Renewed)"
    );

  useEffect(() => {
    dispatch(getApplicationForRenter());
  }, [dispatch]);

  return (
    <Formik className={"w-full"}>
      <Form className="w-full">
        <AdminHeader renterAdmin={true} title={"My Application"} />
        <div className={"w-full p-2 md:p-4 space-y-5"}>
          {/* <ApprovalMessage
            status={true}
            Message={"Application Approved(22 July 2024)"}
          /> */}

          {loading ? (
            <div className="w-full flex justify-center items-center h-[40vh]">
              <ClipLoader size={100} color="blue" />
            </div>
          ) : (
            <>
              {!loading && showData && showData.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
                  {showData.map((item) => {
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
                          item.property &&
                          item.property.zip &&
                          item.property.zip
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
                        isBtn={true}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="w-full flex justify-center items-center h-[40vh]">
                  {" "}
                  No Application Available...{" "}
                </div>
              )}
            </>
          )}

          <div className="flex justify-start items-center space-x-2 px-4 w-full">
            <h3 className="text-lg font-semibold">Application History</h3>
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
          </div>
          <hr className="" />
          {resident && (
            <RentApplicationStatusCard
              key={resident && resident.apartmentId && resident.apartmentId}
              applicationId={
                resident && resident.applicationId && resident.applicationId
              }
              title={
                resident &&
                resident.property &&
                resident.property.name &&
                resident.property.name
              }
              status={resident && resident.status && resident.status}
              address={
                resident &&
                resident.property &&
                resident.property.address &&
                resident.property.address
              }
              city={
                resident &&
                resident.property &&
                resident.property.city &&
                resident.property.city
              }
              state={
                resident &&
                resident.property &&
                resident.property.state &&
                resident.property.state
              }
              country={
                resident &&
                resident.property &&
                resident.property.country &&
                resident.property.country
              }
              zip={
                resident &&
                resident.property &&
                resident.property.zip &&
                resident.property.zip
              }
              type={
                resident &&
                resident.apartment &&
                resident.apartment.type &&
                resident.apartment.type
              }
              lease_term={
                resident && resident.lease_term && resident.lease_term
              }
              unit_number={
                resident &&
                resident.apartment &&
                resident.apartment.unit_number &&
                resident.apartment.unit_number
              }
              date={resident && resident.move_in_date && resident.move_in_date}
              isBtn={false}
              isActive={true}
            />
          )}
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
                          item.property &&
                          item.property.zip &&
                          item.property.zip
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
        </div>
      </Form>
    </Formik>
  );
};

export default ApplicationCenter;
