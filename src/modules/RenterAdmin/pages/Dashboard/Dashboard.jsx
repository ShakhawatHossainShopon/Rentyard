import { AdminHeader } from "@/components";
import {
  useAppDispatch,
  useGetApprovedApplicationsSelector,
  useGetUserSelector,
  useScrollToTop,
} from "@/hooks";
import { getApprovedApplications } from "@/services/application/application";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import {
  ApprovalMessage,
  BillCard,
  CheckList,
  DashboardMessage,
  InfoCard,
} from "../../components";
import { HeaderContent } from "./components/HeaderContent/HeaderContent";

const Dashboard = () => {
  useScrollToTop();
  const dispatch = useAppDispatch();
  const { data } = useGetApprovedApplicationsSelector();
  console.log(data);
  const res = useGetUserSelector();

  const {
    residentOf,
    profile_completion,
    first_name,
    middle_name,
    last_name,
    move_in_deposit,
    apartment,
    property,
  } = res.data;
  const { loading } = res;

  useEffect(() => {
    dispatch(getApprovedApplications());
  }, [dispatch]);

  return (
    <div className="w-full">
      <AdminHeader renterAdmin={true} title={"Dashboard"} />
      {!loading ? (
        <div className="w-full p-1 md:p-4 px-2 space-y-10">
          {residentOf && (
            <>
              <p className="bg-yellow-500 px-4 py-2">
                Your Expected Move-Out Date:{" "}
                <span className="font-semibold">
                  {apartment.expected_move_out_date}
                </span>
                <span className="text-xs"> (MM-DD-YYYY)</span>
              </p>
              <HeaderContent
                apartment={apartment && apartment}
                property={property && property}
                move_in_deposit={move_in_deposit}
              />
            </>
          )}
          {residentOf && (
            <CheckList
              apartment={apartment && apartment}
              property={property && property}
            />
          )}
          {data &&
            data.length > 0 &&
            data.map((item) => {
              return <ApprovalMessage key={item.applicationId} item={item} />;
            })}
          {residentOf && (
            <div className="md:grid sm:grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-5 md:justify-start md:items-start md:space-y-0 space-y-10">
              <BillCard title={"Apartment Bill"} />
              <BillCard title={"Electricity Bill"} />
              <BillCard title={"Internet Bill"} />
            </div>
          )}
          {residentOf && (
            <div className="grid md:grid-cols-3 grid-cols-1 gap-10 place-items-start">
              <InfoCard
                title={"Open Work Order"}
                className={"flex flex-col justify-center items-center"}
              >
                <p>Order: 49484</p>
                <p>Scheduled on 13 July 2024</p>
              </InfoCard>
              <InfoCard
                title={"Vehicle List"}
                className={"flex flex-col justify-center items-center"}
              >
                <ul className="list-disc xl:text-base text-xs">
                  <li>Chevrolet-Malibu-SBV-3245</li>
                  <li>Chevrolet-Malibu-SBV-3245</li>
                  <li>Toyota-Camry-NNP-4355(G)</li>
                </ul>
              </InfoCard>
              <InfoCard
                title={"Open Work Order"}
                className={"flex flex-col justify-center items-center"}
              >
                <h3 className="text-3xl text-blue-600 font-bold">1</h3>
                <p> Ready to Pickup</p>
              </InfoCard>
              <InfoCard
                title={"Open Work Order"}
                className={"flex flex-col justify-center items-center"}
              >
                <h3 className="text-xl font-bold">StateFarm</h3>
                <p> Expire on: 01 June 2025</p>
              </InfoCard>
            </div>
          )}
          {profile_completion < 80 && (
            <DashboardMessage
              name={`${first_name} ${
                middle_name ? middle_name : ""
              } ${last_name}`}
            />
          )}
        </div>
      ) : (
        <div className="w-full flex justify-center items-center h-[90vh]">
          <ClipLoader size={100} color="blue" />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
