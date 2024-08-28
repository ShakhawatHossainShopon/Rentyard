import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { Footer } from "./components/Footer/Footer";
import { Navbar } from "./components/Navbar/Navbar";
import PropertyRequireAuth from "./components/PropertyRequireAuth/PropertyRequireAuth";
import RentRequireAuth from "./components/RentRequireAuth/RentRequireAuth";
import { useAppDispatch } from "./hooks";
import PropertyAdminLayout from "./modules/PropertyOwnerAdmin/PropertyAdminLayout/PropertyAdminLayout";
import { getUser } from "./services/user/user";

const HomeRoute = lazy(() => import("./modules/UserClient/pages/Home/Home"));
const PrintApplicantRoute = lazy(() =>
  import(
    "./modules/PropertyOwnerAdmin/pages/PrintApplicantDetails/PrintApplicantDetails"
  )
);
const HelpRoute = lazy(() => import("./modules/UserClient/pages/Help/Help"));
const PrintInvoiceRoute = lazy(() =>
  import("./modules/PropertyOwnerAdmin/components/PrintInvoice/PrintInvoice")
);
const TermsRoute = lazy(() => import("./modules/UserClient/pages/Terms/Terms"));
const AccessibilityRoute = lazy(() =>
  import("./modules/UserClient/pages/Accessibility/Accessibility")
);
const PolicyRoute = lazy(() =>
  import("./modules/UserClient/pages/Policy/Policy")
);
const SearchRoute = lazy(() =>
  import("./modules/UserClient/pages/Search/Search")
);
const PropertyDetailsRoute = lazy(() =>
  import("./modules/UserClient/pages/ProjectDetails/ProjectDetails")
);
const RenterLayout = lazy(() => import("./modules/RenterAdmin/layout/Layout"));

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);
  return (
    <div className="flex justify-center items-center">
      <div className="max-w-[1440px]">
        <Navbar />
        <Suspense
          fallback={
            <div className="w-full flex justify-center items-center h-[90vh]">
              <ClipLoader size={100} color="blue" />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<HomeRoute />} />
            <Route path="/print-invoice" element={<PrintInvoiceRoute />} />
            <Route
              path="/print-application"
              element={<PrintApplicantRoute />}
            />
            <Route path="/help" element={<HelpRoute />} />
            <Route path="/policy" element={<PolicyRoute />} />
            <Route path="/terms" element={<TermsRoute />} />
            <Route path="/accessibility" element={<AccessibilityRoute />} />
            <Route path="/search" element={<SearchRoute />} />
            <Route path="/property/:id" element={<PropertyDetailsRoute />} />
          </Routes>
        </Suspense>

        <Suspense
          fallback={
            <div className="w-full flex justify-center items-center h-[90vh]">
              <ClipLoader size={100} color="blue" />
            </div>
          }
        >
          <Routes>
            <Route
              path="/renteradmin/*"
              element={
                <RentRequireAuth>
                  <RenterLayout />
                </RentRequireAuth>
              }
            />
          </Routes>
        </Suspense>
        <Suspense
          fallback={
            <div className="w-full flex justify-center items-center h-[90vh]">
              <ClipLoader size={100} color="blue" />
            </div>
          }
        >
          <Routes>
            <Route
              path="/propertyadmin/*"
              element={
                <PropertyRequireAuth>
                  <PropertyAdminLayout />
                </PropertyRequireAuth>
              }
            />
          </Routes>
        </Suspense>
        <Footer />
      </div>
      <ToastContainer theme="dark" />
    </div>
  );
}

export default App;
