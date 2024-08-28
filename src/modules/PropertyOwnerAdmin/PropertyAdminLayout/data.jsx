import { Icons } from "@/utils";

export const menus = [
  {
    label: "Dashboard",
    path: "/propertyadmin/dashboard",
    icon: (
      <span>
        <Icons.dashboard className="w-5 h-5" />
      </span>
    ),
  },
  {
    label: "Application Center",
    path: "/propertyadmin/applications",
    icon: (
      <span>
        <Icons.application className="w-5 h-5" />
      </span>
    ),
  },
  {
    label: "Residents",
    path: "/propertyadmin/residents",
    icon: (
      <span>
        <Icons.resident className="w-5 h-5" />
      </span>
    ),
  },
  {
    label: "All Property",
    path: "/propertyadmin/allproperty",
    icon: (
      <span>
        <Icons.properties className="w-5 h-5" />
      </span>
    ),
  },
  {
    label: "All Apartment",
    path: "/propertyadmin/allapartment",
    icon: (
      <span>
        <Icons.apartment className="w-5 h-5" />
      </span>
    ),
  },
  {
    label: "Property Rules",
    path: "/propertyadmin/propertyrules",
    icon: (
      <span>
        <Icons.propertyRules className="w-5 h-5" />
      </span>
    ),
  },
  {
    label: "Maintenance Request",
    path: "/propertyadmin/workorder",
    icon: (
      <span>
        <Icons.work className="w-5 h-5" />
      </span>
    ),
  },
  {
    label: "Tour Request",
    path: "/propertyadmin/tour",
    icon: (
      <span>
        <Icons.tour className="w-5 h-5" />
      </span>
    ),
  },
  {
    label: "Employee List",
    path: "/propertyadmin/employeelist",
    icon: (
      <span>
        <Icons.employee className="w-5 h-5" />
      </span>
    ),
  },
  {
    label: "Invoices",
    path: "/propertyadmin/invoices",
    icon: (
      <span>
        <Icons.invoice className="w-5 h-5" />
      </span>
    ),
  },
  {
    label: "Payment Setting",
    path: "/propertyadmin/payment",
    icon: (
      <span>
        <Icons.paymentSetting className="w-5 h-5" />
      </span>
    ),
  },
  {
    label: "Subscription",
    path: "/propertyadmin/subscription",
    icon: (
      <span>
        <Icons.subscription className="w-5 h-5" />
      </span>
    ),
  },
  {
    label: "Account Setting",
    path: "/propertyadmin/account",
    icon: (
      <span>
        <Icons.account className="w-5 h-5" />
      </span>
    ),
  },
  {
    label: "Asset Manager",
    path: "/propertyadmin/asset",
    icon: (
      <span>
        <Icons.asset className="w-5 h-5" />
      </span>
    ),
  },
];
