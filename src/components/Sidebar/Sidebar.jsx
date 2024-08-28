import Avatar from "@/assets/avatar.png";
import { useAppDispatch } from "@/hooks";
import { logout } from "@/services/auth/auth";
import { Icons } from "@/utils";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

export const Sidebar = ({
  menus,
  profile_percentage,
  first_name,
  middle_name,
  last_name,
}) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div
      className={`lg:w-[20%] min-h-screen hidden lg:block py-10 space-y-5 bg-gray-50 px-8 rounded`}
    >
      <div className="flex justify-start items-center space-x-3">
        <img className="w-[40px]" src={Avatar} alt="avatar" />
        <div>
          <h5 className="text-xs font-medium">
            {" "}
            {first_name} {middle_name && middle_name} {last_name}{" "}
          </h5>
          {/* <h5 className="text-xs font-light">Id: 453211</h5> */}
        </div>
      </div>
      <hr className="w-full mx-auto border-t-2 border-gray-300 my-6" />
      {profile_percentage >= 0 ? (
        <div className="flex justify-start items-center space-x-2 w-full text-xs xl:text-sm">
          <span>Profile Completed:</span>
          <span className="font-medium">{profile_percentage}%</span>
        </div>
      ) : null}
      <ul className="flex flex-col gap-3 text-base">
        {menus.map((menu) => {
          {
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
                  <div className="flex items-center gap-3">
                    {menu.icon} {/* Render icon */}
                    {menu.label}
                  </div>

                  <span className="ml-3">{dropdownOpen ? "▲" : "▼"}</span>
                </div>
                <hr className="mt-2" />
                {dropdownOpen && (
                  <ul className="pl-5 pt-3 flex  flex-col gap-2 list-disc">
                    {menu.dropdown.map((dropMenu, index) => {
                      return (
                        <li key={index}>
                          <NavLink to={dropMenu.path}>
                            {dropMenu.icon} {/* Render icon */}
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
                className={` ${
                  location.pathname === menu.path ? "text-blue-600" : ""
                }`}
              >
                <NavLink key={menu.label} to={menu.path}>
                  <div className=" flex items-center gap-3 xl:text-base text-xs pb-2">
                    {menu.icon} {/* Render icon */}
                    {menu.label}
                  </div>
                  <hr />
                </NavLink>
              </li>
            );
          }
        })}
      </ul>
      <p>
        <button onClick={() => dispatch(logout())}>
          <div className=" flex items-center gap-3 xl:text-base text-xs pb-2">
            <span>
              <Icons.logout className="w-5 h-5" />
            </span>
            Logout
          </div>
          <hr />
        </button>
      </p>
    </div>
  );
};
