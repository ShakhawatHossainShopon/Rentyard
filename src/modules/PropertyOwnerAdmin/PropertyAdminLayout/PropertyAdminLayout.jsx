import { Sidebar } from "@/components";
import { useAppDispatch, useGetUserSelector } from "@/hooks";
import { getUser } from "@/services/user/user";
import { lazy, Suspense, useEffect } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { menus } from "./data";

const PropertyDashboardRoute = lazy(() =>
  import("../pages/PropertyDashboard/PropertyDashboard")
);
const ApplicationsRoute = lazy(() =>
  import("../pages/Applications/Applications")
);
const ResidentsRoute = lazy(() => import("../pages/Residents/Residents"));
const AllPropertyRoute = lazy(() => import("../pages/AllProperty/AllProperty"));
const AddApartmentRoute = lazy(() =>
  import("../pages/AddApartment/AddApartment")
);
const PropertyRulesRoute = lazy(() =>
  import("../pages/PropertyRules/PropertyRules")
);
const PropertyWorkOrderRoute = lazy(() =>
  import("../pages/PropertyWorkOrder/PropertyWorkOrder")
);
const TourRequestRoute = lazy(() => import("../pages/TourRequest/TourRequest"));
const EmployeeListRoute = lazy(() =>
  import("../pages/EmployeeList/EmployeeList")
);
const InvoicesRoute = lazy(() => import("../pages/Invoices/Invoices"));
const PropertyPaymentSettingsRoute = lazy(() =>
  import("../pages/PropertyPaymentSettings/PropertyPaymentSettings")
);
const SubscriptionRoute = lazy(() =>
  import("../pages/Subscription/Subscription")
);
const PropertyAccountSettingsRoute = lazy(() =>
  import("../pages/PropertyAccountSettings/PropertyAccountSettings")
);
const LogoutRoute = lazy(() => import("../pages/Logout/Logout"));
const AssetManagementRoute = lazy(() =>
  import("../pages/AssetManagement/AssetManagement")
);

const PropertyAdminLayout = () => {
  const dispatch = useAppDispatch();
  const { data } = useGetUserSelector();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return (
    <div className="flex">
      <Sidebar
        menus={menus}
        first_name={data.first_name}
        middle_name={data.middle_name}
        last_name={data.last_name}
      />
      <div className="w-full lg:w-[80%]">
        <Outlet />
        <Suspense
          fallback={
            <div className="w-full flex justify-center items-center h-[90vh]">
              <ClipLoader size={100} color="blue" />
            </div>
          }
        >
          <Routes>
            <Route path="/dashboard" element={<PropertyDashboardRoute />} />
            <Route path="/applications" element={<ApplicationsRoute />} />
            <Route path="/residents" element={<ResidentsRoute />} />
            <Route path="/allproperty" element={<AllPropertyRoute />} />
            <Route path="/allapartment" element={<AddApartmentRoute />} />
            <Route path="/propertyrules" element={<PropertyRulesRoute />} />
            <Route path="/workorder" element={<PropertyWorkOrderRoute />} />
            <Route path="/tour" element={<TourRequestRoute />} />
            <Route path="/employeelist" element={<EmployeeListRoute />} />
            <Route path="/invoices" element={<InvoicesRoute />} />
            <Route path="/asset" element={<AssetManagementRoute />} />
            <Route path="/payment" element={<PropertyPaymentSettingsRoute />} />
            <Route path="/subscription" element={<SubscriptionRoute />} />
            <Route path="/account" element={<PropertyAccountSettingsRoute />} />
            <Route path="/logout" element={<LogoutRoute />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default PropertyAdminLayout;
