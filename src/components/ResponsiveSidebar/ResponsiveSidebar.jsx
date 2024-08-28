import avatar from "@/assets/avatar.png";
import { Icons } from "@/utils";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export const ResponsiveSidebar = ({ isOpen, toggleSidebar, menus }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity duration-300 z-40 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!isOpen}
      onClick={toggleSidebar}
    >
      <div
        className={`fixed inset-0 bg-white md:w-64 w-full shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 mt-[80px]"
        >
          <Icons.Close className="text-4xl" />
        </button>
        <div className="pt-[100px]">
          <div className="flex pl-6 items-center space-x-3">
            <img src={avatar} className="w-20" alt="avatar" />
            <div>
              <h5>John Doe</h5>
              <h5>ID: 453211</h5>
            </div>
          </div>
          <ul className="pt-10 pl-7 flex flex-col gap-3">
            {menus.map((menu) => {
              return menu.type === "dropdown" ? (
                <li key={menu.label}>
                  <div
                    className={
                      dropdownOpen
                        ? `flex items-center text-blue-600 cursor-pointer`
                        : `flex items-center cursor-pointer`
                    }
                    onClick={handleDropdownClick}
                  >
                    {menu.label}
                    <span className="ml-3">{dropdownOpen ? "▲" : "▼"}</span>
                  </div>
                  {dropdownOpen && (
                    <ul className="pl-5 pt-2 flex flex-col gap-2">
                      {menu.dropdown.map((dropMenu, index) => {
                        return (
                          <li key={index}>
                            <NavLink to={dropMenu.path}>
                              {dropMenu.label}
                            </NavLink>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              ) : (
                <li
                  key={menu.label}
                  className={`${
                    location.pathname === menu.path ? "text-blue-600" : ""
                  }`}
                >
                  <NavLink key={menu.label} to={menu.path}>
                    <div className="flex gap-2 items-center">
                      {menu.icon} {/* Render icon */}
                      {menu.label}
                    </div>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
