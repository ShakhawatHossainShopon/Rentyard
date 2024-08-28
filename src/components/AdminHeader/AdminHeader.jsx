import { menus as PropertyMenues } from "@/modules/PropertyOwnerAdmin/PropertyAdminLayout/data";
import { menus } from "@/modules/RenterAdmin/layout/data";
import { useState } from "react";
import { ResponsiveSidebar } from "./../ResponsiveSidebar/ResponsiveSidebar";

export const AdminHeader = ({ title, renterAdmin }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <h2 className="w-full flex justify-start items-center space-x-2 bg-gray-50 px-2 dark:bg-[#354C7C] text-gray-900 py-2">
        <button onClick={toggleSidebar} className="lg:hidden">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
        <span className="text-2xl font-semibold">{title}</span>
      </h2>
      {renterAdmin ? (
        <ResponsiveSidebar
          menus={menus}
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      ) : (
        <ResponsiveSidebar
          menus={PropertyMenues}
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      )}
    </>
  );
};
