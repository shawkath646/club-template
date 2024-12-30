"use client";
import { InputHTMLAttributes, useState } from "react";
import { FieldError } from "react-hook-form";
import { IoCheckbox } from "react-icons/io5";

interface InputFieldType extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isEditable?: boolean;
  singleLine?: boolean;
  error?: FieldError;
}

const InputField = ({
  label,
  error,
  type,
  isEditable = true,
  singleLine,
  ...rest
}: InputFieldType) => {
  
  const [showPassword, setShowPassword] = useState(false);
  const fieldId = label.replace(/ /g, "-").toLowerCase();

  return (
    <div className={`w-full ${singleLine ? "flex items-center space-x-4" : ""}`}>
      <label
        htmlFor={fieldId}
        className={`text-sm font-medium text-gray-200 dark:text-gray-300 whitespace-nowrap ${
          singleLine ? "" : "block mb-2"
        }`}
      >
        {label}:
      </label>

      <input
        id={fieldId}
        aria-label={label}
        aria-invalid={!!error}
        type={type === "password" && showPassword ? "text" : type}
        {...rest}
        readOnly={!isEditable}
        className={`block w-full py-2 ${
          singleLine ? "px-2" : "px-3"
        } text-gray-700 dark:text-gray-300 bg-white/20 dark:bg-gray-800/20 ${
          isEditable
            ? "border border-gray-300/70 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
            : "border-gray-300 dark:border-gray-700"
        } rounded-md shadow-sm focus:outline-none transition-all duration-200 aria-invalid:border-red-500 aria-invalid:focus:ring-red-500 sm:text-sm sm:leading-5`}
      />

      {type === "password" && (
        <div className="flex items-start space-x-2 my-3">
          <div
            onClick={() => setShowPassword((value) => !value)}
            className={`relative flex items-center justify-center w-5 h-5 rounded border border-gray-300 dark:border-gray-600 ${
              showPassword ? "bg-blue-500 dark:bg-blue-500" : "bg-white dark:bg-gray-800"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer flex-shrink-0`}
          >
            {showPassword && (
              <IoCheckbox className="w-4 h-4 text-black dark:text-white" />
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">Show password</p>
        </div>
      )}

      {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};

InputField.displayName = "InputField";

export default InputField;
