import { cn } from "@/utils";
import { Field } from "formik";

export const Input = ({
  placeholder,
  name,
  id,
  className,
  label,
  required,
  type,
  parentClassName,
  disabled,
  ...classes
}) => {
  return (
    <div className={cn(`w-full`, parentClassName)}>
      {label && (
        <label
          className={`block mb-2 sm:text-sm text-xs font-medium text-gray-900 min-w-max ${
            required ? "after:content-['*'] after:text-red-400" : ""
          }  `}
          htmlFor=""
        >
          {" "}
          {label}{" "}
        </label>
      )}
      <Field name={name}>
        {({ field, meta }) => {
          return (
            <div>
              <input
                type={type}
                id={id}
                className={cn(
                  `border border-blue-500 text-gray-900 text-sm block w-full p-2.5 outline-none transition-all duration-200 bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                    meta.touched && meta.error
                      ? "ring-1 ring-red-500 border-red-500"
                      : ""
                  } ${
                    disabled
                      ? "text-gray-500 border-gray-300 cursor-not-allowed"
                      : ""
                  } `,
                  className
                )}
                placeholder={
                  meta.touched && meta.error ? meta.error : placeholder
                }
                disabled={disabled}
                {...field}
                {...classes}
              />
              {/* {meta.touched && meta.error && (
                <div className="text-red-500">{meta.error}</div>
              )} */}
            </div>
          );
        }}
      </Field>
    </div>
  );
};
