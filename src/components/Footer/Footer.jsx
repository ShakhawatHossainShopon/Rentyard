import img from "@/assets/RentyardLogo.png";
import { NavLink, useLocation } from "react-router-dom";
import { companyLinks, GrowWithUs } from "./FooterLinks";
// App Images
import AppStoreImage from "@/assets/HomeAssets/Appstore.png";
import googlePlayImage from "@/assets/HomeAssets/GooglePlay.png";
import { socialLogos } from "./data";
export const Footer = () => {
  const location = useLocation();
  return (
    <>
      <div
        className={`${
          (location.pathname === "/print-application" && "hidden") ||
          (location.pathname === "/print-invoice" && "hidden")
        } bg-secondary-color px-4`}
      >
        <div className="w-full mx-auto  py-10 max-w-[1440px] m-auto">
          <div className="grid place-items-start grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 ">
            <div className="sm:col-span-2 md:col-span-2 lg:w-10/12">
              <div className="mb-6 md:mb-0">
                <img src={img} className="h-12 me-3" alt="Rentyard" />
                <p className="text-base py-5 pe-5">
                  Rentyard: Streamlining Property Listings and Applications for
                  Effortless Management.
                </p>
                If you are using a screen reader, or are having difficulty
                reading this website, please email{" "}
                <span className="underline">Contact Here</span>
                <p className="py-6 hidden md:block">
                  © 2024 RentYard LLC. All rights reserved.
                </p>
              </div>
            </div>

            <div>
              <div>
                <h2 className="mb-3 text-2xl font-semibold text-gray-900 ">
                  Quick Links
                </h2>
                <ul className="text-black dark:text-gray-400 font-medium">
                  {companyLinks.map((links) => (
                    <li key={links.name}>
                      <NavLink
                        to={links.link}
                        className="text-lg font-medium hover:text-blue-700"
                      >
                        {links.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Third grid item */}
            <div>
              {" "}
              <div>
                <h2 className="mb-3 text-2xl font-semibold text-gray-900 ">
                  Company
                </h2>
                <ul className="text-black dark:text-gray-400 font-medium">
                  {GrowWithUs.map((links) => (
                    <li key={links.name}>
                      <NavLink
                        to={links.link}
                        className="text-lg font-medium hover:text-blue-700"
                      >
                        {links.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <div>
                <img
                  src={googlePlayImage}
                  className="md:w-48 w-28 pb-5"
                  alt="Google Play"
                />
                <img
                  src={AppStoreImage}
                  className="md:w-48 w-28"
                  alt="Google Play"
                />
                <div className="flex items-center gap-4 pt-7">
                  {socialLogos.map((logo, index) => {
                    return (
                      <a key={index} href="#" target="_blank">
                        {logo.logo}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Add more grid items as needed */}
          </div>
          <p className="text-base py-6 block md:hidden">
            © 2024 RentYard LLC. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};
