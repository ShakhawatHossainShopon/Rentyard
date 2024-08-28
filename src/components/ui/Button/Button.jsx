import { cn } from "@/utils";

export const Button = ({ className, children, type, ...classes }) => {
  return (
    <button
      className={cn(
        `text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 font-medium md:text-sm text-xs px-5 py-2.5 transition-all duration-200`,
        className
      )}
      type={type}
      {...classes}
    >
      {children}
    </button>
  );
};
