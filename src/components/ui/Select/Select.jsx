import { cn, Icons } from "@/utils";
import { Field } from "formik";
export const Select = ({
  label,
  className,
  options,
  id,
  parentClassName,
  required,
  placeholder,
  name,
  disabled,
  ...classes
}) => {
  return (
    <div className={cn(`relative flex flex-col py-1 px-2`, parentClassName)}>
      {label && (
        <label
          htmlFor={id}
          className={`block mb-2 text-sm font-medium text-gray-900 min-w-max ${
            required ? "after:content-['*'] after:text-red-400" : ""
          }`}
        >
          {label}
        </label>
      )}
      <Field name={name}>
        {({ field, meta }) => {
          return (
            <div className="relative">
              <select
                aria-placeholder={
                  meta.touched && meta.error ? meta.error : placeholder
                }
                id={id}
                className={cn(
                  `text-gray-900 text-xs pe-8 py-2.5 px-2 ring-blue-500 border border-blue-500 block w-full outline-none transition-all duration-200 pr-8 ${
                    meta.touched && meta.error
                      ? "ring-1 ring-red-500 border-red-500"
                      : ""
                  } ${disabled ? "border-gray-300" : ""}`,
                  className
                )}
                disabled={disabled}
                {...field}
                {...classes}
              >
                {options.map((option, index) => (
                  <option
                    key={index}
                    value={option.value}
                    className="min-w-max text-sm"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <Icons.DownArrow />
              </div>
            </div>
          );
        }}
      </Field>
    </div>
  );
};
