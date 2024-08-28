import { Field } from "formik";
import { cn } from "../../../utils";

export const TextArea = ({
  row,
  className,
  placeholder,
  name,
  label,
  required,
  ...classes
}) => {
  return (
    <div className="w-full">
      {label && (
        <label
          className={`block mb-2 text-sm font-medium text-gray-900 min-w-max ${
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
              <textarea
                rows={row}
                className={cn(
                  `bg-gray-50  text-gray-900 text-sm  block w-full p-2.5 outline-none transition-all duration-200 ${
                    meta.touched && meta.error
                      ? "ring-1 ring-red-500 border border-red-500"
                      : "focus:ring-blue-500 focus:ring-1 border border-blue-500"
                  }`,
                  className
                )}
                placeholder={
                  meta.touched && meta.error ? meta.error : placeholder
                }
                {...field}
                {...classes}
              ></textarea>
            </div>
          );
        }}
      </Field>
    </div>
  );
};
