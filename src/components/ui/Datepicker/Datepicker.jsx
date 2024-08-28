import { cn, Icons } from "@/utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Datepicker = ({
  label,
  className,
  parentClassName,
  placeholder,
  required,
  value,
  onChange,
  name,
  touched,
  errors,
}) => {
  return (
    <div className={cn(`w-full md:px-2 md:py-1 bg-white`, parentClassName)}>
      <label
        htmlFor=""
        className={`block dark:mb-0 mb-2 text-sm font-medium text-gray-900 min-w-max ${
          required ? "after:content-['*'] after:text-red-400" : ""
        }`}
      >
        {label}
        <span className="text-xs"> (MM-DD-YYYY)</span>
      </label>
      <div
        className={cn(
          `relative flex justify-between items-center space-x-3 text-gray-900 text-sm outline-none transition-all duration-200 w-full border border-blue-500 px-2 py-2 ${
            touched && errors ? "ring-1 ring-red-500 border-red-500" : ""
          }`,
          className
        )}
      >
        {/* <DatePicker
          name={name}
          clearAriaLabel={false}
          clearIcon={false}
          onChange={onChange}
          value={value}
          dayPlaceholder={"24"}
          monthPlaceholder={"07"}
          yearPlaceholder={"2025"}
          className={"min-w-max w-full cursor-pointer"}
          calendarIcon={<Icons.Calender />}
        /> */}
        <DatePicker
          name={name}
          onChange={onChange}
          selected={value}
          showYearDropdown
          showMonthDropdown
          placeholderText={"MM-DD-YYYY"}
          className={
            "min-w-max w-full cursor-pointer bg-transparent outline-none p-0"
          }
          dropdownMode="select"
          autoComplete="off"
          showIcon={true}
          icon={<Icons.Calender />}
          calendarIconClassName="-left-1 -top-1.5"
        />
      </div>
    </div>
  );
};
