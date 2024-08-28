import Logo from "@/assets/RentyardLogo.png";
import { Modal } from "@/components/Modal";
import { loginVerifier, tempRole } from "@/features/auth/loginSlice/loginSlice";
import { signUpVerifier } from "@/features/auth/signUpSlice/signUpSlice";
import { useAppDispatch, useAuth, useLoginSelector } from "@/hooks";
import { logout } from "@/services/auth/auth";
import { Icons } from "@/utils";
import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Auth } from "../Auth/Auth";
import { PopUp } from "../popUp";
import { menus } from "./navData";

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated, isPropertyOwner, isRenter, tempRenter, tempPo } =
    useLoginSelector();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      if (tempRenter) {
        navigate("/renteradmin/dashboard");
        dispatch(tempRole());
      } else if (tempPo) {
        navigate("/propertyadmin/dashboard");
        dispatch(tempRole());
      }
    }
  }, [isAuthenticated, isRenter, isPropertyOwner, navigate]);

  useAuth();

  useEffect(() => {
    const [navigationEntry] = performance.getEntriesByType("navigation");
    if (navigationEntry && navigationEntry.type === "reload") {
      dispatch(signUpVerifier());
      dispatch(loginVerifier());
    }
  }, [dispatch]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    dispatch(signUpVerifier());
    dispatch(loginVerifier());
  };
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const location = useLocation();

  return (
    <div
      className={`sticky top-0 left-0 right-0 z-50 py-5 bg-white dark:bg-red-500 md:px-0 px-4 mx-auto transition-shadow duration-300 ${
        (location.pathname === "/print-application" && "hidden") ||
        (location.pathname === "/print-invoice" && "hidden")
      }  ${isScrolled ? "shadow-custom-light" : ""}`}
    >
      <nav className="mx-auto max-w-[1440px] md:px-6 flex justify-between items-center z-[99999999]">
        <div>
          <NavLink to="/" className="">
            <img src={Logo} className="md:max-w-40 max-w-32" alt="Logo" />
          </NavLink>
        </div>
        <div className="hidden xl:flex items-center space-x-8">
          {menus.map((menu) => {
            if (
              !isAuthenticated &&
              (menu.link === "/renteradmin/dashboard" ||
                menu.link === "/propertyadmin/dashboard" ||
                menu.link === "/propertyadmin/allproperty")
            ) {
              return null;
            }
            if (isRenter && menu.link === "/propertyadmin/allproperty") {
              return null;
            }
            if (isRenter && menu.link === "/propertyadmin/dashboard") {
              return null;
            }
            if (isPropertyOwner && menu.link === "/renteradmin/dashboard") {
              return null;
            }
            return (
              <li className="list-none" key={menu.name}>
                <NavLink
                  to={menu.link}
                  className="text-lg font-medium hover:text-blue-700"
                >
                  {menu.name}
                </NavLink>
              </li>
            );
          })}
          {!isAuthenticated && (
            <li className="list-none">
              <button
                onClick={openModal}
                className="text-lg font-medium hover:text-blue-700"
              >
                Add Property
              </button>
            </li>
          )}
        </div>
        <div>
          {!isAuthenticated && (
            <li className="list-none md:block hidden">
              <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={"Welcome to RentYard"}
                width={"w-full max-w-5xl"}
                closeOnOutsideClick={true}
              >
                <Auth closeSignUpPopUp={closeModal} />
              </Modal>
              <button
                onClick={openModal}
                className="md:text-base text-sm font-bold py-2.5 px-5 rounded bg-primary-color text-white
                transition-all duration-300 hover:bg-blue-500 hover:shadow-lg"
              >
                Login/Signup
              </button>
            </li>
          )}
          {isAuthenticated && (
            <button
              onClick={() => dispatch(logout())}
              className="md:text-base text-sm  font-bold md:py-2.5 py-2 px-4 rounded bg-primary-color text-white
              transition-all duration-300 hover:bg-blue-500 hover:shadow-lg"
            >
              Logout
            </button>
          )}
        </div>
        <div className="xl:hidden">
          <button onClick={toggleMobileMenu} className="hover:text-blue-700">
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
        </div>
      </nav>
      <div
        className={`${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } xl:hidden h-screen overflow-hidden bg-white absolute top-0 left-0 right-0 transition-transform duration-500 ease-in-out`}
      >
        <div className="w-full flex justify-end items-center pr-5 pt-5">
          <button className="text-5xl" onClick={toggleMobileMenu}>
            <Icons.Close className="text-4xl" />
          </button>
        </div>
        <div className="flex flex-col xl:items-center h-full pl-8 space-y-4 bg-white py-4">
          {menus.map((menu) => {
            if (
              !isAuthenticated &&
              (menu.link === "/renteradmin/dashboard" ||
                menu.link === "/propertyadmin/dashboard" ||
                menu.link === "/propertyadmin/allproperty")
            ) {
              return null;
            }
            if (isRenter && menu.link === "/propertyadmin/dashboard") {
              return null;
            }
            if (isPropertyOwner && menu.link === "/renteradmin/dashboard") {
              return null;
            }
            return (
              <div key={menu.name}>
                <NavLink
                  key={menu.name}
                  to={menu.link}
                  className="text-lg font-medium hover:text-blue-700"
                  onClick={toggleMobileMenu}
                >
                  {menu.name}
                </NavLink>
                <hr />
              </div>
            );
          })}
          {!isAuthenticated && (
            <li className="list-none">
              <PopUp
                isOpen={isModalOpen}
                onClose={closeModal}
                title={"Welcome to RentYard"}
              >
                <Auth />
              </PopUp>
              <button
                onClick={openModal}
                className="text-lg font-medium hover:text-blue-700 text-start"
              >
                Login/Signup
              </button>
            </li>
          )}
        </div>
      </div>
    </div>
  );
};
