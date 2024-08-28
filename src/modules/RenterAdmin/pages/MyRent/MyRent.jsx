import { AdminHeader, Button, TabCom } from "@/components";
import {
  useAppDispatch,
  useGetApplicationForRenterSelector,
  useGetRenewOrMoveOutSelector,
  useGetUserSelector,
  useScrollToTop,
} from "@/hooks";
import { getApplicationForRenter } from "@/services/application/application";
import {
  deleteRenewOrMoveOut,
  getRenewOrMoveOut,
} from "@/services/renewOrMoveOut/renewOrMoveOut";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { RentApplicationStatusCard } from "../../components";
import { InvoiceHistory, MoveOut, Renew, RentHistory } from "./components";

const MyRent = () => {
  useScrollToTop();
  const dispatch = useAppDispatch();
  const response = useGetApplicationForRenterSelector();
  const [isShowTab, setIsShowTab] = useState(false);
  const { data } = useGetUserSelector();
  const res = useGetRenewOrMoveOutSelector();
  console.log(res);

  const convertedOptions = data &&
    data.apartment &&
    data.apartment.rent_and_lease && [
      { value: "", label: "Select One" },
      ...data.apartment.rent_and_lease.map((option) => {
        return {
          value: option.lease_term,
          label: `${option.lease_term} Term - $${option.rent}/month`,
        };
      }),
    ];

  const historyData =
    response &&
    response.data.filter(
      (item) =>
        item.status === "Cancelled by Renter" ||
        item.status === "Declined by Renter" ||
        item.status === "Declined" ||
        item.status === "Moved-Out" ||
        item.status === "Expired"
    );

  const resident =
    response &&
    response.data.length > 0 &&
    response.data.find(
      (item) =>
        item.status === "Resident" ||
        item.status === "Resident (Move-Out Accepted)" ||
        item.status === "Resident (Not Moved-In)" ||
        item.status === "Resident (Renewed)"
    );

  useEffect(() => {
    dispatch(getRenewOrMoveOut());
    dispatch(getApplicationForRenter());
  }, []);

  useEffect(() => {
    if (res && res.data && Object.keys(res.data).length > 0) {
      setIsShowTab(false);
    }
  }, [res]);

  return (
    <div className="w-full">
      <AdminHeader renterAdmin={true} title={"My Rent/Lease"} />
      <div className="w-full p-4 space-y-10">
        <div className="bg-gray-100 border border-blue-500 space-y-5">
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
          <div className="p-4 space-y-10">
            <Button
              className={`md:text-sm text-xs ${
                res && res.data && Object.keys(res.data).length > 0
                  ? "bg-blue-300 cursor-not-allowed hover:bg-blue-300"
                  : ""
              } `}
              disabled={
                res && res.data && Object.keys(res.data).length > 0
                  ? true
                  : false
              }
              onClick={() => setIsShowTab((prev) => !prev)}
            >
              {isShowTab ? "Close Tab" : "Move-out / Renew Request"}
            </Button>
            {isShowTab && (
              <TabCom
                defaultValue={"Renew Request"}
                data={[
                  {
                    value: "Renew Request",
                    label: "Renew Request",
                    component: (
                      <Renew
                        convertedOptions={convertedOptions}
                        applicationId={data.applicationId}
                      />
                    ),
                  },
                  {
                    value: "Move-out Request",
                    label: "Move-out Request",
                    component: <MoveOut applicationId={data.applicationId} />,
                  },
                ]}
              />
            )}
          </div>
        </div>
        {res && res.data && Object.keys(res.data).length > 0 && (
          <div className="border border-red-500 px-4 py-4 space-y-3 z-50">
            {res.data.type === "Renew" && (
              <h3 className="text-xl font-semibold">
                {" "}
                You have requested for Lease Renewal{" "}
              </h3>
            )}
            {res.data.type === "Move Out" && (
              <h3 className="text-xl font-semibold">
                {" "}
                You have requested for Move Out{" "}
              </h3>
            )}

            {res.data.requested_lease_term && (
              <p>Selected Lease Term: {res.data.requested_lease_term} </p>
            )}
            {res.data.move_out_date && (
              <p>Selected Move-out Date: {res.data.move_out_date} </p>
            )}
            <Button
              onClick={() => {
                Swal.fire({
                  title: "Are You Sure?",
                  showDenyButton: true,
                  confirmButtonText: "Ok",
                  denyButtonText: `Cancel`,
                }).then((result) => {
                  /* Read more about isConfirmed, isDenied below */
                  if (result.isConfirmed) {
                    dispatch(
                      deleteRenewOrMoveOut({
                        applicationId: data.applicationId,
                        type: res.data.type,
                      })
                    );
                  }
                });
              }}
              className={"bg-red-600"}
            >
              {" "}
              Cancel{" "}
            </Button>
          </div>
        )}
        <RentHistory historyData={historyData} />
        <InvoiceHistory />
      </div>
    </div>
  );
};

export default MyRent;
